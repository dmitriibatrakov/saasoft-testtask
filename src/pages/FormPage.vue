<script setup lang="ts">
import DataTable from '@/components/dataTable/DataTable.vue';
import SSIconSprite from '@/components/ui/icons/SSIconSprite.vue';
import SSButton from '@/components/ui/SSButton.vue';
import { useDataStore } from '@/stores/data.store';
const dataStore = useDataStore();

</script>

<template>
  <div class="header">
      <h1>Учетные записи</h1>
      <SSButton @click="dataStore.addNewRow"><SSIconSprite name="plus" size="1rem"/></SSButton>
  </div>
  <section class="main">
    <div class="main__description">
        <SSIconSprite name="help" size="2rem"/>
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>
    <div class="main__data-table">
      <DataTable />
    </div>
  </section>
</template>

<style lang="css" scoped>
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.main__description {
  background-color: var(--color-gray-1);
  border-radius: var(--radius);
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>

