import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Statistical calculation utilities
export const calculateSensitivity = (tp: number, fn: number): number => {
  if (tp + fn === 0) return 0;
  return tp / (tp + fn);
};

export const calculateSpecificity = (tn: number, fp: number): number => {
  if (tn + fp === 0) return 0;
  return tn / (tn + fp);
};

export const calculatePPV = (tp: number, fp: number): number => {
  if (tp + fp === 0) return 0;
  return tp / (tp + fp);
};

export const calculateNPV = (tn: number, fn: number): number => {
  if (tn + fn === 0) return 0;
  return tn / (tn + fn);
};

export const calculateLikelihoodRatioPositive = (sensitivity: number, specificity: number): number => {
  if (specificity === 1) return Infinity;
  return sensitivity / (1 - specificity);
};

export const calculateLikelihoodRatioNegative = (sensitivity: number, specificity: number): number => {
  if (specificity === 0) return Infinity;
  return (1 - sensitivity) / specificity;
};

export const calculatePrevalence = (tp: number, fp: number, tn: number, fn: number): number => {
  const total = tp + fp + tn + fn;
  if (total === 0) return 0;
  return (tp + fn) / total;
};

export const calculate2x2TableFromParams = (
  prevalence: number,
  sensitivity: number,
  specificity: number,
  population: number = 1000
) => {
  const diseased = Math.round(population * prevalence);
  const healthy = population - diseased;

  const tp = Math.round(diseased * sensitivity);
  const fn = diseased - tp;
  const tn = Math.round(healthy * specificity);
  const fp = healthy - tn;

  return { tp, fp, tn, fn };
};

// Format numbers for display
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  if (value === Infinity) return '∞';
  return value.toFixed(decimals);
};
