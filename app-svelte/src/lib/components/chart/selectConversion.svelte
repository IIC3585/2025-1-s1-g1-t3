<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import type { Currency } from '$lib/types';
	import { Button } from '$lib/components/ui/button';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import { Label } from '$lib/components/ui/label';
	import CurrencyCommand from '$lib/components/multipleConverter/currencyCommand.svelte';

	const props = $props<{
		chartFromCurrency: Currency;
		chartToCurrency: Currency;
		availableFromCurrencies: Currency[];
		availableToCurrencies: Currency[];
		isLoadingEuropeanCurrencies: boolean;
		errorLoadingEuropeanCurrencies: string | null;
		onUpdateFromCurrency: (currency: Currency) => void;
		onUpdateToCurrency: (currency: Currency) => void;
	}>();
</script>

<div class="grid grid-cols-2 gap-4">
	<div class="space-y-2">
		<Label>De</Label>
		<Popover>
			<PopoverTrigger class="w-full justify-between">
				<Button variant="outline" role="combobox" class="w-full justify-between">
					<div class="flex items-center gap-2 truncate">
						<img
							src={props.chartFromCurrency.flag}
							alt={props.chartFromCurrency.name}
							class="h-4 w-4 rounded-sm"
						/>
						{props.chartFromCurrency.code} - {props.chartFromCurrency.name}
					</div>
					<ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-full p-0">
				{#if props.isLoadingEuropeanCurrencies}
					<div class="flex items-center justify-center py-8">
						<div class="flex items-center gap-2 text-sm text-gray-500">
							<div class="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
							<span>Cargando monedas europeas...</span>
						</div>
					</div>
				{:else if props.errorLoadingEuropeanCurrencies}
					<div class="py-8 text-center text-sm text-red-500">
						{props.errorLoadingEuropeanCurrencies}
					</div>
				{:else}
					<CurrencyCommand
						availableCurrencies={props.availableFromCurrencies}
						onSelect={props.onUpdateFromCurrency}
					/>
				{/if}
			</PopoverContent>
		</Popover>
	</div>
	<div class="space-y-2">
		<Label>A</Label>
		<Popover>
			<PopoverTrigger class="w-full justify-between">
				<Button variant="outline" role="combobox" class="w-full justify-between">
					<div class="flex items-center gap-2">
						<img
							src={props.chartToCurrency.flag}
							alt={props.chartToCurrency.name}
							class="h-4 w-4 rounded-sm"
						/>
						{props.chartToCurrency.code} - {props.chartToCurrency.name}
					</div>
					<ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-full p-0">
				{#if props.isLoadingEuropeanCurrencies}
					<div class="flex items-center justify-center py-8">
						<div class="flex items-center gap-2 text-sm text-gray-500">
							<div class="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
							<span>Cargando monedas europeas...</span>
						</div>
					</div>
				{:else if props.errorLoadingEuropeanCurrencies}
					<div class="py-8 text-center text-sm text-red-500">
						{props.errorLoadingEuropeanCurrencies}
					</div>
				{:else}
					<CurrencyCommand
						availableCurrencies={props.availableToCurrencies}
						onSelect={props.onUpdateToCurrency}
					/>
				{/if}
			</PopoverContent>
		</Popover>
	</div>
</div>
