<script setup lang="ts">
defineProps({
  name: {
    type: String,
  },
  size: {
    type: String,
    default: '2rem',
  }
})
</script>

<template>
  <svg class="icon">
    <use :href="`#${name}`" />
  </svg>
</template>

<style scoped>
.icon {
  width: v-bind(size);
  height: v-bind(size);
}
</style>
