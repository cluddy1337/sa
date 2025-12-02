<script setup lang="ts">
import { ref } from 'vue';
import { maskOptions } from './utils/SubnetCalculator';
import SubnetForm from './components/SubnetForm.vue';
import SubnetResult from './components/SubnetResult.vue';

const ip = ref<string>('');
const mask = ref<string>(maskOptions[24] || '255.255.255.0');
const isShowResult = ref<boolean>(false);

function handleSubmit() {
  isShowResult.value = true;
}
</script>

<template>
  <div class="app">
    <SubnetForm
      v-model:ip="ip"
      v-model:mask="mask"
      @submit="handleSubmit"
    />
    <SubnetResult
      :ip="ip"
      :mask="mask"
      :is-show-result="isShowResult"
    />
  </div>
</template>

<style>
.app {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.input,
.select,
.button {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input {
  flex: 1;
  min-width: 150px;
}

.button {
  background: #f70303;
  color: rgb(0, 16, 245);
  cursor: pointer;
  border: none;
}

.button:disabled {
  background: #ccb2b2;
  cursor: not-allowed;
}

.result {
  padding: 1rem;
  background: #edb1b1;
  border: 10px solid #dee2e6;
  border-radius: 50px;
  line-height: 5.5;
}

.scary-text {
  color: #dc3545;
  font-weight: bold;
}
</style>