export interface AccountTypeType {
  value: number;
  label: 'LDAP' | 'Локальная'
};

export interface DataType {
      id: number,
      tag: {text : string}[],
      type: number,
      login: string,
      password: string | null,
};

export interface RenderedDataType {
      id: number,
      tag: string,
      type: number,
      login: string,
      password: string | null,
};
