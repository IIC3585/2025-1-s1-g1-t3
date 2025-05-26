export interface Currency {
	code: string;
	name: string;
	country: string;
	flag: string;
}

export interface ConversionResult {
	currencyCode: string;
	convertedAmount?: number;
	rate?: number;
}

export interface ExchangeRateResponse {
	result: 'success' | 'error';
	provider: string;
	documentation: string;
	terms_of_use: string;
	time_last_update_unix: number;
	time_last_update_utc: string;
	time_next_update_unix: number;
	time_next_update_utc: string;
	time_eol_unix: number;
	base_code: string;
	rates: Record<string, number>;
}
