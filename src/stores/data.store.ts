import type { AccountTypeType, DataType } from '@/types/types';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { fakeData } from './data.const';

export const useDataStore = defineStore('fakeData', () => {
  const data = ref<DataType[]>(JSON.parse(sessionStorage.getItem('SSFakeData') ?? JSON.stringify(fakeData)));

  watch(data, (newData) => {
    sessionStorage.setItem('SSFakeData', JSON.stringify(newData))
  }, { immediate: true, deep: true })

  const renderData = computed(() => {
    return data.value.map((item) => {
      return { ...item, tag: item.tag.map(t => t.text).join(';')};
    });
  });

  function addNewRow() {
    const newId: number = 1 + Math.max(...data.value.map((row) => row.id));

    data.value.push({
      id: newId,
      tag: [],
      type: 1,
      login: '',
      password: '',
    });
  }

  const accountEntries = ref<AccountTypeType[]>([
    {
      value: 1,
      label: 'LDAP',
    },
    {
      value: 2,
      label: 'Локальная',
    },
  ]);

  return { data, renderData, accountEntries, addNewRow };
});
