# type-safe-storage

Type safe [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) wrapper by zod

CodeSandBox:
https://codesandbox.io/p/github/koushisa/type-safe-storage

## usage

```.ts
import { number, object, string } from 'zod'
 
import { createStorage } from './createStorage'
import { getSessionStorage } from './getStorage'

export const appSessionStorage = createStorage(getSessionStorage(), {
  foo: {
    key: 'foo-key', // The key used for storage
    defaultValue: null, // Default value when no value is set
    schema: string().nullable(), // Schema based on which the type is inferred 
  } as const, // By specifying "as const", the literal type is correctly inferred
  hoge: {
    key: 'hoge-key',
    defaultValue: {
      bar: 10
    },
    schema: object({
      bar:number()
    }),
  } as const,
})

appSessionStorage.foo.get() // string | null
appSessionStorage.foo.set("foo-bar")
appSessionStorage.foo.key // 'foo-key'

appSessionStorage.hoge.get()
appSessionStorage.hoge.set({bar:15})
appSessionStorage.hoge.key

console.log(appSessionStorage.foo.key)
```
