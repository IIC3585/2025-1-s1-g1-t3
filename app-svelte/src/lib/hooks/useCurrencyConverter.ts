import { convert } from '$lib/api';
import type { ConversionResult, Currency } from '$lib/types';
import { get, writable } from 'svelte/store';
import { currencies } from '$lib/currencies';

export function createCurrencyConverter() {
    const loading = writable(false);
    const error = writable<string | null>(null);
    const amount = writable<number>(0);
    const showError = writable(false);
    const fromCurrency = writable<Currency>({
        country: 'Estados Unidos',
        code: 'USD',
        name: 'Dólar estadounidense',
        flag: 'https://flagcdn.com/us.svg',
    });
    const selectedConversions = writable<ConversionResult[]>([]);

    function setFromCurrency(currency: Currency) {
        fromCurrency.set(currency);
    }

    function addConversion(currency: Currency) {
        selectedConversions.update(current => {
            if (!current.some(c => c.currencyCode === currency.code)) {
                return [...current, {
                    currencyCode: currency.code,
                    rate: 0, // Se actualizará cuando se generen las conversiones
                }];
            }
            return current;
        });
    }

    function removeConversion(index: number) {
        selectedConversions.update(current => {
            current.splice(index, 1);
            return current;
        });
    }

    function resetForm() {
        amount.set(0);
        selectedConversions.set([]);
        fromCurrency.set({
            country: 'Estados Unidos',
            code: 'USD',
            name: 'Dólar estadounidense',
            flag: 'https://flagcdn.com/us.svg',
        });
    }

    async function generateConversions() {
        loading.set(true);
        error.set(null);
        
        try {
            const fromCode = get(fromCurrency).code;
            const toCodes = get(selectedConversions).map(c => c.currencyCode);
            const currentAmount = get(amount);
            
            const res = await convert(fromCode, toCodes, currentAmount);
            selectedConversions.set(res);
        } catch (err) {
            error.set(`${err instanceof Error ? err.message : 'Error while converting currencies'}`);
            showError.set(true);
        } finally {
            loading.set(false);
            setTimeout(() => {
                showError.set(false);
            }, 1500);
        }
    }

    return {
        loading,
        error,
        amount,
        fromCurrency,
        showError,
        selectedConversions,
        currencies,
        setFromCurrency,
        addConversion,
        removeConversion,
        resetForm,
        generateConversions
    };
}

export const currencyConverter = createCurrencyConverter();