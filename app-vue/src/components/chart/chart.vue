<template>
  <div class="h-full flex flex-col space-y-4">
    <!-- Loading State -->
    <div v-if="isLoading" class="h-full flex flex-col space-y-4">
      <div class="flex justify-between items-center">
        <div class="animate-pulse w-40 h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div class="flex space-x-1">
          <div
            v-for="period in periods"
            :key="period.value"
            class="animate-pulse w-10 h-8 bg-slate-200 dark:bg-slate-700 rounded"
          ></div>
        </div>
      </div>
      <div class="flex-1 animate-pulse bg-slate-200 dark:bg-slate-700 rounded"></div>
    </div>

    <!-- Chart Content -->
    <template v-else>
      <div class="flex justify-between items-center">
        <div class="text-sm">
          <div class="font-medium">
            1 {{ fromCurrency }} = {{ currentRate ? currentRate.toFixed(6) : '...' }}
            {{ toCurrency }}
          </div>
          <div class="text-xs text-muted-foreground">
            {{ lastUpdated || 'Actualizando...' }}
          </div>
        </div>
        <div class="flex flex-wrap gap-1">
          <Button
            v-for="period in periods"
            :key="period.value"
            :variant="selectedPeriod === period.value ? 'default' : 'outline'"
            size="sm"
            class="h-7 px-2 text-xs"
            @click="setSelectedPeriod(period.value as TimePeriod)"
          >
            {{ period.label }}
          </Button>
        </div>
      </div>

      <!-- No Data State -->
      <div
        v-if="chartData.length === 0"
        class="flex-1 flex items-center justify-center text-muted-foreground"
      >
        No hay datos disponibles para el período seleccionado
      </div>

      <!-- Chart -->
      <div v-else class="flex-1">
        <canvas class="h-48" ref="chartCanvas"></canvas>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from 'vue'
import {
  Chart,
  registerables,
  type ChartConfiguration,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Button } from '@/components/ui/button'
import { fetchTimeSeriesData, fetchCurrentRatesEurope } from '@/lib/api'

Chart.register(...registerables)

interface Props {
  fromCurrency: string
  toCurrency: string
}

interface ChartDataPoint {
  date: string
  rate: number
  timestamp: string
}

type TimePeriod = '1w' | '1m' | '1y' | '2y' | '5y' | '10y'

const props = defineProps<Props>()

const chartData = ref<ChartDataPoint[]>([])
const isLoading = ref<boolean>(false)
const selectedPeriod = ref<TimePeriod>('1w')
const currentRate = ref<number | null>(null)
const lastUpdated = ref<string>('')
const chartCanvas = ref<HTMLCanvasElement>()
const chartInstance = ref<Chart | null>(null)


function getDateRange(period: TimePeriod): { startDate: string; endDate: string } {
  const now = new Date()
  const endDate = now.toISOString().split('T')[0]
  const startDate = new Date(now)

  switch (period) {
    case '1w':
      startDate.setDate(now.getDate() - 7)
      break
    case '1m':
      startDate.setMonth(now.getMonth() - 1)
      break
    case '1y':
      startDate.setFullYear(now.getFullYear() - 1)
      break
    case '2y':
      startDate.setFullYear(now.getFullYear() - 2)
      break
    case '5y':
      startDate.setFullYear(now.getFullYear() - 5)
      break
    case '10y':
      startDate.setFullYear(now.getFullYear() - 10)
      break
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate,
  }
}

function formatDateForDisplay(dateStr: string, period: TimePeriod): string {
  const dateObj = new Date(dateStr + 'T00:00:00')

  if (period === '1w') {
    return dateObj.toLocaleDateString([], { weekday: 'short', day: 'numeric' })
  } else if (period === '1m') {
    return dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' })
  } else {
    return dateObj.toLocaleDateString([], { month: 'short', year: '2-digit' })
  }
}

function createChart() {
  if (!chartCanvas.value || chartData.value.length === 0) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  const data: ChartData<'line'> = {
    labels: chartData.value.map((d) => d.date),
    datasets: [
      {
        label: `${props.fromCurrency} → ${props.toCurrency}`,
        data: chartData.value.map((d) => d.rate),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 1,
        pointHoverRadius: 5,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.parsed.y.toFixed(6)} ${props.toCurrency}`
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: (value) => {
            return Number(value).toFixed(2)
          },
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data,
    options,
  }

  if (chartInstance.value) {
    chartInstance.value.destroy()
  }

  chartInstance.value = new Chart(ctx, config)
}

async function fetchHistoricalData() {
  try {
    isLoading.value = true

    const { startDate, endDate } = getDateRange(selectedPeriod.value)
    const data = await fetchTimeSeriesData(props.fromCurrency, props.toCurrency, startDate, endDate)

    const formattedData: ChartDataPoint[] = Object.entries(data.rates || {})
      .map(([date, rates]: [string, any]) => {
        const rate = rates[props.toCurrency] || 0
        return {
          date: formatDateForDisplay(date, selectedPeriod.value),
          rate: rate,
          timestamp: date,
        }
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    chartData.value = formattedData

    const currentRates = await fetchCurrentRatesEurope(props.fromCurrency, props.toCurrency)
    const rate = currentRates.rates?.[props.toCurrency] || 0
    currentRate.value = rate
    lastUpdated.value = new Date().toUTCString()

    isLoading.value = false

    await nextTick()
    createChart()
  } catch (error) {
    isLoading.value = false
  }
}

function setSelectedPeriod(period: TimePeriod) {
  selectedPeriod.value = period
}

const periods = [
  { value: '1w', label: '1w' },
  { value: '1m', label: '1m' },
  { value: '1y', label: '1y' },
  { value: '2y', label: '2y' },
  { value: '5y', label: '5y' },
  { value: '10y', label: '10y' },
] as const

watch(
  [() => props.fromCurrency, () => props.toCurrency, selectedPeriod],
  () => {
    fetchHistoricalData()
  },
  { immediate: true },
)

watch(chartData, () => {
  nextTick(() => {
    createChart()
  })
})

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})
</script>
