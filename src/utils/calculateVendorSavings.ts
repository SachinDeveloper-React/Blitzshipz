export function calculateVendorSavings(vendorOptions: Record<string, any>) {
  // get max totalAmount
  const highest = Math.max(
    ...Object.values(vendorOptions).map((v: any) => v.totalAmount),
  );

  // calculate savings per vendor
  return Object.values(vendorOptions).map((vendor: any) => ({
    vendorCode: vendor.vendorCode,
    vendorName: vendor.vendorName,
    totalAmount: vendor.totalAmount,
    savings: Number((highest - vendor.totalAmount).toFixed(2)), // round 2 decimals
  }));
}
