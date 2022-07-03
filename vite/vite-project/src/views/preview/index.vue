<template>
  <h1>preview</h1>
  <!-- <img src="@/assets/img/a.jpg" alt="a" /> -->
  <img src="@a/img/a.jpg" alt="a" />
  <img src="@a/img/loadding.gif" alt="gif" />
  <div>Web Assembly 加载数据： {{ fibNum }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// Vite 中已经内置了对于 JSON 文件的解析，底层使用@rollup/pluginutils 的 dataToEsm 方法将 JSON 对象转换为一个包含各种具名导出的 ES 模块
import init from '@a/file/fib.wasm';
import axios from 'axios';
import packageJson from '../../../package.json';

type FibFunc = (num: number) => number;
const fibNum = ref(0);

init({}).then((exports) => {
  //   console.log(exports);
  const fibFunc = exports.fib as FibFunc;
  //   console.log(fibFunc);
  fibNum.value = fibFunc(10);
});
onMounted(() => {
  console.log(packageJson);
  axios.get('noknow');
});
</script>

<style lang="less" scoped></style>
