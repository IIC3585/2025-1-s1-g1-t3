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
    <h3 class="font-medium">Conversiones Seleccionadas:</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(conversion, index) in results"
        :key="conversion?.currencyCode || index"
        class="p-3 border rounded-lg hover:bg-gray-50 transition-colors relative min-h-[120px]"
      >
        <Button
          @click.stop="emit('remove-conversion', index)"
          class="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          aria-label="Eliminar conversión"
          variant="ghost"
        >
          <X class="h-4 w-4 text-gray-500" />
        </Button>

        <template v-if="conversion && currencies && fromCurrency">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center max-w-[70%]">
              <img
                v-if="currencies[conversion.currencyCode]?.flag"
                :src="currencies[conversion.currencyCode].flag"
                class="h-5 w-5 mr-2 rounded-sm"
                :alt="currencies[conversion.currencyCode]?.name || conversion.currencyCode"
              />
              <div class="truncate">
                <p class="font-medium text-sm truncate">
                  {{ currencies[conversion.currencyCode]?.name || conversion.currencyCode }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ conversion.currencyCode }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="conversion.rate" class="text-xs text-gray-500 mb-1">
            <p>
              1 {{ fromCurrency.code }} =
              {{ conversion.rate?.toFixed(2) }}
              {{ conversion.currencyCode }}
            </p>
          </div>

          <div class="absolute bottom-3 right-3">
            <span
              v-if="typeof conversion.convertedAmount === 'number'"
              class="bg-blue-600 text-white rounded px-2 py-1 text-sm font-semibold"
            >
              {{ conversion.convertedAmount.toFixed(2) }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
