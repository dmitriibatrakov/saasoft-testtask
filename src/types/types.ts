export interface AccountTypeType {
  id: number;
  label: 'LDAP' | 'Локальная'
};

export interface DataType {
      id: number,
      tag: string[],
      type: 1 | 2,
      login: string,
      password: string,
};
