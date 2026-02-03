<script setup lang="ts">
import SSIconPack from './components/ui/icons/SSIconPack.vue';
import FormPage from './pages/FormPage.vue';

</script>

<template>

  <div class="page-container">
    <SSIconPack />
    <FormPage />
  </div>
</template>

<style scoped>
  .page-container {
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
  }
</style>
