<script setup lang="ts"></script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
  .btn {
    border: 2px solid var(--color-gray-1);
    background-color: transparent;
    font-family: inherit;
    padding: 0.5rem;
    border-radius: var(--radius);

    &:hover {
      background-color: var(--color-gray-1);
    }
  }
</style>
