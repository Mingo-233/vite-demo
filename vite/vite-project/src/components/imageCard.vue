<template>
  <div>
    <img src="@/assets/img/a.jpg" alt="" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const msg = ref(null);
const handle = () => {
  console.log('handle');
};
onMounted(() => {});
</script>

<style lang="less" scoped></style>
