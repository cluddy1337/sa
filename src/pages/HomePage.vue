<script setup lang="ts">
import { ref, computed } from 'vue';

const ip = ref('');
const mask = ref('');
const maskOptions = [
  '0.0.0.0', // /0
  '128.0.0.0', // /1
  '192.0.0.0', // /2
  '224.0.0.0', // /3
  '240.0.0.0', // /4
  '248.0.0.0', // /5
  '252.0.0.0', // /6
  '254.0.0.0', // /7
  '255.0.0.0', // /8
  '255.128.0.0', // /9
  '255.192.0.0', // /10
  '255.224.0.0', // /11
  '255.240.0.0', // /12
  '255.248.0.0', // /13
  '255.252.0.0', // /14
  '255.254.0.0', // /15
  '255.255.0.0', // /16
  '255.255.128.0', // /17
  '255.255.192.0', // /18
  '255.255.224.0', // /19
  '255.255.240.0', // /20
  '255.255.248.0', // /21
  '255.255.252.0', // /22
  '255.255.254.0', // /23
  '255.255.255.0', // /24
  '255.255.255.128', // /25
  '255.255.255.192', // /26
  '255.255.255.224', // /27
  '255.255.255.240', // /28
  '255.255.255.248', // /29
  '255.255.255.252', // /30
  '255.255.255.254', // /31
  '255.255.255.255', // /32
];
const isShowResult = ref(false);
function getResult() {
  isShowResult.value = true;
}

const address = computed(() => {
  return getNetworkAdress(ip.value, mask.value);
});

const count = computed(() => {
  return getAddressesCount(mask.value);
});
function getNetworkAdress(ip: string, mask: string): string {
  const ipOctets = ip.split('.');
  const maskOctets = mask.split('.');
  const result = [];

  for (let i = 0; i < 4; i++) {
    result.push(Number(ipOctets[i]) & Number(maskOctets[i]));
  }

  return `${result[0]}.${result[1]}.${result[2]}.${result[3]}`;
}
function getAddressesCount(mask: string): number {
  let binaryMask = '';

  for (const octet of mask.split('.')) {
    binaryMask += Number(octet).toString(2).padStart(8, '0');
  }
  const zeros = 32 - binaryMask.replaceAll('0', '').length;

  if (zeros === 0) return 1;
  if (zeros === 1) return 2;

  return Math.pow(2, zeros) - 2;
}
function isIpValid(ip: string): boolean {
  return (
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip) && ip.split('.').every((octet) => Number(octet) <= 255)
  );
}
const isIpAndMaskValid = computed(() => {
  return isIpValid(ip.value) && mask.value;
});
</script>
<template>
  <form @submit.prevent="getResult" class="form">
    <input v-model="ip" type="text" class="input" />
    <select v-model="mask" class="select">
      <option v-for="maskOption in maskOptions" :key="maskOption" :value="maskOption">
        {{ maskOption }}
      </option>
    </select>
    <button :disabled="!isIpAndMaskValid">Рассчитать</button>
  </form>

  <div class="result" v-if="isShowResult && isIpAndMaskValid">
    <div>Ip адрес: {{ ip }}</div>
    <div>Маска: {{ mask }}</div>
    <div>Адрес сети: {{ address }}</div>
    <div>Количество адресов: {{ count }}</div>
  </div>
  <div class="scary-text" v-if="isShowResult && !isIpAndMaskValid">Введите корректные данные</div>
</template>
