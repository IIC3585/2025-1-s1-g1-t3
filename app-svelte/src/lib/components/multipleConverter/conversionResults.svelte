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

<div class="space-y-4 border-t pt-4">
	<h3 class="font-medium">Conversiones Seleccionadas:</h3>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each results as conversion, index (conversion?.currencyCode || index)}
			<div class="relative min-h-[120px] rounded-lg border p-3 transition-colors hover:bg-gray-50">
				<Button
					onclick={() => removeConversion(index)}
					class="absolute top-2 right-2 rounded-full p-1 hover:bg-gray-200"
					aria-label="Eliminar conversión"
					variant="ghost"
				>
					<X class="h-4 w-4 text-gray-500" />
				</Button>

				{#if conversion && currencies && fromCurrency}
					<div class="mb-2 flex items-center justify-between">
						<div class="flex max-w-[70%] items-center">
							{#if currencies[conversion.currencyCode]?.flag}
								<img
									src={currencies[conversion.currencyCode].flag}
									class="mr-2 h-5 w-5 rounded-sm"
									alt={currencies[conversion.currencyCode]?.name || conversion.currencyCode}
								/>
							{/if}
							<div class="truncate">
								<p class="truncate text-sm font-medium">
									{currencies[conversion.currencyCode]?.name || conversion.currencyCode}
								</p>
								<p class="text-xs text-gray-500">
									{conversion.currencyCode}
								</p>
							</div>
						</div>
					</div>

					{#if conversion.rate}
						<div class="mb-1 text-xs text-gray-500">
							<p>
								1 {fromCurrency.code} =
								{conversion.rate?.toFixed(2)}
								{conversion.currencyCode}
							</p>
						</div>
					{/if}

					<div class="absolute right-3 bottom-3">
						{#if typeof conversion.convertedAmount === 'number'}
							<span class="rounded bg-blue-600 px-2 py-1 text-sm font-semibold text-white">
								{conversion.convertedAmount.toFixed(2)}
							</span>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
