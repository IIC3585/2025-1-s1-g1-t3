<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import X from '@lucide/svelte/icons/x';
  import type { ConversionResult, Currency } from '$lib/types';

  let {
    results = [],
    currencies = {},
    fromCurrency,
    removeConversion
  } = $props<{
    results: ConversionResult[];
    currencies: Record<string, Currency>;
    fromCurrency: Currency;
    removeConversion: (index: number) => void;
  }>();

</script>

<div class="border-t pt-4 space-y-4">
  <h3 class="font-medium">Conversiones Seleccionadas:</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each results as conversion, index (conversion?.currencyCode || index)}
      <div
        class="p-3 border rounded-lg hover:bg-gray-50 transition-colors relative min-h-[120px]"
      >
        <Button
          onclick={() => removeConversion(index)}
          class="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          aria-label="Eliminar conversión"
          variant="ghost"
        >
          <X class="h-4 w-4 text-gray-500" />
        </Button>

        {#if conversion && currencies && fromCurrency}
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center max-w-[70%]">
              {#if currencies[conversion.currencyCode]?.flag}
                <img
                  src={currencies[conversion.currencyCode].flag}
                  class="h-5 w-5 mr-2 rounded-sm"
                  alt={currencies[conversion.currencyCode]?.name || conversion.currencyCode}
                />
              {/if}
              <div class="truncate">
                <p class="font-medium text-sm truncate">
                  {currencies[conversion.currencyCode]?.name || conversion.currencyCode}
                </p>
                <p class="text-xs text-gray-500">
                  {conversion.currencyCode}
                </p>
              </div>
            </div>
          </div>

          {#if conversion.rate}
            <div class="text-xs text-gray-500 mb-1">
              <p>
                1 {fromCurrency.code} =
                {conversion.rate?.toFixed(2)}
                {conversion.currencyCode}
              </p>
            </div>
          {/if}

          <div class="absolute bottom-3 right-3">
            {#if typeof conversion.convertedAmount === 'number'}
              <span class="bg-blue-600 text-white rounded px-2 py-1 text-sm font-semibold">
                {conversion.convertedAmount.toFixed(2)}
              </span>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>