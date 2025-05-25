<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import CurrencyCommand from '$lib/components/multipleConverter/currencyCommand.svelte';
	import ConversionResults from '$lib/components/multipleConverter/conversionResults.svelte';
	import { ChevronDown, Loader, Plus } from '@lucide/svelte/icons';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { currencyConverter } from '$lib/hooks/useCurrencyConverter';

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
	} = currencyConverter;
</script>

{#if $error}
	<div
		class="fixed left-1/2 top-4 z-50 -translate-x-1/2 transform rounded bg-red-600 px-6 py-2 text-white shadow-lg transition-opacity duration-500"
		style:opacity={$showError ? 1 : 0}
	>
		{$error}
	</div>
{/if}

<Card class="flex h-[80vh] flex-col">
	<CardHeader>
		<CardTitle>Convertidor de Moneda</CardTitle>
		<CardDescription>
			Convierte entre diferentes monedas usando tasas de cambio actualizadas
		</CardDescription>
	</CardHeader>

	<CardContent class="flex-1 space-y-4">
		{#if $loading}
			<div class="flex h-full items-center justify-center">
				<Loader class="text-primary h-8 w-8 animate-spin" />
			</div>
		{:else}
			<form class="space-y-4">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="amount" class="text-primary block text-sm font-medium">Cantidad</Label>
						<Input
							type="number"
							id="amount"
							placeholder="Ingresa cantidad a cambiar"
							bind:value={$amount}
							min="0"
							step="0.01"
							class="w-full text-lg"
						/>
					</div>
					<div class="space-y-2">
						<Label>De</Label>
						<Popover>
							<PopoverTrigger class="w-full justify-between">
								<div class="inline-block w-full">
									<!-- Contenedor neutral -->
									<Button variant="outline" role="combobox" class="w-full justify-between">
										<div class="flex items-center gap-2 truncate">
											<img
												src={$fromCurrency.flag}
												alt={$fromCurrency.name}
												class="h-4 w-4 rounded-sm object-cover"
											/>
											<span class="truncate">{$fromCurrency.name}</span>
											<span class="text-muted-foreground text-xs">{$fromCurrency.code}</span>
										</div>
										<ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-40" />
									</Button>
								</div>
							</PopoverTrigger>
							<PopoverContent class="w-[var(--radix-popover-trigger-width)] p-0">
								<CurrencyCommand
									onSelect={setFromCurrency}
									availableCurrencies={Object.values(currencies)}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>

				<div class="space-y-2">
					<Label>A</Label>
					<Popover>
						<PopoverTrigger class="w-full justify-center gap-2">
							<div class="inline-block w-full">
								<!-- Contenedor neutral -->
								<Button variant="outline" class="w-full justify-center gap-2">
									<Plus class="h-4 w-4" />
									<span>Añadir moneda</span>
								</Button>
							</div>
						</PopoverTrigger>
						<PopoverContent class="w-[var(--radix-popover-trigger-width)] p-0">
							<CurrencyCommand
								onSelect={addConversion}
								availableCurrencies={Object.values(currencies)}
							/>
						</PopoverContent>
					</Popover>
				</div>
			</form>

			{#if $selectedConversions.length > 0}
				<div class="mt-4 max-h-[300px] flex-1 overflow-y-auto">
					<ConversionResults
						results={$selectedConversions}
						{currencies}
						fromCurrency={$fromCurrency}
						{removeConversion}
					/>
				</div>
			{/if}
		{/if}
	</CardContent>

	<CardFooter
		class="flex justify-between gap-2 border-t pt-4 {$selectedConversions.length === 0
			? 'mt-auto'
			: ''}"
	>
		{#if $selectedConversions.length > 0}
			<Button onclick={resetForm} variant="outline" class="flex-1">Reiniciar</Button>
		{/if}

		{#if $loading}
			<Loader class="text-primary h-5 w-5 animate-spin" role="status" aria-label="Cargando" />
		{:else if $selectedConversions.length > 0}
			<Button
				onclick={generateConversions}
				variant="default"
				disabled={$loading}
				class={`flex-1${$loading ? ' cursor-not-allowed opacity-50' : ''}`}
			>
				Convertir
			</Button>
		{/if}
	</CardFooter>
</Card>
