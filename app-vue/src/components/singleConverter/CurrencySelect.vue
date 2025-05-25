<template>
  <div class="space-y-1 w-full">
    <Label :for="label.toLowerCase()">{{ label }}</Label>
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" class="w-full justify-between">
          <div class="flex items-center gap-2">
            <img
              v-if="selectedCurrency"
              :src="selectedCurrency.flag"
              :alt="selectedCurrency.code"
              class="w-5 h-4 rounded-sm"
            />
            <span>{{ selectedCurrency?.code }} - {{ selectedCurrency?.name }}</span>
          </div>
          <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-full p-0 max-h-[200px] overflow-y-auto z-50 bg-white border rounded shadow-md">
        <div>
          <input
            type="text"
            v-model="search"
            placeholder="Buscar moneda..."
            class="w-full px-3 py-2 border-b outline-none text-sm"
          />
          <ul>
            <li
              v-for="currency in filteredCurrencies"
              :key="currency.code"
              @click="emit('update:modelValue', currency.code)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <img
                :src="currency.flag"
                :alt="currency.name"
                class="w-5 h-4 rounded-sm"
              />
              <span>{{ currency.code }} - {{ currency.name }}</span>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { ChevronDown } from 'lucide-vue-next'
import { defineProps, defineEmits } from 'vue'

interface CurrencyOption {
  code: string
  name: string
  flag: string
}

const props = defineProps<{
  label: string
  currencies: CurrencyOption[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const search = ref('')

const selectedCurrency = computed(() =>
  props.currencies.find(c => c.code === props.modelValue)
)

const filteredCurrencies = computed(() => {
  const term = search.value.trim().toLowerCase()
  return props.currencies.filter(c =>
    c.code.toLowerCase().includes(term) ||
    c.name.toLowerCase().includes(term)
  )
})
</script>
