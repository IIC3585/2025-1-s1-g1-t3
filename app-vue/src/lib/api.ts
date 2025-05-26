import { type ConversionResult, type ExchangeRateResponse } from '@/lib/types'


const API_EXCHANGE_RATES_URL = 'https://open.er-api.com/v6/latest'

const API_EXCHANGE_RATES_EUROPE_URL = 'https://api.frankfurter.dev/v1'

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
  if (!exchangeRates[to]) {
    return 0
  }
  return (amount / exchangeRates[from]) * exchangeRates[to]
}

export async function convert(
  fromCode: string,
  to: string [],
  amount: number
): Promise<ConversionResult[]> {
  try {
      if (!fromCode || !to) {
    throw new Error('Currency codes must be provided')
  }
  if (amount <= 0 || isNaN(amount)) {
    throw new Error('Amount must be a valid number greater than zero')
  }

    const data = await fetchExchangeRates(fromCode)
    if (data.result !== 'success') {
      throw new Error('Failed to fetch exchange rates')
    }
    // console.log('Exchange rates data:', data)

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
    throw new Error(`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}


export async function fetchCurrentRatesEurope(from: string, to:string ): Promise<any> {
  try {
    const response = await fetch(
      `${API_EXCHANGE_RATES_EUROPE_URL}/latest?base=${from}&symbols=${to}`,
    )
    if (!response.ok) {
      throw new Error('Error al obtener las tasas actuales')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching current rates:', error)
    throw error
  }
}

export async function fetchCurrenciesEurope(): Promise<Record<string, string>> {
  try {
    const response = await fetch(`${API_EXCHANGE_RATES_EUROPE_URL}/currencies`)
    if (!response.ok) {
      throw new Error('Error al obtener las monedas de Europa')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching European currencies:', error)
    throw error
  }
}

export async function fetchTimeSeriesData(
  from: string,
  to: string,
  startDate: string,
  endDate: string
): Promise<Record<string, number>> {
  try {
    let URL = `${API_EXCHANGE_RATES_EUROPE_URL}/${startDate}..`
    if (endDate) {
      URL += `${endDate}`
    }
    URL += `?base=${from}&symbols=${to}`
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la serie temporal')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching time series data:', error)
    throw error
  }
}

