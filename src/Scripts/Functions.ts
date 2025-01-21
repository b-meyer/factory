import { RemovableRef, StorageSerializers, useLocalStorage, UseStorageOptions } from '@vueuse/core';

export const GetGroup = (regex: RegExp, value: string, index?: number): string | undefined => regex.exec(value || "")?.[index || 1];
export const UseLS = <T>(id: string, defaultValue: T, options: UseStorageOptions<T> = { serializer: StorageSerializers.object }): RemovableRef<T> => useLocalStorage(id, defaultValue, options);