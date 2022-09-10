import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
  // a function that returns a fresh state
  state: () => ({
    weiboUrl: '',
  }),
  // optional getters
  getters: {
  },
  // optional actions
  actions: {
    setWeiboUrl(url: string) {
      // `this` is the store instance
      this.weiboUrl = url
    },
  },
})
