<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Header from '@/components/chart/selectConversion.vue'
import Chart from '@/components/chart/chart.vue'
import type { Currency } from '@/lib/types'
import { ref } from 'vue'

const selectedFromCurrency = ref<Currency>({
  code: 'USD',
  name: 'Dólar Estadounidense',
  country: 'Estados Unidos',
  flag: 'https://flagcdn.com/us.svg',
})

const selectedToCurrency = ref<Currency>({
  code: 'EUR',
  name: 'Euro',
  country: 'Unión Europea',
  flag: 'https://flagcdn.com/eu.svg',
})

const handleFromCurrencyUpdate = (currency: Currency) => {
  selectedFromCurrency.value = currency
}

const handleToCurrencyUpdate = (currency: Currency) => {
  selectedToCurrency.value = currency
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Convertidor de Moneda</CardTitle>
      <CardDescription>
        Convierte entre diferentes monedas, usando tasas de cambio
        actualizadas provenientes del Banco Central Europeo.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-8">
      <Header
        :initial-from-currency="selectedFromCurrency"
        :initial-to-currency="selectedToCurrency"
        @update:from-currency="handleFromCurrencyUpdate"
        @update:to-currency="handleToCurrencyUpdate"
      />
      <Chart 
        :from-currency="selectedFromCurrency.code" 
        :to-currency="selectedToCurrency.code" 
      />
    </CardContent>
  </Card>
</template>
