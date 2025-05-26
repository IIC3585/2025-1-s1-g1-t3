<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { currencies } from '@/lib/currencies'
import type { Currency } from '@/lib/types'


const props = defineProps<{
  excludedCurrency: Currency
  mode?: 'add' | 'update'
}>()

const emit = defineEmits<{
  (e: 'add:currency', currency: Currency): void
  (e: 'update:currency', currency: Currency): void
}>()

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
    <CommandInput placeholder="Buscar moneda..." />
    <CommandList>
      <CommandEmpty>No se encontraron resultados</CommandEmpty>
      <CommandGroup heading="Monedas disponibles">
        <CommandItem
          v-for="currency in Object.values(currencies).filter(c => c.code !== excludedCurrency?.code)"
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
      </CommandGroup>
    </CommandList>
  </Command>
</template>
