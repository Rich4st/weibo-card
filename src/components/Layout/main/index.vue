<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useMainStore } from '../../../store/index'
import type { IpageInfo, IprofileInfo } from './types'

const main = useMainStore()
const url = ref<string>('')
const profileInfo = ref<IprofileInfo>({})
const pageInfo = ref<IpageInfo>({})
const weiboText = ref<string>('')
const fullContent = ref<any>({})

/* 监听粘贴的url变化 */
main.$subscribe(async (mutation, state) => {
  url.value = state.weiboUrl
  const params = {
    id: url.value.split('/')[4],
    url: url.value,
  }
  let { data } = await axios.get('http://182.61.149.102:3000/api/list', { params })
  if (data.code === 200) {
    data = data.data.list
    fullContent.value = data
    data.page_info ? weiboText.value = data.text_raw : weiboText.value = data.text
    const { user } = data
    const { page_info } = data
    profileInfo.value = user
    pageInfo.value = page_info
    console.log('data', fullContent.value)
  }
})
</script>

<template>
  <main class="px-4 py-8 mx-auto max-w-screen-xl sm:py-12 sm:px-6 lg:px-8 w-full h-full">
    <div
      class="w-full h-4/5 drop-shadow-lg bg-gradient-to-br from-rose-100 to-blue-300 rounded-2xl flex justify-center items-center"
    >
      <div
        class=" w-3/5 h-80 bg-white m-auto rounded-xl shadow-lg bg-opacity-30 bg-clip-padding p-10 flex flex-col"
        style="backdrop-filter: blur(20px);"
      >
        <div id="top" class="flex">
          <div id="avatar" class="h-20">
            <img class="rounded-full" :src="profileInfo.profile_image_url" alt="">
          </div>
          <div id="user-profile" class="ml-3">
            <p class="font-black text-xl">
              {{ profileInfo.screen_name }}
            </p>
            <p class=" text-gray-400 text-ml">
              {{ fullContent.region_name }}
            </p>
          </div>
          <div id="weibo-log" class=" absolute right-10">
            <img src="http://182.61.149.102/weibo.svg" alt="">
          </div>
        </div>
        <div id="center" class="flex-1">
          <span class=" text-xl font-bold flex" v-html="weiboText" />
        </div>
        <div id="bottom">
          <span class=" text-gray-500 font-thin">
            {{ fullContent.created_at }}
          </span>
          <div class=" mt-2">
            <p class="text-gray-500 inline-block">
              <span class=" text-black">{{ fullContent.comments_count }}</span> replies
            </p>
            <p class="text-gray-500 inline-block pl-3">
              <span class=" text-black">{{ fullContent.reposts_count }}</span> shares
            </p>
            <p class="text-gray-500 inline-block pl-3">
              <span class=" text-black">{{ fullContent.attitudes_count }}</span> likes
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class=" w-full h-44" />
  </main>
</template>

<style scoped>

</style>
