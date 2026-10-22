import type { Currency } from '../types';
import { currencyRates } from '../data/mockProperties';

export function formatCurrencyPrice(amountTRY: number, currency: Currency): string {
  const config = currencyRates[currency] || currencyRates.TRY;
  const converted = Math.round(amountTRY * config.rateFromTRY);

  const formattedNumber = new Intl.NumberFormat('tr-TR', {
    maximumFractionDigits: 0,
  }).format(converted);

  if (currency === 'TRY') {
    return `₺${formattedNumber}`;
  } else if (currency === 'USD') {
    return `$${formattedNumber}`;
  } else if (currency === 'EUR') {
    return `€${formattedNumber}`;
  }
  return `${formattedNumber} ${currency}`;
}

export function calculateMortgage(
  loanAmount: number,
  monthlyInterestRatePercent: number, // e.g. 2.89% monthly
  months: number
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} {
  if (loanAmount <= 0 || months <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }

  const r = monthlyInterestRatePercent / 100;

  if (r === 0) {
    const monthlyPayment = loanAmount / months;
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(loanAmount),
      totalInterest: 0,
    };
  }

  // Monthly payment formula: M = P * [ r(1+r)^n ] / [ (1+r)^n – 1]
  const numerator = r * Math.pow(1 + r, months);
  const denominator = Math.pow(1 + r, months) - 1;
  const monthlyPayment = loanAmount * (numerator / denominator);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - loanAmount;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
  };
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
