// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-BD')}`
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `AURA-${timestamp}-${random}`
}

export function parseJsonArray(json: string): string[] {
  try {
    return JSON.parse(json)
  } catch {
    return []
  }
}
