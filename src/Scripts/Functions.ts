import { RemovableRef, StorageSerializers, useLocalStorage } from '@vueuse/core';

export function GetGroup(regex: RegExp, value: string, index?: number): string | undefined {
    return regex.exec(value || "")?.[index || 1];
}

export const UseLS = <T>(id: string, defaultValue: T): RemovableRef<T> => useLocalStorage(id, defaultValue, { serializer: StorageSerializers.object });