<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import html2canvas from 'html2canvas'
import { useMainStore } from '../../../store/index'
import type { IpageInfo, IprofileInfo } from './types'

const main = useMainStore()
const url = ref<string>('')
const profileInfo = ref<IprofileInfo>({})
const pageInfo = ref<IpageInfo>({})
const weiboText = ref<string>('')
const picUrl = ref<string>('')
const videoPic = ref<string>('')
const fullContent = ref<any>({})

/* 生成图片 */
const handleCratePic = () => {
  const capture = document.querySelector('#capture') as HTMLElement
  const width = capture.offsetWidth
  const height = capture.offsetHeight
  html2canvas(capture, { scale: 2, width, height, useCORS: true }).then((canvas) => {
    document.body.appendChild(canvas)
  })
}

/* 监听粘贴的url变化 */
main.$subscribe(async (mutation, state) => {
  /* 重置图片和视频url的值 */
  picUrl.value = ''
  videoPic.value = ''
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
    if (data.pic_ids.length > 0)
      picUrl.value = fullContent.value.pic_infos[fullContent.value.pic_ids[0]].thumbnail.url

    if (data.page_info && data.page_info.page_pic)
      videoPic.value = data.page_info.page_pic

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
      id="capture" class="w-full h-4/5 drop-shadow-lg rounded-2xl bg-opacity-30 flex justify-center items-center"
      style="background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 100%);"
    >
      <div
        class=" w-3/5 h-fit bg-white m-auto rounded-xl shadow-lg bg-opacity-20 bg-clip-padding p-10 flex flex-col"
        style="backdrop-filter: blur(20px);min-height: 18rem;"
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
          <div v-if="profileInfo.screen_name" id="weibo-log" class=" absolute right-10 top-4">
            <img src="http://182.61.149.102/weibo.svg" alt="">
          </div>
        </div>
        <div id="center" class="flex-1">
          <div class=" text-xl font-bold flex justify-start items-center" v-html="weiboText" />
          <div>
            <img v-if="picUrl !== ''" :src="picUrl" alt="">
            <img v-if="videoPic !== ''" :src="videoPic" alt="">
          </div>
        </div>
        <div id="bottom">
          <span class=" text-gray-500 font-thin">
            {{ fullContent.created_at }}
          </span>
          <div v-if="profileInfo.screen_name" class=" mt-2">
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
    <div class=" w-full h-44">
    </div>
  </main>
</template>

<style scoped>

</style>
