<template>
  <h2 :class="style.border">{{ msg }}</h2>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import style from "./test.module.less";

const msg = ref("");
const handle = () => {
  console.log("handle");
};
console.log(msg);

msg.value = "nihao";
</script>

<style lang="less" scoped>
// @themeColor: #8de;
h2 {
  //   color: rebeccapurple;
  color: @themeColor;
}
</style>
