<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

import type { Currency } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import CurrencyCommand from '@/components/multipleConverter/currencyCommand.vue'

interface Props {
  currencies?: Currency[]
  initialFromCurrency?: Currency
  initialToCurrency?: Currency
}

const props = withDefaults(defineProps<Props>(), {
  currencies: () => [],
  initialFromCurrency: () => ({
    code: 'USD',
    name: 'Dólar Estadounidense',
    country: 'Estados Unidos',
    flag: 'https://flagcdn.com/us.svg',
  }),
  initialToCurrency: () => ({
    code: 'EUR',
    name: 'Euro',
    country: 'Unión Europea',
    flag: 'https://flagcdn.com/eu.svg',
  }),
})

const emit = defineEmits<{
  'update:fromCurrency': [currency: Currency]
  'update:toCurrency': [currency: Currency]
}>()

const chartFromCurrency = ref<Currency>(props.initialFromCurrency)
const chartToCurrency = ref<Currency>(props.initialToCurrency)

const setChartFromCurrency = (currency: Currency) => {
  chartFromCurrency.value = currency
}
const setChartToCurrency = (currency: Currency) => {
  chartToCurrency.value = currency
}

watch(chartFromCurrency, (newCurrency) => {
  emit('update:fromCurrency', newCurrency)
}, { deep: true })

watch(chartToCurrency, (newCurrency) => {
  emit('update:toCurrency', newCurrency)
}, { deep: true })

watch(() => props.initialFromCurrency, (newCurrency) => {
  if (newCurrency && newCurrency.code !== chartFromCurrency.value.code) {
    chartFromCurrency.value = newCurrency
  }
}, { deep: true })

watch(() => props.initialToCurrency, (newCurrency) => {
  if (newCurrency && newCurrency.code !== chartToCurrency.value.code) {
    chartToCurrency.value = newCurrency
  }
}, { deep: true })
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="space-y-2">
      <Label>De</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" type="button" class="w-full justify-between">
            <div class="flex items-center gap-2 truncate">
              <img
                :src="chartFromCurrency.flag"
                :alt="chartFromCurrency.name"
                class="h-4 w-4 rounded-sm"
              />
              {{ chartFromCurrency.code }} - {{ chartFromCurrency.name }}
            </div>
            <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-full p-0">
          <CurrencyCommand
            mode="update"
            :filter-by-europe="true"
            :excludedCurrency="chartFromCurrency"
            @update:currency="setChartFromCurrency"
          />
        </PopoverContent>
      </Popover>
    </div>
    <div class="space-y-2">
      <Label>A</Label>
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" role="combobox" class="w-full justify-between">
            <div class="flex items-center gap-2">
              <img
                :src="chartToCurrency.flag"
                :alt="chartToCurrency.name"
                class="h-4 w-4 rounded-sm"
              />
              {{ chartToCurrency.code }} - {{ chartToCurrency.name }}
            </div>
            <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-full p-0">
          <CurrencyCommand
            mode="update"
            :filter-by-europe="true"
            :excludedCurrency="chartToCurrency"
            @update:currency="setChartToCurrency"
          />
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
