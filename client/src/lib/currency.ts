export const RUPEE = "₹";

export const formatINR = (amount: number | undefined | null) => {
  const value = Number(amount || 0);
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  } catch {
    return `${RUPEE}${value.toLocaleString('en-IN')}`;
  }
};
