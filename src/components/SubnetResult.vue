<template>
  <div v-if="showValidResult" class="result">
    <div>IP адрес: {{ ip }}</div>
    <div>Маска: {{ mask }}</div>
    <div>Адрес сети: {{ networkAddress }}</div>
    <div>Количество адресов: {{ addressesCount }}</div>
  </div>
  <div v-else-if="showInvalidResult" class="scary-text">
    Введите корректные данные
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getNetworkAddress, getAddressesCount, isIpValid, maskOptions } from '../utils/SubnetCalculator';

const props = defineProps<{
  ip: string;
  mask: string;
  isShowResult: boolean;
}>();

const showValidResult = computed(() => {
  return props.isShowResult && isIpValid(props.ip) && maskOptions.includes(props.mask);
});

const showInvalidResult = computed(() => {
  return props.isShowResult && !showValidResult.value;
});

const networkAddress = computed(() => getNetworkAddress(props.ip, props.mask));
const addressesCount = computed(() => getAddressesCount(props.mask));
</script>