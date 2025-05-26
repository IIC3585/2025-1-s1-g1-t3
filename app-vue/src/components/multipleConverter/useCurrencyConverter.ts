import { ref } from 'vue'
import type { ConversionResult, Currency } from '@/lib/types'
import { convert } from '@/lib/api'
import { currencies } from '@/lib/currencies'

export default function useCurrencyConverter() {
  const exchangeRates = ref<Record<string, number>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)
  const amount = ref<number>(0)
  const showError = ref(false)

  const fromCurrency = ref<Currency>({
    country: 'Estados Unidos',
    code: 'USD',
    name: 'Dólar estadounidense',
    flag: 'https://flagcdn.com/us.svg',
  })

  const selectedConversions = ref<ConversionResult[]>([])


  const setFromCurrency = (currency: Currency) => {
    fromCurrency.value = currency
  }

  const addConversion = (currency: Currency) => {
    if (!selectedConversions.value.some(c => c.currencyCode === currency.code)) {
      selectedConversions.value.push(
        {
          currencyCode: currency.code,
          rate: exchangeRates.value[currency.code] || 0,
        } as ConversionResult
      )
    }
  }

  const removeConversion = (index: number) => {
    selectedConversions.value.splice(index, 1)
  }

  const resetForm = () => {
    amount.value = 0
    selectedConversions.value = []
    fromCurrency.value = {
      country: 'Estados Unidos',
      code: 'USD',
      name: 'Dólar estadounidense',
      flag: 'https://flagcdn.com/us.svg',
    }
  }

  const generateConversions = async () => {
  if (loading.value) return
    loading.value = true
    error.value = null
    try {
    const res = await convert(fromCurrency.value.code, selectedConversions.value.map(c => c.currencyCode), amount.value)
    selectedConversions.value = res

  } catch (err) {
    error.value =` ${err instanceof Error ? err.message : 'Error while converting currencies'}`
    showError.value = true
  } finally {
      loading.value = false
      setTimeout(() => {
        showError.value = false
      }, 1500)
    }
  }

  return {
    loading,
    error,
    amount,
    fromCurrency,
    showError,
    selectedConversions,
    currencies,
    setFromCurrency,
    addConversion,
    removeConversion,
    resetForm,
    generateConversions
  }
}
