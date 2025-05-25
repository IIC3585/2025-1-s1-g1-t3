<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { X } from 'lucide-vue-next'
import type { ConversionResult, Currency } from '@/lib/types'

defineProps<{
  results: ConversionResult[]
  currencies: Record<string, Currency>
  fromCurrency: Currency
}>()

const emit = defineEmits(['remove-conversion'])
</script>

<template>
  <div class="border-t pt-4 space-y-4">
    <h3 class="font-medium text-lg px-2">Conversiones Seleccionadas:</h3>
    <div class="w-full gap-1 max-h-1/2 overflow-y-auto">
      <div
        v-for="(conversion, index) in results"
        :key="conversion.currencyCode"
        class="p-4 border rounded-lg hover:bg-gray-50 transition-colors relative min-h-[120px] shadow-sm"
      >
        <Button
          variant="ghost"
          @click.stop="emit('remove-conversion', index)"
          class="absolute top-3 right-3 p-1 rounded-full"
          aria-label="Eliminar conversión"
        >
          <X class="h-4 w-4 text-gray-500 hover:text-red-500" />
        </Button>

        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center max-w-[70%]">
            <img
              :src="currencies[conversion.currencyCode].flag"
              class="h-5 w-5 mr-2 rounded-sm object-cover"
              :alt="currencies[conversion.currencyCode].name"
            />
            <div class="truncate">
              <p class="font-medium text-sm truncate">
                {{ currencies[conversion.currencyCode].name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ conversion.currencyCode }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="conversion.rate" class="text-xs text-gray-500 mb-1">
          <p>
            1 {{ fromCurrency.code }} = {{ conversion.rate?.toFixed(2) }}
            {{ conversion.currencyCode }}
          </p>
        </div>

        <div v-if="conversion.rate" class="absolute bottom-3 right-3">
          <span class="bg-blue-600 text-white rounded px-2 py-1 text-sm font-semibold shadow-md">
            {{ conversion.convertedAmount?.toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
