<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
	import MultipleConverterContent from "$lib/components/multipleConverter/multipleConverterContent.svelte";
  import SimpleConverter from "$lib/components/singleConvertor/SimpleConverter.svelte";
</script>

<div class="max-w-screen flex h-screen max-h-screen w-full items-center justify-center p-20">
  <Tabs.Root value="single-converted" class="m-10 max-h-[600px] w-full">
    <Tabs.List class="grid w-full grid-cols-3">
      <Tabs.Trigger value="single-converted">Conversor Simple</Tabs.Trigger>
      <Tabs.Trigger value="multiple-converted">Conversor Múltiple</Tabs.Trigger>
      <Tabs.Trigger value="graph">Gráfico</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="single-converted">
      <Card.Root>
        <Card.Header>
          <Card.Title>Conversor Simple</Card.Title>
          <Card.Description>
            Convierte valores de una unidad a otra.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-2">
          <SimpleConverter />
        </Card.Content>
      </Card.Root>
    </Tabs.Content>

    <Tabs.Content value="multiple-converted">
      <Card.Root>
        <Card.Header>
          <Card.Title>Conversor Múltiple</Card.Title>
          <Card.Description>
            Convierte múltiples valores a la vez.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <MultipleConverterContent />
        </Card.Content>
      </Card.Root>
    </Tabs.Content>

    <Tabs.Content value="graph">
      <Card.Root>
        <Card.Header>
          <Card.Title>Gráfico</Card.Title>
          <Card.Description>
            Visualización gráfica de conversiones.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-2">
          <div class="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p>Aquí iría el gráfico</p>
          </div>
        </Card.Content>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>
</div>