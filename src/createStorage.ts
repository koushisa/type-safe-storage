import { TypeOf, ZodType } from 'zod'
 
 type StorageConfig = {
   [key: string]: {
     key: string
     defaultValue: any
     schema: ZodType<any, any, any>
   }
 }
 
 type StorageAPI<T extends StorageConfig> = {
   [K in keyof T]: {
     get: () => TypeOf<T[K]['schema']> | null
     set: (value: TypeOf<T[K]['schema']> | null) => void
     key: T[K]['key']
   }
 }
 
 export function createStorage<T extends StorageConfig>(
   storage: Storage,
   configs: T
 ): StorageAPI<T> {
   const result: any = {}
 
   Object.entries(configs).forEach(
     ([key, { key: storageKey, defaultValue, schema }]) => {
       result[key] = {
         key: storageKey as T[typeof key]['key'],
         get: () => {
           const storedValue = storage.getItem(storageKey)
           if (storedValue !== null) {
             try {
               return schema.parse(JSON.parse(storedValue))
             } catch (error) {
               console.error(
                 `Invalid value for ${storageKey} in Storage:`,
                 error
               )
               return defaultValue
             }
           } else {
             return defaultValue
           }
         },
         set: (value: any) => {
           if (value === null) {
             storage.removeItem(storageKey)
           } else {
             try {
               storage.setItem(storageKey, JSON.stringify(schema.parse(value)))
             } catch (error) {
               console.error(`Invalid value for ${storageKey}:`, error)
             }
           }
         },
       }
     }
   )
 
   return result
 }