<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { currencies } from '@/lib/currencies'
import type { Currency } from '@/lib/types'
import { fetchCurrenciesEurope } from '@/lib/api'

const props = defineProps<{
  excludedCurrency: Currency
  mode?: 'add' | 'update'
  filterByEurope?: boolean
}>()

const emit = defineEmits<{
  (e: 'add:currency', currency: Currency): void
  (e: 'update:currency', currency: Currency): void
  (e: 'loading:change', loading: boolean): void
}>()

const europeanCurrencies = ref<Record<string, string>>({})
const isLoadingEuropeanCurrencies = ref(false)
const errorLoadingEuropean = ref(false)

const loadEuropeanCurrencies = async () => {
  if (!props.filterByEurope || Object.keys(europeanCurrencies.value).length > 0) {
    return
  }

  try {
    isLoadingEuropeanCurrencies.value = true
    errorLoadingEuropean.value = false
    emit('loading:change', true)

    europeanCurrencies.value = await fetchCurrenciesEurope()
    // console.log('Loaded European currencies:', Object.keys(europeanCurrencies.value).length)
  } catch (error) {
    console.error('Error loading European currencies:', error)
    errorLoadingEuropean.value = true
    europeanCurrencies.value = {}
  } finally {
    isLoadingEuropeanCurrencies.value = false
    emit('loading:change', false)
  }
}

onMounted(() => {
  if (props.filterByEurope) {
    loadEuropeanCurrencies()
  }
})

watch(
  () => props.filterByEurope,
  (newValue) => {
    if (newValue) {
      loadEuropeanCurrencies()
    }
  },
)

const availableCurrencies = computed(() => {
  let currencyList = Object.values(currencies)

  if (props.filterByEurope && Object.keys(europeanCurrencies.value).length > 0) {
    currencyList = currencyList.filter((currency) =>
      Object.keys(europeanCurrencies.value).includes(currency.code),
    )
  }

  if (props.excludedCurrency?.code) {
    currencyList = currencyList.filter((currency) => currency.code !== props.excludedCurrency.code)
  }

  return currencyList.sort((a, b) => a.name.localeCompare(b.name))
})

const placeholderText = computed(() => {
  if (isLoadingEuropeanCurrencies.value) {
    return 'Cargando monedas...'
  }
  if (props.filterByEurope) {
    return 'Buscar moneda europea...'
  }
  return 'Buscar moneda...'
})

const groupHeading = computed(() => {
  const count = availableCurrencies.value.length
  const total = Object.keys(currencies).length

  if (props.filterByEurope) {
    return `Monedas Europeas (${count} disponibles)`
  }
  return `Monedas disponibles (${count}/${total})`
})

const handleSelect = (currency: Currency) => {
  if (props.mode === 'add') {
    emit('add:currency', currency)
  } else {
    emit('update:currency', currency)
  }
}
</script>

<template>
  <Command class="rounded-lg border">
    <CommandInput :placeholder="placeholderText" :disabled="isLoadingEuropeanCurrencies" />
    <CommandList>
      <CommandEmpty
        ><div class="text-center py-4">
          <p class="text-sm text-gray-500 mb-2">No se encontraron resultados</p>
          <p v-if="filterByEurope" class="text-xs text-gray-400">
            Buscando solo en monedas europeas
          </p>
        </div></CommandEmpty
      >
      <CommandGroup :heading="groupHeading">
        <div v-if="isLoadingEuropeanCurrencies" class="flex items-center justify-center py-8">
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Cargando monedas europeas...</span>
          </div>
        </div>
        <template v-else>
          <CommandItem
            v-for="currency in availableCurrencies"
            :key="currency.code"
            :value="currency.code"
            @select="handleSelect(currency)"
          >
            <img
              :src="currency.flag"
              :alt="currency.name"
              :title="currency.name"
              class="h-4 w-4 mr-2 rounded-sm"
            />
            <span>{{ currency.name }} ({{ currency.code }})</span>
          </CommandItem>
        </template>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
