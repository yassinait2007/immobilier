import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd/MM/yyyy", { locale: fr });
};

export const formatDateShort = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd MMM yyyy", { locale: fr });
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("fr-FR").format(value);
};

export const formatRate = (rate: number, maxDecimals: number = 1): string => {
  if (isNaN(rate) || rate === 0) {
    return "0";
  }
  
  const rounded = Math.round(rate * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
  return rounded.toFixed(maxDecimals);
};

export const formatRelativeTime = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { locale: fr, addSuffix: true });
};
