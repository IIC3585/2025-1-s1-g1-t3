<script lang="ts">
  export let convertedAmount: number | null;
</script>

<div class="space-y-2">
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label class="block text-sm font-medium text-gray-700">Resultado</label>
  <input
    class="w-full px-3 py-2 border rounded"
    value={convertedAmount !== null ? convertedAmount.toFixed(2) : ''}
    readonly
  />
</div>
