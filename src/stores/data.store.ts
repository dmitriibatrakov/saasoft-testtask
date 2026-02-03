import type { AccountTypeType, DataType } from '@/types/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useDataStore = defineStore('fakeData', () => {
  const data = ref<DataType[]>([
    {
      id: 1,
      tag: [{ text: 'xxx' }, { text: 'yyyy' }, { text: 'kkkkkkkk' }, { text: 'MMMMMM' }],
      type: 1,
      login: 'so22meLogin',
      password: null,
    },
    {
      id: 2,
      tag: [{ text: 'xxx' }, { text: 'yyyy' }, { text: 'kkkkkkkk' }, { text: 'MMMMMM' }],
      type: 2,
      login: 'so666meLogin',
      password: 'som2ePass',
    },
    {
      id: 3,
      tag: [{ text: 'xxx' }, { text: 'yyy3224y' }, { text: 'kkkkkkkk' }, { text: 'MMMMMM' }],
      type: 1,
      login: 'som111eLogin',
      password: null,
    },
    {
      id: 4,
      tag: [{ text: 'xxx' }, { text: 'yy123y' }, { text: 'kkkkkkkk' }, { text: 'MMMMMM' }],
      type: 2,
      login: 'som5555eLogin',
      password: 'so5mePass',
    },
  ]);

  const renderData = computed(() => {
    return data.value.map((item) => {
      return { ...item, tag: item.tag.map(t => t.text).join('; ')};
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
