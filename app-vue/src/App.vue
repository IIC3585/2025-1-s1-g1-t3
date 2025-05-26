<script setup lang="ts">

import { ref, computed, onMounted } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import SimpleConverter from '@/components/singleConverter/SimpleConverter.vue'
import MultipleConverterContent from '@/components/multipleConverter/multipleConverterContent.vue'
</script>

<template>
  <div class="flex h-screen items-center  w-full justify-center max-w-screen max-h-screen p-20">
      <Tabs default-value="single-converted" class="w-full m-10 max-h-[600px]">
          <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="single-converted">
            Conversor Simple
          </TabsTrigger>
          <TabsTrigger value="multiple-converted">
            Conversor Múltiple
          </TabsTrigger>
          <TabsTrigger value="graph">
            Gráfico
          </TabsTrigger>
        </TabsList>
        <TabsContent value="single-converted">
          <SimpleConverter />
        </TabsContent>
        <TabsContent value="multiple-converted">
          <MultipleConverterContent />
        </TabsContent>
        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
              <div class="space-y-1">
                <Label for="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div class="space-y-1">
                <Label for="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
  </div>
</template>
