<script setup lang="ts">
import { useDataStore } from '@/stores/data.store';
import type { RenderedDataType } from '@/types/types';
import { NDataTable, NInput, NSelect } from 'naive-ui';
import { h, ref } from 'vue';
import SSIconSprite from '../ui/icons/SSIconSprite.vue';
const dataStore = useDataStore();

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
        status: row.tag.length === 50 ? 'warning' : undefined,
        onUpdateValue: (value: string) => {
          updateData(row.id, 'tag', value.split(';').map(arrEl => ({text: arrEl.trim()})))
        }
      })
    }
  },
  {
    title: 'Тип записи',
    key: 'type',
    render: (row: RenderedDataType) => {
      return h(NSelect, {
        value: row.type,
        options: dataStore.accountEntries,
        onUpdateValue: (value: number) => {
          updateData(row.id, 'type', value);
        }
      })
    }
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
        status: row.login.length === 100 ? 'warning' : undefined,
        onUpdateValue: (value: string) => {
          updateData(row.id, 'login', value);
        }
      })
    }
  },
  {
    title: 'Пароль',
    key: 'password',
    render: (row: RenderedDataType) => {
      if (row.type === 1) {
        return
      }
      return h(NInput, {
        type: 'password',
        showPasswordOn: 'click',
        value: row.password,
        maxlength: 100,
        showCount: true,
        status: row.password && row.password.length === 100 ? 'warning' : undefined,
        onUpdateValue: (value: string) => {
          updateData(row.id, 'password', value);
        }
      })
    }
  },
  {
    title: 'Удалить строку',
    key: 'id',
    render: (row: RenderedDataType) => {
      return h(SSIconSprite, {
        name: 'delete',
        size: '1rem',

        onClick: () => {
          deleteCurrentData(row.id);
        }
      })
    }
  }
]);

  function deleteCurrentData(id: number) {
    dataStore.data = dataStore.data.filter((item) => item.id != id);
    console.log('deleted', id);
  }

  function updateData(id: number, key: string, value: {text : string}[] | string | number) {
    dataStore.data = dataStore.data.map(item => {
      if(item.id === id) {
        if (key === 'type' && value === 1) {
          return {...item, [key]: value, password: null}
        }
        return {...item, [key]: value}
      }
      return item;
    });
  }
</script>

<template>
  <NDataTable :columns="columns" :data="dataStore.renderData" />
  {{ dataStore.data }}
</template>
