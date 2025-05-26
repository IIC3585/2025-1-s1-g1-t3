<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import Header from '$lib/components/chart/selectConversion.svelte';
	import ChartComponent from '$lib/components/chart/chart.svelte';
	import type { Currency } from '$lib/types';
	import { currencies } from '$lib/currencies';
	import { fetchCurrenciesEurope } from '$lib/api';
	import { writable, derived } from 'svelte/store';

	const initialFromCurrency: Currency = {
		code: 'USD',
		name: 'Dólar Estadounidense',
		country: 'Estados Unidos',
		flag: 'https://flagcdn.com/us.svg'
	};

	const initialToCurrency: Currency = {
		code: 'EUR',
		name: 'Euro',
		country: 'Unión Europea',
		flag: 'https://flagcdn.com/eu.svg'
	};

	let chartFromCurrency = writable<Currency>(initialFromCurrency);
	let chartToCurrency = writable<Currency>(initialToCurrency);
	let europeanCurrencyCodes = writable<Record<string, string> | null>(null);
	let isLoadingEuropeanCurrencies = writable(true);
	let errorLoadingEuropeanCurrencies = writable<string | null>(null);

	const availableFromCurrencies = derived(
		[europeanCurrencyCodes, chartToCurrency],
		([$europeanCurrencyCodes, $chartToCurrency]) => {
			if (!$europeanCurrencyCodes) return [];
			return Object.values(currencies)
				.filter(
					(currency) =>
						Object.keys($europeanCurrencyCodes).includes(currency.code) &&
						currency.code !== $chartToCurrency.code
				)
				.sort((a, b) => a.name.localeCompare(b.name));
		}
	);

	const availableToCurrencies = derived(
		[europeanCurrencyCodes, chartFromCurrency],
		([$europeanCurrencyCodes, $chartFromCurrency]) => {
			if (!$europeanCurrencyCodes) return [];
			return Object.values(currencies)
				.filter(
					(currency) =>
						Object.keys($europeanCurrencyCodes).includes(currency.code) &&
						currency.code !== $chartFromCurrency.code
				)
				.sort((a, b) => a.name.localeCompare(b.name));
		}
	);

	async function loadEuropeanCurrencies() {
		isLoadingEuropeanCurrencies.set(true);
		errorLoadingEuropeanCurrencies.set(null);

		try {
			const data = await fetchCurrenciesEurope();
			europeanCurrencyCodes.set(data);
		} catch (error) {
			errorLoadingEuropeanCurrencies.set('Error al cargar las monedas europeas');
		} finally {
			isLoadingEuropeanCurrencies.set(false);
		}
	}

	function handleUpdateFromCurrency(currency: Currency) {
		chartFromCurrency.set(currency);
	}

	function handleUpdateToCurrency(currency: Currency) {
		chartToCurrency.set(currency);
	}

	onMount(() => {
		loadEuropeanCurrencies();
	});
</script>

<Card>
	<CardHeader>
		<CardTitle>Convertidor de Moneda</CardTitle>
		<CardDescription>
			Convierte entre diferentes monedas, usando tasas de cambio actualizadas provenientes del Banco
			Central Europeo.
		</CardDescription>
	</CardHeader>
	<CardContent class="space-y-8">
		<Header
			chartFromCurrency={$chartFromCurrency}
			chartToCurrency={$chartToCurrency}
			availableFromCurrencies={$availableFromCurrencies}
			availableToCurrencies={$availableToCurrencies}
			isLoadingEuropeanCurrencies={$isLoadingEuropeanCurrencies}
			errorLoadingEuropeanCurrencies={$errorLoadingEuropeanCurrencies}
			onUpdateFromCurrency={handleUpdateFromCurrency}
			onUpdateToCurrency={handleUpdateToCurrency}
		/>
		{#if $chartFromCurrency && $chartToCurrency}
			<ChartComponent fromCurrency={$chartFromCurrency.code} toCurrency={$chartToCurrency.code} />
		{/if}
	</CardContent>
</Card>
