<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import html2canvas from 'html2canvas'
import Popper from 'vue3-popper'
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
const cardGradient = ref<string>('background-image: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);') // 卡片背景渐变色
const isCardDark = ref<boolean>(false) // 卡片是否开启暗黑模式
const isCardResponse = ref<boolean>(true) // 是否显示微博response

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
  <main class="px-4 py-8 mx-auto sm:max-h-96 max-w-screen-xl sm:py-0 sm:px-6 lg:px-8 w-full h-full">
    <!-- 卡片界面 -->
    <div
      id="capture"
      class="sm:w-full sm:h-auto p-10 sm:p-10 drop-shadow-lg rounded-2xl bg-opacity-30 flex justify-center items-center"
      :style="cardGradient"
    >
      <div
        :class="!isCardDark ? ' sm:w-3/5 sm:h-fit bg-white m-auto rounded-xl shadow-lg bg-opacity-20 bg-clip-padding p-6 sm:p-10 flex flex-col' : ' sm:w-3/5 sm:h-fit bg-black m-auto rounded-xl shadow-lg bg-opacity-20 bg-clip-padding p-6 sm:p-10 flex flex-col'"
        style="backdrop-filter: blur(20px);min-height: 18rem;"
      >
        <div id="top" class="flex">
          <div id="avatar" class="sm:h-20 h-12">
            <img
              class="rounded-full w-10 h-10 sm:w-fit sm:h-fit" :src="profileInfo.profile_image_url"
              altext-gray-100t=""
            >
          </div>
          <!-- 微博作者名称 light -->
          <div id="user-profile" class="ml-3">
            <p :class="!isCardDark ? 'font-black text-sm sm:text-xl' : 'font-black text-white text-sm sm:text-xl'">
              {{ profileInfo.screen_name }}
            </p>
            <p class=" text-gray-400 text-xs sm:text-base">
              {{ fullContent.region_name }}
            </p>
          </div>
          <div v-if="profileInfo.screen_name" id="weibo-log" class=" absolute right-6 top-4 sm:right-10 sm:top-4">
            <img class=" w-8 h-8 sm:w-16 sm:h-16" src="http://182.61.149.102/weibo.svg" alt="">
          </div>
        </div>
        <div id="center" class="flex-1">
          <div
            :class="!isCardDark ? ' sm:text-xl text-sm font-bold flex justify-start items-center' : ' sm:text-xl text-gray-200 text-sm font-bold flex justify-start items-center'"
            v-html="weiboText"
          />
          <div>
            <img v-if="picUrl !== ''" class=" rounded-xl" :src="picUrl" alt="">
            <img v-if="videoPic !== ''" class=" rounded-xl" :src="videoPic" alt="">
          </div>
        </div>
        <div id="bottom" class=" pt-3">
          <span
            :class="!isCardDark ? 'text-gray-500 font-thin text-sm sm:text-base' : 'text-gray-800 font-thin text-sm sm:text-base' "
          >
            {{ fullContent.created_at }}
          </span>
          <div v-if="profileInfo.screen_name && isCardResponse" class=" mt-2">
            <p
              :class="!isCardDark ? 'text-gray-500 inline-block text-sm sm:text-base' : 'text-gray-500 inline-block text-sm sm:text-base'"
            >
              <span :class="!isCardDark ? 'text-black' : 'text-gray-100'">{{ fullContent.comments_count }}</span>
              replies
            </p>
            <p
              :class="!isCardDark ? 'text-gray-500 inline-block text-sm sm:text-base ml-3' : 'text-gray-500 inline-block text-sm sm:text-base ml-3'"
            >
              <span :class="!isCardDark ? 'text-black' : 'text-gray-100'">{{ fullContent.reposts_count }}</span> shares
            </p>
            <p
              :class="!isCardDark ? 'text-gray-500 inline-block text-sm sm:text-base ml-3' : 'text-gray-500 inline-block text-sm sm:text-base ml-3'"
            >
              <span :class="!isCardDark ? 'text-black' : 'text-gray-100'">{{ fullContent.attitudes_count }}</span> likes
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 工具栏界面 -->
    <div class=" p-5 sm:w-full sm:h-36">
      <div
        class=" flex justify-center items-center m-auto text-center rounded-lg sm:rounded-2xl w-5/6 h-14 sm:w-2/3 sm:h-20 bg-teal-50"
      >
        <ul class=" w-full flex justify-around overflow-hidden">
          <li
            id="color-palette"
            class=" px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-300 hover:bg-opacity-40 overflow-hidden hover:cursor-pointer block "
          >
            <Popper hover arrow placement="top">
              <p class="sm:text-lg flex flex-col">
                <span>🎨</span>
                <span>调色盘</span>
              </p>
              <template #content>
                <div>
                  <!-- 调色按钮 -->
                  <ul class="flex flex-wrap justify-between items-center w-40">
                    <li class=" w-1/5 box-content rounded-sm h-10">
                      <button
                        class=" w-8 h-8 p-1 rounded-md outline-offset-1 focus:outline focus:outline-2 focus:outline-cyan-500"
                        style="background-image: linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%);"
                        @click="cardGradient = 'background-image: linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%);'"
                      />
                    </li>
                    <li class=" w-1/5 box-content rounded-sm h-10">
                      <button
                        class=" w-8 h-8 p-1 rounded-md outline-offset-1 focus:outline focus:outline-2 focus:outline-cyan-500"
                        style="background-image: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);"
                        @click="cardGradient = 'background-image: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);'"
                      />
                    </li>
                    <li class=" w-1/5 box-content rounded-sm h-10">
                      <button
                        class=" w-8 h-8 p-1 rounded-md outline-offset-1 focus:outline focus:outline-2 focus:outline-cyan-500"
                        style="background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);"
                        @click="cardGradient = 'background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);'"
                      />
                    </li>
                    <li class=" w-1/5 box-content border border-transparent rounded-sm h-10">
                      <button
                        class=" w-8 h-8 p-1 rounded-md outline-offset-1 focus:outline focus:outline-2 focus:outline-cyan-500"
                        style="background-image: linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%);"
                        @click="cardGradient = 'background-image: linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%);'"
                      />
                    </li>
                    <li class=" w-1/5 box-content rounded-sm h-10">
                      <button
                        class=" w-8 h-8 p-1 rounded-md outline-offset-1 focus:outline focus:outline-2 focus:outline-cyan-500"
                        style="background-image: linear-gradient(345deg, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%);"
                        @click="cardGradient = 'background-image: linear-gradient(345deg, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%);'"
                      />
                    </li>
                    <li class=" w-1/5 box-content rounded-sm h-10">
                      <button
                        class=" w-8 h-8 p-1 rounded-md outline-offset-1 focus:outline focus:outline-2 focus:outline-cyan-500"
                        style="background-image: linear-gradient(345deg, #d7d2cc 0%, #304352 100%);"
                        @click="cardGradient = 'background-image: linear-gradient(345deg, #d7d2cc 0%, #304352 100%);'"
                      />
                    </li>
                    <li class=" w-1/5 box-content rounded-sm h-10">
                      <button
                        class=" w-8 h-8 p-1 rounded-md outline-offset-1 focus:outline focus:outline-2 focus:outline-cyan-500"
                        style="background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);"
                        @click="cardGradient = 'background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);'"
                      />
                    </li>
                    <li class=" w-1/5 box-content rounded-sm h-10">
                      <button
                        class=" w-8 h-8 p-1 rounded-md outline-offset-1 focus:outline focus:outline-2 focus:outline-cyan-500"
                        style="background-image: linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);"
                        @click="cardGradient = 'background-image: linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);'"
                      />
                    </li>
                  </ul>
                </div>
              </template>
            </Popper>
          </li>
          <li
            class=" px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-300 hover:bg-opacity-40 hover:cursor-pointer "
            @click="isCardDark = !isCardDark"
          >
            <p class="sm:text-xl">
              &#9728;
            </p>
            主题
          </li>
          <li
            class=" px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-300 hover:bg-opacity-40 hover:cursor-pointer "
            @click="isCardResponse = !isCardResponse"
          >
            <p class=" sm:text-xl">
              &#128150;
            </p>
            Response
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
