import { locale } from '../globals'

const numberFormatter = new Intl.NumberFormat(locale)

export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}
