import type { AccountTypeType, DataType } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('fakeData', () => {
  const data = ref<DataType[]>([
    {
      id: 1,
      tag: ['xxx', 'yyyy', 'kkkkkkkk', 'MMMMMM'],
      type: 1,
      login: 'so22meLogin',
      password: 'som4ePass',
    },
    {
      id: 2,
      tag: ['xxx', 'yyyy', 'kkkkkkkk', 'MMMMMM'],
      type: 2,
      login: 'so666meLogin',
      password: 'som2ePass',
    },
    {
      id: 3,
      tag: ['xxx', 'yyy3224y', 'kkkkkkkk', 'MMMMMM'],
      type: 1,
      login: 'som111eLogin',
      password: 'som3ePass',
    },
        {
      id: 4,
      tag: ['xxx', 'yy123y', 'kkkkkkkk', 'MMMMMM'],
      type: 2,
      login: 'som5555eLogin',
      password: 'so5mePass',
    },
  ]);

  const accountType = ref<AccountTypeType[]>([
    {
      id: 1, label: 'LDAP',
    },
    {
     id: 2, label: 'Локальная',
    },
  ])

  return { data, accountType }
})
