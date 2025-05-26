<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Button } from '$lib/components/ui/button';

	import {
		Chart,
		registerables,
		type ChartConfiguration,
		type ChartData,
		type ChartOptions
	} from 'chart.js';

	import { fetchTimeSeriesData, fetchCurrentRatesEurope } from '$lib/api';

	Chart.register(...registerables);

	const props = $props<{
		fromCurrency: string;
		toCurrency: string;
	}>();

	interface ChartDataPoint {
		date: string;
		rate: number;
		timestamp: string;
	}

	type TimePeriod = '1w' | '1m' | '1y' | '2y' | '5y' | '10y';

	let chartData = $state<ChartDataPoint[]>([]);
	let isLoading = $state<boolean>(false);
	let selectedPeriod = $state<TimePeriod>('1w');
	let currentRate = $state<number | null>(null);
	let lastUpdated = $state<string>('');

	let chartCanvas = $state<HTMLCanvasElement>();
	let chartInstance: Chart | null = null;

	function getDateRange(period: TimePeriod): { startDate: string; endDate: string } {
		const now = new Date();
		const endDate = now.toISOString().split('T')[0];
		const startDate = new Date(now);

		switch (period) {
			case '1w':
				startDate.setDate(now.getDate() - 7);
				break;
			case '1m':
				startDate.setMonth(now.getMonth() - 1);
				break;
			case '1y':
				startDate.setFullYear(now.getFullYear() - 1);
				break;
			case '2y':
				startDate.setFullYear(now.getFullYear() - 2);
				break;
			case '5y':
				startDate.setFullYear(now.getFullYear() - 5);
				break;
			case '10y':
				startDate.setFullYear(now.getFullYear() - 10);
				break;
		}

		return {
			startDate: startDate.toISOString().split('T')[0],
			endDate
		};
	}

	function formatDateForDisplay(dateStr: string, period: TimePeriod): string {
		const dateObj = new Date(dateStr + 'T00:00:00');

		if (period === '1w') {
			return dateObj.toLocaleDateString([], { weekday: 'short', day: 'numeric' });
		} else if (period === '1m') {
			return dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
		} else {
			return dateObj.toLocaleDateString([], { month: 'short', year: '2-digit' });
		}
	}

	function createChart() {
		if (!chartCanvas || chartData.length === 0) return;

		const ctx = chartCanvas.getContext('2d');
		if (!ctx) return;

		const data: ChartData<'line'> = {
			labels: chartData.map((d) => formatDateForDisplay(d.timestamp, selectedPeriod)),
			datasets: [
				{
					label: `${props.fromCurrency} → ${props.toCurrency}`,
					data: chartData.map((d) => d.rate),
					borderColor: '#0ea5e9',
					backgroundColor: 'rgba(14, 165, 233, 0.1)',
					borderWidth: 2,
					fill: false,
					tension: 0.1,
					pointRadius: 1,
					pointHoverRadius: 5
				}
			]
		};

		const options: ChartOptions<'line'> = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					callbacks: {
						label: (context) => {
							return `${context.parsed.y.toFixed(6)} ${props.toCurrency}`;
						},
						title: (context) => {
							const date = new Date(chartData[context[0].dataIndex].timestamp + 'T00:00:00');
							return date.toLocaleDateString();
						}
					}
				}
			},
			scales: {
				x: {
					display: true,
					grid: {
						display: false
					},
					ticks: {
						maxTicksLimit: 8,
						font: {
							size: 12
						}
					}
				},
				y: {
					display: true,
					grid: {
						color: 'rgba(0, 0, 0, 0.1)'
					},
					ticks: {
						callback: (value) => {
							return Number(value).toFixed(2);
						},
						font: {
							size: 12
						}
					}
				}
			},
			interaction: {
				intersect: false,
				mode: 'index'
			}
		};

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data,
			options
		};

		if (chartInstance) {
			chartInstance.destroy();
		}

		chartInstance = new Chart(ctx, config);
	}

	async function fetchHistoricalData() {
		isLoading = true;
		try {
			const { startDate, endDate } = getDateRange(selectedPeriod);
			const timeSeriesRes = await fetchTimeSeriesData(
				props.fromCurrency,
				props.toCurrency,
				startDate,
				endDate
			);

			const formattedData: ChartDataPoint[] = Object.entries(timeSeriesRes.rates || {})
				.map(([date, rates]: [string, any]) => {
					const rate = rates[props.toCurrency] || 0;
					return {
						date: formatDateForDisplay(date, selectedPeriod),
						rate: rate,
						timestamp: date
					};
				})
				.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

			chartData = formattedData;

			const currentRatesRes = await fetchCurrentRatesEurope(props.fromCurrency, props.toCurrency);
			const rate = currentRatesRes.rates?.[props.toCurrency] || 0;
			currentRate = rate;
			lastUpdated = new Date().toUTCString();
		} catch (error) {
			console.error('Error fetching chart data:', error);
		} finally {
			isLoading = false;
		}
	}

	function setSelectedPeriod(period: TimePeriod) {
		selectedPeriod = period;
	}

	const periods = [
		{ value: '1w', label: '1w' },
		{ value: '1m', label: '1m' },
		{ value: '1y', label: '1y' },
		{ value: '2y', label: '2y' },
		{ value: '5y', label: '5y' },
		{ value: '10y', label: '10y' }
	] as const;

	$effect(() => {
		props.fromCurrency;
		props.toCurrency;
		selectedPeriod;

		fetchHistoricalData();
	});

	$effect(() => {
		if (chartData.length > 0 && chartCanvas && !isLoading) {
			createChart();
		}
	});

	onDestroy(() => {
		if (chartInstance) {
			chartInstance.destroy();
		}
	});
</script>

<div class="flex h-full flex-col space-y-4">
	{#if isLoading}
		<div class="flex h-full flex-col space-y-4">
			<div class="flex items-center justify-between">
				<div class="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
				<div class="flex space-x-1">
					{#each periods as period (period.value)}
						<div class="h-8 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
					{/each}
				</div>
			</div>
			<div class="flex-1 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
		</div>
	{:else}
		<div class="flex items-center justify-between">
			<div class="text-sm">
				<div class="font-medium">
					1 {props.fromCurrency} = {currentRate ? currentRate.toFixed(6) : '...'}
					{props.toCurrency}
				</div>
				<div class="text-muted-foreground text-xs">
					{lastUpdated || 'Actualizando...'}
				</div>
			</div>
			<div class="flex flex-wrap gap-1">
				{#each periods as period (period.value)}
					<Button
						variant={selectedPeriod === period.value ? 'default' : 'outline'}
						size="sm"
						class="h-7 px-2 text-xs"
						onclick={() => setSelectedPeriod(period.value)}
					>
						{period.label}
					</Button>
				{/each}
			</div>
		</div>

		{#if chartData.length === 0}
			<div class="text-muted-foreground flex flex-1 items-center justify-center">
				No hay datos disponibles para el período seleccionado
			</div>
		{:else}
			<div class="flex-1">
				<canvas class="h-48" bind:this={chartCanvas}></canvas>
			</div>
		{/if}
	{/if}
</div>
