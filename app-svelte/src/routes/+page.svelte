<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import MultipleConverterContent from '$lib/components/multipleConverter/multipleConverterContent.svelte';
	import SimpleConverter from '$lib/components/singleConvertor/SimpleConverter.svelte';
	import ChartContent from '$lib/components/chart/chartContent.svelte';
</script>

<div class="min-h-screen">
	<div class="mx-auto flex flex-col px-4">
		<div class="py-4 text-center">
			<h1 class="mb-4 text-4xl font-bold text-slate-700 md:text-5xl">Money Exchange</h1>
		</div>
		<div class="flex justify-center">
			<div class="w-full max-w-3xl">
				<Tabs.Root value="single-converted" class="w-full">
					<Tabs.List class="grid w-full grid-cols-3">
						<Tabs.Trigger value="single-converted">Conversor Simple</Tabs.Trigger>
						<Tabs.Trigger value="multiple-converted">Conversor Múltiple</Tabs.Trigger>
						<Tabs.Trigger value="graph">Gráfico</Tabs.Trigger>
					</Tabs.List>

					<Tabs.Content value="single-converted">
						<SimpleConverter />
					</Tabs.Content>

					<Tabs.Content value="multiple-converted">
						<MultipleConverterContent />
					</Tabs.Content>

					<Tabs.Content value="graph">
						<ChartContent />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</div>
</div>
