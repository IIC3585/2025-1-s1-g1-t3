<script lang="ts">
  import { currencies } from '$lib/currencies'
  import { convert } from '$lib/api'
  import type { ConversionResult } from '$lib/types'

  let from = 'USD'
  let to = 'EUR'
  let amount = 1
  let result: number | null = null
  let loading = false
  let error = ''

  const currencyList = Object.entries(currencies)

  function swapCurrencies() {
    [from, to] = [to, from]
  }

  function resetForm() {
    amount = 1
    from = 'USD'
    to = 'EUR'
    result = null
    error = ''
  }

  async function handleConvert() {
    try {
      loading = true
      error = ''
      const res: ConversionResult[] = await convert(from, [to], amount)
      result = res[0]?.convertedAmount ?? null
    } catch (e) {
      error = 'Error al convertir. Intenta nuevamente.'
      result = null
    } finally {
      loading = false
    }
  }
</script>

<div class="p-6 rounded-2xl shadow-md border max-w-3xl mx-auto">
  <h2 class="text-xl font-semibold mb-1">Conversor de Moneda</h2>
  <p class="text-sm text-gray-500 mb-4">Convierte entre diferentes monedas fácilmente.</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label class="text-sm font-medium">Monto</label>
      <input
        type="number"
        bind:value={amount}
        min="0"
        class="w-full border rounded-md px-3 py-2 mt-1"
      />
    </div>

    <div>
      <label class="text-sm font-medium">Resultado</label>
      <input
        type="text"
        value={result ?? ''}
        readonly
        class="w-full border rounded-md px-3 py-2 mt-1 bg-gray-50"
      />
    </div>
  </div>

  <div class="grid grid-cols-3 gap-4 items-end mb-4">
    <div>
      <label class="text-sm font-medium">De</label>
      <select bind:value={from} class="w-full border rounded-md px-3 py-2 mt-1">
        {#each currencyList as [code, currency]}
          <option value={code}>{code} - {currency.name}</option>
        {/each}
      </select>
    </div>

    <div class="flex justify-center pb-1">
      <button
        onclick={swapCurrencies}
        class="mt-6 px-3 py-2 rounded bg-black text-white hover:bg-gray-800"
        title="Intercambiar"
      >
        ↔
      </button>
    </div>

    <div>
      <label class="text-sm font-medium">A</label>
      <select bind:value={to} class="w-full border rounded-md px-3 py-2 mt-1">
        {#each currencyList as [code, currency]}
          <option value={code}>{code} - {currency.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="flex flex-col md:flex-row gap-4">
    <button
      onclick={resetForm}
      class="w-full md:w-auto flex-1 px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
    >
      Resetear
    </button>

    <button
      onclick={handleConvert}
      class="w-full md:w-auto flex-1 px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
      disabled={loading}
    >
      {loading ? 'Convirtiendo...' : 'Convertir'}
    </button>
  </div>

  {#if error}
    <p class="text-red-500 text-sm mt-2">{error}</p>
  {/if}
</div>
