import { type ConversionResult, type ExchangeRateResponse } from '@/lib/types'


const API_EXCHANGE_RATES_URL = 'https://open.er-api.com/v6/latest'

const API_HISTORICAL_RATES_EUROPE_URL = 'https://frankfurter.dev'

export async function fetchExchangeRates(fromCode:string): Promise<ExchangeRateResponse> {
  try {
    const response = await fetch(`${API_EXCHANGE_RATES_URL}/${fromCode}`)

    if (!response.ok) {
      throw new Error('Error al obtener tasas de cambio')
    }

    const data: ExchangeRateResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    throw error
  }
}

export function applyConversion(
  from: string,
  to: string,
  amount: number,
  exchangeRates: Record<string, number>,
): number {
  if (!exchangeRates[from] || !exchangeRates[to]) {
    throw new Error('Invalid currency code')
  }
  return (amount / exchangeRates[from]) * exchangeRates[to]
}

export async function convert(
  fromCode: string,
  to: string [],
  amount: number
): Promise<ConversionResult[]> {
  if (!fromCode || !to) {
    throw new Error('Currency codes must be provided')
  }
  if (amount <= 0 || isNaN(amount)) {
    throw new Error('Amount must be a valid number greater than zero')
  }

  try {
    const data = await fetchExchangeRates(fromCode)
    if (data.result !== 'success') {
      throw new Error('Failed to fetch exchange rates')
    }

    if (to.length === 0) {
      throw new Error('No target currency codes provided')
    }
    const result: ConversionResult[] = []
    to.forEach(code => {
      const convertedAmount = applyConversion(fromCode, code, amount, {
        ...data.rates,
        [data.base_code]: 1,
      })
      result.push({
        currencyCode: code,
        convertedAmount: parseFloat(convertedAmount.toFixed(2)),
        rate: data.rates[code],
      })
    })
    return result
  } catch (error) {
    console.error('Error in convert:', error)
    return []
  }
}


