export function getNetworkAddress(ipStr: string, maskStr: string): string {
  if (!isIpValid(ipStr)) return '';

  const ipOctets = ipStr.split('.');
  const maskOctets = maskStr.split('.');

  if (maskOctets.length !== 4 || maskOctets.some(o => {
    const n = parseInt(o, 10);
   return Number.isNaN(n) || n < 0 || n > 255;
  })) {
    return '';
  }

  const result: number[] = [];
  for (let i = 0; i < 4; i++) {
    const ipPart = parseInt(ipOctets[i] ?? '0', 10);
    const maskPart = parseInt(maskOctets[i] ?? '0', 10);
    const safeIp = Number.isNaN(ipPart) ? 0 : ipPart;
    const safeMask = Number.isNaN(maskPart) ? 0 : maskPart;
    result.push(safeIp & safeMask);
  }

  return result.join('.');
}

export function getAddressesCount(maskStr: string): number {
  const maskOctets = maskStr.split('.');
  if (maskOctets.length !== 4 || maskOctets.some(o => Number.isNaN(parseInt(o, 10)))) return 0;

  let binaryMask = '';
  for (const octet of maskOctets) {
    const n = parseInt(octet, 10);
    binaryMask += (Number.isNaN(n) ? 0 : n).toString(2).padStart(8, '0');
  }
  const ones = binaryMask.split('').filter(ch => ch === '1').length;
  const zeros = 32 - ones;

  if (zeros === 0) return 1;
  if (zeros === 1) return 2;
  return Math.pow(2, zeros) - 2;
}

export function isIpValid(ipStr: string): boolean {
  return (
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ipStr) &&
    ipStr.split('.').every((octet) => {
      const v = parseInt(octet, 10);
      return !Number.isNaN(v) && v >= 0 && v <= 255;
    })
  );
}

export const maskOptions: string[] = [
  "0.0.0.0", "128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0",
  "255.0.0.0", "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0",
  "255.255.0.0", "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
  "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252", "255.255.255.254", "255.255.255.255"
];