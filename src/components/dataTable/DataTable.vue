<script setup lang="ts">
import { useDataStore } from '@/stores/data.store';
import type { RenderedDataType } from '@/types/types';
import { NDataTable, NInput, NSelect } from 'naive-ui';
import { h, ref } from 'vue';
import SSIconSprite from '../ui/icons/SSIconSprite.vue';
import { useDataTable } from './useDataTable';
const dataStore = useDataStore();
const dataTable = useDataTable();


const columns = ref([
  {
    title: 'Метка',
    key: 'tag',
    render: (row: RenderedDataType) => {
      return h(NInput, {
        type: 'text',
        value: row.tag,
        maxlength: 50,
        showCount: true,
        status: dataTable.statusInfo(row.tag, 'Метка', 50),
        onUpdateValue: (value: string) => {
          dataTable.updateData(
            row.id,
            'tag',
            value.split(';').map((arrEl) => ({ text: arrEl.trim() })),
          );
        },
        onBlur: () => {
          dataTable.validationInfo(row.tag, 'Метка');
        }
      });
    },
  },
  {
    title: 'Тип записи',
    key: 'type',
    render: (row: RenderedDataType) => {
      return h(NSelect, {
        value: row.type,
        options: dataStore.accountEntries,
        onUpdateValue: (value: number) => {
          dataTable.updateData(row.id, 'type', value);
        },
      });
    },
  },
  {
    title: 'Логин',
    key: 'login',
    render: (row: RenderedDataType) => {
      return h(NInput, {
        type: 'text',
        value: row.login,
        maxlength: 100,
        showCount: true,
        placeholder: 'Ввести данные',
        status: dataTable.statusInfo(row.login, 'Логин', 100),
        onUpdateValue: (value: string) => {
          dataTable.updateData(row.id, 'login', value.trim());
        },
        onBlur: () => {
          dataTable.validationInfo(row.login, 'Логин');
        }
      });
    },
  },
  {
    title: 'Пароль',
    key: 'password',
    render: (row: RenderedDataType) => {
      if (row.type === 1) {
        return;
      }
      return h(NInput, {
        type: 'password',
        showPasswordOn: 'click',
        value: row.password,
        maxlength: 100,
        showCount: true,
        placeholder: 'Ввести данные',
        status: dataTable.statusInfo(row.password, 'Пароль', 100),
        onUpdateValue: (value: string) => {
          dataTable.updateData(row.id, 'password', value.trim());
        },
        onBlur: () => {
          dataTable.validationInfo(row.password, 'Пароль');
        }
      });
    },
  },
  {
    title: 'Удалить строку',
    key: 'id',
    render: (row: RenderedDataType) => {
      return h(SSIconSprite, {
        name: 'delete',
        size: '1rem',
        onClick: () => {
          dataTable.deleteCurrentData(row.id);
        },
      });
    },
  },
]);
</script>

<template>
  <NDataTable :columns="columns" :data="dataStore.renderData" />
</template>
