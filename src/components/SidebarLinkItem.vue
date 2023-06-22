<script setup lang="ts">
  import { computed } from 'vue'
  import { useAppConfig } from 'iles'
  import type { SideBarItem } from '~/composables/config'
  import { joinUrl } from '~/composables/utils'

  const props = defineProps<{
    item: SideBarItem
    header?: boolean
    table?: boolean
  }>()

  const { base } = useAppConfig()

  const link = computed(() => props.item.link && joinUrl(base, props.item.link))

  const active = computed(() => {
    return useRoute().hash === link.value
  })
</script>
<template>
  <a
    v-if="link"
    :href="link"
    :class="[active ? 'font-semibold' : 'font-normal', '']"
    class="mt-2 pg-primary-text pl-1 text-base"
  >
    {{ item.text }}
  </a>
  <span v-else class="pg-primary-text"> {{ item.text }} </span>
</template>
<style scoped></style>
