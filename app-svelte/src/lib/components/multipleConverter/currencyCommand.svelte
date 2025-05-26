<script lang="ts">
  import * as Command from "$lib/components/ui/command/index.js";
  import { currencies } from '$lib/currencies';
  import type { Currency } from '$lib/types';

  const props = $props<{
    availableCurrencies: Currency[];
    onSelect: (currency: Currency) => void;
  }>();
  
    const availableCurrencies = $derived(
        props.availableCurrencies || currencies
    );  
</script>

<Command.Root class="rounded-lg border">
  <Command.Input placeholder="Buscar moneda..." />
  <Command.List>
    <Command.Empty>No se encontraron resultados</Command.Empty>
    <Command.Group heading="Monedas disponibles">
      {#each availableCurrencies as currency (currency.code)}
        <Command.Item
          value={currency.code}
          onclick={() => props.onSelect(currency)}
        >
          <img
            src={currency.flag}
            alt={currency.name}
            title={currency.name}
            class="h-4 w-4 mr-2 rounded-sm"
          />
          <span>{currency.name} ({currency.code})</span>
        </Command.Item>
      {/each}
    </Command.Group>
  </Command.List>
</Command.Root>