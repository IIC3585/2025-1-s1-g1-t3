<template>
  <Card>
    <CardHeader>
      <CardTitle>Conversor de Moneda</CardTitle>
      <CardDescription>
        Convierte entre diferentes monedas fácilmente.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-8">
      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-2">
          <Label for="amount">Monto</Label>
          <Input id="amount" v-model.number="amount" type="number" min="0" step="0.01" />
        </div>
        <ResultDisplay :result="convertedAmount" />
      </div>

      <div class="flex gap-4 items-end">
        <CurrencySelect label="De" :currencies="currencies" v-model="from" class="flex-1" />
        <Button @click="swapCurrencies" class="mb-1">↔</Button>
        <CurrencySelect label="A" :currencies="currencies" v-model="to" class="flex-1" />
      </div>
    </CardContent>
    <CardFooter class="justify-center grid grid-cols-2 gap-4">
      <Button @click="reset" variant="outline">Resetear</Button>
      <Button @click="convertCurrency">Convertir</Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import CurrencySelect from '@/components/singleConverter/CurrencySelect.vue'
import ResultDisplay from '@/components/singleConverter/ResultDisplay.vue'

import { convert } from '@/lib/api'
import { currencies as allCurrencies } from '@/lib/currencies'

const amount = ref(1)
const from = ref('USD')
const to = ref('EUR')
const convertedAmount = ref<number | null>(null)

const currencies = Object.values(allCurrencies)

const swapCurrencies = () => {
  const temp = from.value
  from.value = to.value
  to.value = temp
}

const reset = () => {
  amount.value = 1
  convertedAmount.value = null
}

const convertCurrency = async () => {
  try {
    const result = await convert(from.value, [to.value], amount.value)
    convertedAmount.value = result[0].convertedAmount ?? null
  } catch (error) {
    console.error('Error al convertir:', error)
    convertedAmount.value = null
  }
}
</script>
