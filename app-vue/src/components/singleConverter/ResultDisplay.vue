<template>
  <div class="space-y-2">
    <Label>Resultado</Label>
    <Input :value="formattedResult" readonly />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  result: number | null
}>()

const formattedResult = computed(() =>
  props.result !== null ? props.result.toFixed(2) : ''
)
</script>