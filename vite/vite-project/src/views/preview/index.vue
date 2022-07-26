<template>
  <h1>preview</h1>
  <!-- <img src="@/assets/img/a.jpg" alt="a" /> -->
  <img src="@a/img/a.jpg" alt="a" />
  <img src="@a/img/loadding.gif" alt="gif" />
  <div>Web Assembly 加载数据： {{ fibNum }}</div>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1">
      <template #tab>
        <span> Tab 1 </span>
      </template>
      Tab 1
    </a-tab-pane>
    <a-tab-pane key="2">
      <template #tab>
        <span> Tab 2 </span>
      </template>
      Tab 2
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// Vite 中已经内置了对于 JSON 文件的解析，底层使用@rollup/pluginutils 的 dataToEsm 方法将 JSON 对象转换为一个包含各种具名导出的 ES 模块
import init from '@a/file/fib.wasm';
import axios from 'axios';
import packageJson from '../../../package.json';

type FibFunc = (num: number) => number;
const fibNum = ref(0);

const activeKey = ref('1');
init({}).then((exports) => {
  //   console.log(exports);
  const fibFunc = exports.fib as FibFunc;
  //   console.log(fibFunc);
  fibNum.value = fibFunc(10);
});
onMounted(() => {
  console.log(packageJson);
  // axios.get('noknow');
});
</script>

<style lang="less" scoped>
.h1 {
  text-decoration: dashed;
  backdrop-filter: blur(8px);
}
</style>
