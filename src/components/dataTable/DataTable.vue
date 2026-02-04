<script setup lang="ts">
import { useDataStore } from '@/stores/data.store';
import type { RenderedDataType } from '@/types/types';
import { NDataTable, NInput, NSelect, useMessage } from 'naive-ui';
import { h, ref } from 'vue';
import SSIconSprite from '../ui/icons/SSIconSprite.vue';
const dataStore = useDataStore();

const message = useMessage();

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
        status: statusInfo(row.tag, 'Метка', 50),
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
        placeholder: "Ввести данные",
        status: statusInfo(row.login, 'Логин', 100),
        onUpdateValue: (value: string) => {
          updateData(row.id, 'login', value);
        },
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
        placeholder: "Ввести данные",
        status: statusInfo(row.password, 'Пароль', 100),
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


  function statusInfo(value: null | string, title: string, maxlength: number) {
    if (title !== 'Метка') {
      if (value === null || value === '') {
        message.error(`Поле ${title} должно быть заполнено`)
        return 'error'
      }
    } else if (title === 'Метка' && value) {
      value.split(';').forEach(el => el==='' && message.error('Введенный тег имеет нулевую длину') && 'error')
    }
    if (value && value.length === maxlength) {
      message.warning(`Переполнение поля ${title}`)
      return 'warning'
    }
  }
</script>

<template>
    <NDataTable :columns="columns" :data="dataStore.renderData" />
    {{ dataStore.data }}
</template>
