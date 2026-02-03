<script setup lang="ts">
import { useDataStore } from '@/stores/data.store';

const dataStore = useDataStore();
</script>

<template>
  {{ dataStore.data }}
</template>
