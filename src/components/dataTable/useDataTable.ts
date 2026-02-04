import { useDataStore } from '@/stores/data.store';
import { useMessage } from 'naive-ui';

export function useDataTable() {
  const dataStore = useDataStore();
  const message = useMessage();

  /**
   * Удаляет учетную запись из стора по идентификатору
   * @param id - id удаляемой записи
   */
  function deleteCurrentData(id: number) {
    dataStore.data = dataStore.data.filter((item) => item.id != id);
  }

  /**
   * Обновляет данные в сторе по идентификатору
   *
   * @param id - идентификатор обновляемой строки
   * @param key - название обновляемого поля
   * @param value - новое значение поля
   */
  function updateData(id: number, key: string, value: { text: string }[] | string | number) {
    dataStore.data = dataStore.data.map((item) => {
      if (item.id === id) {
        if (key === 'type' && value === 1) {
          return { ...item, [key]: value, password: null };
        }
        return { ...item, [key]: value };
      }
      return item;
    });
  }

  /**
   * Валидирует заполненное поле и информирует пользователя
   * @param value - значение проверяемого поля
   * @param title - отображаемое название поля
   * @param maxlength - максимально допустимая длина значения
   * @returns статус валидации: error, warning или undefined
   */
  function statusInfo(
    value: string | null,
    title: string,
    maxlength: number,
  ): 'error' | 'warning' | undefined {
    if (title !== 'Метка') {
      if (value === null || value === '') {
        
        message.error(`Поле ${title} должно быть заполнено`);
        return 'error';
      }
    } else if (title === 'Метка' && value) {
      value
        .split(';')
        .forEach(
          (el) => el === '' && message.error('Введенный тег имеет нулевую длину') && 'error',
        );
    }
    if (value && value.length === maxlength) {
      message.warning(`Переполнение поля ${title}`);
      return 'warning';
    }

    return undefined;
  }

  return { deleteCurrentData, updateData, statusInfo };
}
