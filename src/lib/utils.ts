export function formatCurrency(amount: number): string {
  return `RM ${amount.toFixed(2)}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
