<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CurrencyCommand from '@/components/multipleConverter/currencyCommand.vue'
import ConversionResults from '@/components/multipleConverter/conversionResults.vue'
import useCurrencyConverter from '@/components/multipleConverter/useCurrencyConverter'
import type { Currency } from '@/lib/types'
import { ChevronDown, Loader, Plus } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const {
  loading,
  error,
  amount,
  fromCurrency,
  selectedConversions,
  setFromCurrency,
  currencies,
  addConversion,
  removeConversion,
  showError,
  resetForm,
  generateConversions
} = useCurrencyConverter()
</script>

<template>
  <div
    v-if="error"
    class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-2 rounded shadow-lg transition-opacity duration-500"
    :style="{ opacity: showError ? 1 : 0 }"
  >
    {{ error }}
  </div>
  <Card class="flex flex-col ">
    <CardHeader>
      <CardTitle>Convertidor de Moneda</CardTitle>
      <CardDescription>
        Convierte entre diferentes monedas usando tasas de cambio actualizadas
      </CardDescription>
    </CardHeader>

    <CardContent class="flex-1 space-y-4">
      <div v-if="loading" class="flex justify-center items-center h-full">
        <Loader class="animate-spin text-primary h-8 w-8" />
      </div>
      <template v-else>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="amount">Cantidad</Label>
              <Input
                type="number"
                id="amount"
                placeholder="Ingresa cantidad a cambiar"
                v-model="amount"
                min="0"
                step="0.01"
                class="text-lg w-full"
              />
            </div>
            <div class="space-y-2">
              <Label>De</Label>
              <Popover>
                <PopoverTrigger as-child>
                  <Button variant="outline" role="combobox" type="button" class="w-full justify-between">
                    <div class="flex items-center gap-2 truncate">
                      <img
                        :src="fromCurrency.flag"
                        :alt="fromCurrency.name"
                        class="h-4 w-4 rounded-sm object-cover"
                      />
                      <span class="truncate">{{ fromCurrency.name }}</span>
                      <span class="text-xs text-muted-foreground">{{ fromCurrency.code }}</span>
                    </div>
                    <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-40" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="p-0 w-[var(--radix-popover-trigger-width)]">
                  <CurrencyCommand
                    mode="update"
                    :excludedCurrency="fromCurrency"
                    @update:currency="setFromCurrency"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div class="space-y-2">
            <Label>A</Label>
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  type="button"
                  class="w-full justify-center gap-2"
                >
                  <Plus class="h-4 w-4" />
                  <span>Añadir moneda</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="p-0 w-[var(--radix-popover-trigger-width)]">
                <CurrencyCommand
                  mode="add"
                  :excludedCurrency="fromCurrency"
                  @add:currency="addConversion"
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>

        <ConversionResults

          v-if="selectedConversions.length > 0"
          :results="selectedConversions"
          :currencies="currencies"
          :from-currency="fromCurrency"
          @remove-conversion="removeConversion"
          class="mt-4 overflow-y-auto max-h-[300px] flex-1"
        />
      </template>

    </CardContent>

    <CardFooter
      class="border-t pt-4 flex justify-between gap-2"
      :class="{ 'mt-auto': selectedConversions.length === 0 }"
    >
      <Button
        v-if="selectedConversions.length > 0"
        @click="resetForm"
        variant="outline"
        class="flex-1"
      >
        Reiniciar
      </Button>
      <Loader
        v-if="loading"
        class="h-5 w-5 animate-spin text-primary"
        role="status"
        aria-label="Cargando"
      />
      <Button
        v-if="selectedConversions.length > 0 && !loading"
        @click="generateConversions"
        variant="default"
        :disabled="loading"
        :class="{ 'opacity-50 cursor-not-allowed': loading }"
      >
        Convertir
      </Button>
    </CardFooter>
  </Card>
</template>
