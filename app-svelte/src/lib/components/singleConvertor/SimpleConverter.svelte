<script lang="ts">
	import { currencies } from '$lib/currencies';
	import { convert } from '$lib/api';
	import type { ConversionResult } from '$lib/types';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	let from = 'USD';
	let to = 'EUR';
	let amount = 1;
	let result: number | null = null;
	let loading = false;
	let error = '';

	const currencyList = Object.entries(currencies);

	function swapCurrencies() {
		[from, to] = [to, from];
	}

	function resetForm() {
		amount = 1;
		from = 'USD';
		to = 'EUR';
		result = null;
		error = '';
	}

	async function handleConvert() {
		try {
			loading = true;
			error = '';
			const res: ConversionResult[] = await convert(from, [to], amount);
			result = res[0]?.convertedAmount ?? null;
		} catch (e) {
			error = 'Error al convertir. Intenta nuevamente.';
			result = null;
		} finally {
			loading = false;
		}
	}
</script>

<Card>
	<CardHeader>
		<CardTitle>Convertidor de Moneda</CardTitle>
		<CardDescription>
			Convierte entre diferentes monedas usando tasas de cambio actualizadas
		</CardDescription>
	</CardHeader>
	<CardContent class="space-y-8">
		<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="amount-input" class="text-sm font-medium">Monto</label>
				<input
					id="amount-input"
					type="number"
					bind:value={amount}
					min="0"
					class="mt-1 w-full rounded-md border px-3 py-2"
				/>
			</div>

			<div>
				<label for="resultado" class="text-sm font-medium">Resultado</label>
				<input
					id="resultado"
					type="text"
					value={result ?? ''}
					readonly
					class="mt-1 w-full rounded-md border bg-gray-50 px-3 py-2"
				/>
			</div>
		</div>

		<div class="mb-4 grid grid-cols-3 items-end gap-4">
			<div>
				<label for="from-currency" class="text-sm font-medium">De</label>
				<select
					id="from-currency"
					bind:value={from}
					class="mt-1 w-full rounded-md border px-3 py-2"
				>
					{#each currencyList as [code, currency]}
						<option value={code}>{code} - {currency.name}</option>
					{/each}
				</select>
			</div>

			<div class="flex justify-center pb-1">
				<button
					onclick={swapCurrencies}
					class="mt-6 rounded bg-black px-3 py-2 text-white hover:bg-gray-800"
					title="Intercambiar"
				>
					↔
				</button>
			</div>

			<div>
				<label for="to-currency" class="text-sm font-medium">A</label>
				<select id="to-currency" bind:value={to} class="mt-1 w-full rounded-md border px-3 py-2">
					{#each currencyList as [code, currency]}
						<option value={code}>{code} - {currency.name}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="flex flex-col gap-4 md:flex-row">
			<button
				onclick={resetForm}
				class="w-full flex-1 rounded bg-black px-4 py-2 text-white hover:bg-gray-800 md:w-auto"
			>
				Resetear
			</button>

			<button
				onclick={handleConvert}
				class="w-full flex-1 rounded bg-black px-4 py-2 text-white hover:bg-gray-800 md:w-auto"
				disabled={loading}
			>
				{loading ? 'Convirtiendo...' : 'Convertir'}
			</button>
		</div>

		{#if error}
			<p class="mt-2 text-sm text-red-500">{error}</p>
		{/if}
	</CardContent>
</Card>
