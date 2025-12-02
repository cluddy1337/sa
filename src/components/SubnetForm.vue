<template>
  <form @submit.prevent="onSubmit" class="form">
    <input v-model="localIp" type="text" class="input" placeholder="IP-адрес" />
    <select v-model="localMask" class="select">
      <option v-for="maskOption in maskOptions" :key="maskOption" :value="maskOption">
        {{ maskOption }}
      </option>
    </select>
    <button :disabled="!isValid" class="button">Рассчитать</button>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isIpValid, maskOptions } from '../utils/SubnetCalculator';

const props = defineProps<{
  ip: string;
  mask: string;
}>();

const emit = defineEmits<{
  (e: 'update:ip', value: string): void;
  (e: 'update:mask', value: string): void;
  (e: 'submit'): void;
}>();

const localIp = computed({
  get: () => props.ip,
  set: (value) => emit('update:ip', value)
});

const localMask = computed({
  get: () => props.mask,
  set: (value) => emit('update:mask', value)
});

const isValid = computed(() => {
  return isIpValid(props.ip) && maskOptions.includes(props.mask);
});

const onSubmit = () => {
  if (isValid.value) emit('submit');
};
</script>