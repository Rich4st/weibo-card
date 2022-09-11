<script setup lang="ts">
import { ref } from 'vue'
import Popper from 'vue3-popper'
import { useMainStore } from '../../../store/index'

const darkUrl = 'http://182.61.149.102/dark-mode.svg'
const lightUrl = 'http://182.61.149.102/light-mode.svg'
const imgSrc = ref<string>('http://182.61.149.102/dark-mode.svg')
const main = useMainStore()

/* toggleDarkMode */
const toggleDarkMode = () => {
  const html = document.querySelector('html')
  html?.classList.toggle('dark')
  imgSrc.value === darkUrl ? (imgSrc.value = lightUrl) : (imgSrc.value = darkUrl)
}

/* 监听输入框变化 */
const handleLinkInputChange = (payload: any) => {
  main.setWeiboUrl(payload!.target!.value)
}
</script>

<template>
  <header>
    <div class=" py-8 mx-auto max-w-screen-xl sm:py-4 sm:px-6 lg:px-8">
      <div class="flex sm:justify-between sm:items-center sm:flex">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-300 absolute top-1 left-8 sm:static">
            WeCarddy!
          </h1>

          <p class="mt-1.5 text-sm dark:text-gray-500 hidden sm:block ">
            Let's create a new share card! 🎉
          </p>
        </div>

        <div class=" w-3/6 h-full flex-1 sm:pl-6 px-6">
          <input
            type="text"
            class=" h-12 mt-1 px-3 py-2 bg-white border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="粘贴微博链接后按下回车生成照片🤩" @change="handleLinkInputChange"
          >
        </div>

        <div class="flex flex-col mt-4 gap-4 sm:flex-row sm:mt-0 sm:items-center">
          <Popper hover arrow content="复制微博链接粘贴到输入框后按下回车生成照片🤩" placement="bottom">
            <img
              src="../../../assets/icons/question-mark.svg" class=" w-6 h-6 hover:cursor-pointer absolute top-2 right-12 sm:static sm:block"
              alt=""
            >
          </Popper>

          <img :src="imgSrc" class=" hover:cursor-pointer absolute top-1 right-2 sm:static" alt="" @click="toggleDarkMode">
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
