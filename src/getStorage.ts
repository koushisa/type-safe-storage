const mockStorage: Storage = {
   getItem: () => null,
   setItem: () => null,
   removeItem: () => null,
   clear: () => null,
   key: () => null,
   length: 0,
 }
 
 export const getSessionStorage = () => {
   if (typeof window === 'undefined') {
     return mockStorage
   }
 
   return window.sessionStorage
 }
 
 export const getLocalStorage = () => {
   if (typeof window === 'undefined') {
     return mockStorage
   }
 
   return window.localStorage
 }