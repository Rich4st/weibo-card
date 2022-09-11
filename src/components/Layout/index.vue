<script setup lang="ts">
import { ref } from 'vue'
import Header from './header/index.vue'
import Main from './main/index.vue'
import Footer from './footer/index.vue'
</script>

<template>
  <div class="flex flex-col h-screen sm:h-screen sm:max-h-screen bg-slate-300 dark:bg-slate-900">
    <div class="header">
      <Header />
    </div>
    <div class="main flex-1">
      <Main />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
</style>
