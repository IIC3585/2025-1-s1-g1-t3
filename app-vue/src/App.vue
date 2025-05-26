<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import SimpleConverter from '@/components/singleConverter/SimpleConverter.vue'
import MultipleConverterContent from '@/components/multipleConverter/multipleConverterContent.vue'
import ChartContent from '@/components/chart/chartContent.vue'
</script>

<template>
  <div class="min-h-screen">
    <div class="flex flex-col mx-auto px-4">
      <div class="text-center py-4">
        <h1
          class="text-4xl md:text-5xl font-bold mb-4 text-slate-700"
        >
          Money Exchange
        </h1>
      </div>
      <div class="flex justify-center">
        <div class="w-full max-w-3xl">
          <Tabs default-value="single-converted" class="w-full">
            <TabsList class="grid w-full grid-cols-3">
              <TabsTrigger value="single-converted"> Conversor Simple </TabsTrigger>
              <TabsTrigger value="multiple-converted"> Conversor Múltiple </TabsTrigger>
              <TabsTrigger value="graph"> Gráfico </TabsTrigger>
            </TabsList>
            <TabsContent value="single-converted">
              <SimpleConverter />
            </TabsContent>
            <TabsContent value="multiple-converted">
              <MultipleConverterContent />
            </TabsContent>
            <TabsContent value="graph">
              <ChartContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>
