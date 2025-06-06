import type { Currency } from './types';

const flagsApiUrl = 'https://flagcdn.com';

export const currencies: Record<string, Currency> = {
	AED: {
		code: 'AED',
		name: 'UAE Dirham',
		country: 'United Arab Emirates',
		flag: `${flagsApiUrl}/ae.svg`
	},
	AFN: {
		code: 'AFN',
		name: 'Afghan Afghani',
		country: 'Afghanistan',
		flag: `${flagsApiUrl}/af.svg`
	},
	ALL: {
		code: 'ALL',
		name: 'Albanian Lek',
		country: 'Albania',
		flag: `${flagsApiUrl}/al.svg`
	},
	AMD: {
		code: 'AMD',
		name: 'Armenian Dram',
		country: 'Armenia',
		flag: `${flagsApiUrl}/am.svg`
	},
	ANG: {
		code: 'ANG',
		name: 'Netherlands Antillian Guilder',
		country: 'Netherlands Antilles',
		flag: `${flagsApiUrl}/bq.svg`
	},
	AOA: {
		code: 'AOA',
		name: 'Angolan Kwanza',
		country: 'Angola',
		flag: `${flagsApiUrl}/ao.svg`
	},
	ARS: {
		code: 'ARS',
		name: 'Argentine Peso',
		country: 'Argentina',
		flag: `${flagsApiUrl}/ar.svg`
	},
	AUD: {
		code: 'AUD',
		name: 'Australian Dollar',
		country: 'Australia',
		flag: `${flagsApiUrl}/au.svg`
	},
	AWG: { code: 'AWG', name: 'Aruban Florin', country: 'Aruba', flag: `${flagsApiUrl}/aw.svg` },
	AZN: {
		code: 'AZN',
		name: 'Azerbaijani Manat',
		country: 'Azerbaijan',
		flag: `${flagsApiUrl}/az.svg`
	},
	BAM: {
		code: 'BAM',
		name: 'Bosnia and Herzegovina Mark',
		country: 'Bosnia and Herzegovina',
		flag: `${flagsApiUrl}/ba.svg`
	},
	BBD: {
		code: 'BBD',
		name: 'Barbados Dollar',
		country: 'Barbados',
		flag: `${flagsApiUrl}/bb.svg`
	},
	BDT: {
		code: 'BDT',
		name: 'Bangladeshi Taka',
		country: 'Bangladesh',
		flag: `${flagsApiUrl}/bd.svg`
	},
	BGN: {
		code: 'BGN',
		name: 'Bulgarian Lev',
		country: 'Bulgaria',
		flag: `${flagsApiUrl}/bg.svg`
	},
	BHD: {
		code: 'BHD',
		name: 'Bahraini Dinar',
		country: 'Bahrain',
		flag: `${flagsApiUrl}/bh.svg`
	},
	BIF: {
		code: 'BIF',
		name: 'Burundian Franc',
		country: 'Burundi',
		flag: `${flagsApiUrl}/bi.svg`
	},
	BMD: {
		code: 'BMD',
		name: 'Bermudian Dollar',
		country: 'Bermuda',
		flag: `${flagsApiUrl}/bm.svg`
	},
	BND: {
		code: 'BND',
		name: 'Brunei Dollar',
		country: 'Brunei',
		flag: `${flagsApiUrl}/bn.svg`
	},
	BOB: {
		code: 'BOB',
		name: 'Bolivian Boliviano',
		country: 'Bolivia',
		flag: `${flagsApiUrl}/bo.svg`
	},
	BRL: {
		code: 'BRL',
		name: 'Brazilian Real',
		country: 'Brazil',
		flag: `${flagsApiUrl}/br.svg`
	},
	BSD: {
		code: 'BSD',
		name: 'Bahamian Dollar',
		country: 'Bahamas',
		flag: `${flagsApiUrl}/bs.svg`
	},
	BTN: {
		code: 'BTN',
		name: 'Bhutanese Ngultrum',
		country: 'Bhutan',
		flag: `${flagsApiUrl}/bt.svg`
	},
	BWP: {
		code: 'BWP',
		name: 'Botswana Pula',
		country: 'Botswana',
		flag: `${flagsApiUrl}/bw.svg`
	},
	BYN: {
		code: 'BYN',
		name: 'Belarusian Ruble',
		country: 'Belarus',
		flag: `${flagsApiUrl}/by.svg`
	},
	BZD: {
		code: 'BZD',
		name: 'Belize Dollar',
		country: 'Belize',
		flag: `${flagsApiUrl}/bz.svg`
	},
	CAD: {
		code: 'CAD',
		name: 'Canadian Dollar',
		country: 'Canada',
		flag: `${flagsApiUrl}/ca.svg`
	},
	CDF: {
		code: 'CDF',
		name: 'Congolese Franc',
		country: 'Democratic Republic of the Congo',
		flag: `${flagsApiUrl}/cd.svg`
	},
	CHF: {
		code: 'CHF',
		name: 'Swiss Franc',
		country: 'Switzerland',
		flag: `${flagsApiUrl}/ch.svg`
	},
	CLP: { code: 'CLP', name: 'Chilean Peso', country: 'Chile', flag: `${flagsApiUrl}/cl.svg` },
	CNY: {
		code: 'CNY',
		name: 'Chinese Renminbi',
		country: 'China',
		flag: `${flagsApiUrl}/cn.svg`
	},
	COP: {
		code: 'COP',
		name: 'Colombian Peso',
		country: 'Colombia',
		flag: `${flagsApiUrl}/co.svg`
	},
	CRC: {
		code: 'CRC',
		name: 'Costa Rican Colon',
		country: 'Costa Rica',
		flag: `${flagsApiUrl}/cr.svg`
	},
	CUP: { code: 'CUP', name: 'Cuban Peso', country: 'Cuba', flag: `${flagsApiUrl}/cu.svg` },
	CVE: {
		code: 'CVE',
		name: 'Cape Verdean Escudo',
		country: 'Cape Verde',
		flag: `${flagsApiUrl}/cv.svg`
	},
	CZK: {
		code: 'CZK',
		name: 'Czech Koruna',
		country: 'Czech Republic',
		flag: `${flagsApiUrl}/cz.svg`
	},
	DJF: {
		code: 'DJF',
		name: 'Djiboutian Franc',
		country: 'Djibouti',
		flag: `${flagsApiUrl}/dj.svg`
	},
	DKK: {
		code: 'DKK',
		name: 'Danish Krone',
		country: 'Denmark',
		flag: `${flagsApiUrl}/dk.svg`
	},
	DOP: {
		code: 'DOP',
		name: 'Dominican Peso',
		country: 'Dominican Republic',
		flag: `${flagsApiUrl}/do.svg`
	},
	DZD: {
		code: 'DZD',
		name: 'Algerian Dinar',
		country: 'Algeria',
		flag: `${flagsApiUrl}/dz.svg`
	},
	EGP: {
		code: 'EGP',
		name: 'Egyptian Pound',
		country: 'Egypt',
		flag: `${flagsApiUrl}/eg.svg`
	},
	ERN: {
		code: 'ERN',
		name: 'Eritrean Nakfa',
		country: 'Eritrea',
		flag: `${flagsApiUrl}/er.svg`
	},
	ETB: {
		code: 'ETB',
		name: 'Ethiopian Birr',
		country: 'Ethiopia',
		flag: `${flagsApiUrl}/et.svg`
	},
	EUR: { code: 'EUR', name: 'Euro', country: 'European Union', flag: `${flagsApiUrl}/eu.svg` },
	FJD: { code: 'FJD', name: 'Fiji Dollar', country: 'Fiji', flag: `${flagsApiUrl}/fj.svg` },
	FKP: {
		code: 'FKP',
		name: 'Falkland Islands Pound',
		country: 'Falkland Islands',
		flag: `${flagsApiUrl}/fk.svg`
	},
	FOK: {
		code: 'FOK',
		name: 'Faroese Króna',
		country: 'Faroe Islands',
		flag: `${flagsApiUrl}/fo.svg`
	},
	GBP: {
		code: 'GBP',
		name: 'Pound Sterling',
		country: 'United Kingdom',
		flag: `${flagsApiUrl}/gb.svg`
	},
	GEL: {
		code: 'GEL',
		name: 'Georgian Lari',
		country: 'Georgia',
		flag: `${flagsApiUrl}/ge.svg`
	},
	GGP: {
		code: 'GGP',
		name: 'Guernsey Pound',
		country: 'Guernsey',
		flag: `${flagsApiUrl}/gg.svg`
	},
	GHS: { code: 'GHS', name: 'Ghanaian Cedi', country: 'Ghana', flag: `${flagsApiUrl}/gh.svg` },
	GIP: {
		code: 'GIP',
		name: 'Gibraltar Pound',
		country: 'Gibraltar',
		flag: `${flagsApiUrl}/gi.svg`
	},
	GMD: {
		code: 'GMD',
		name: 'Gambian Dalasi',
		country: 'The Gambia',
		flag: `${flagsApiUrl}/gm.svg`
	},
	GNF: {
		code: 'GNF',
		name: 'Guinean Franc',
		country: 'Guinea',
		flag: `${flagsApiUrl}/gn.svg`
	},
	GTQ: {
		code: 'GTQ',
		name: 'Guatemalan Quetzal',
		country: 'Guatemala',
		flag: `${flagsApiUrl}/gt.svg`
	},
	GYD: {
		code: 'GYD',
		name: 'Guyanese Dollar',
		country: 'Guyana',
		flag: `${flagsApiUrl}/gy.svg`
	},
	HKD: {
		code: 'HKD',
		name: 'Hong Kong Dollar',
		country: 'Hong Kong',
		flag: `${flagsApiUrl}/hk.svg`
	},
	HNL: {
		code: 'HNL',
		name: 'Honduran Lempira',
		country: 'Honduras',
		flag: `${flagsApiUrl}/hn.svg`
	},
	HRK: {
		code: 'HRK',
		name: 'Croatian Kuna',
		country: 'Croatia',
		flag: `${flagsApiUrl}/hr.svg`
	},
	HTG: {
		code: 'HTG',
		name: 'Haitian Gourde',
		country: 'Haiti',
		flag: `${flagsApiUrl}/ht.svg`
	},
	HUF: {
		code: 'HUF',
		name: 'Hungarian Forint',
		country: 'Hungary',
		flag: `${flagsApiUrl}/hu.svg`
	},
	IDR: {
		code: 'IDR',
		name: 'Indonesian Rupiah',
		country: 'Indonesia',
		flag: `${flagsApiUrl}/id.svg`
	},
	ILS: {
		code: 'ILS',
		name: 'Israeli New Shekel',
		country: 'Israel',
		flag: `${flagsApiUrl}/il.svg`
	},
	IMP: {
		code: 'IMP',
		name: 'Manx Pound',
		country: 'Isle of Man',
		flag: `${flagsApiUrl}/im.svg`
	},
	INR: { code: 'INR', name: 'Indian Rupee', country: 'India', flag: `${flagsApiUrl}/in.svg` },
	IQD: { code: 'IQD', name: 'Iraqi Dinar', country: 'Iraq', flag: `${flagsApiUrl}/iq.svg` },
	IRR: { code: 'IRR', name: 'Iranian Rial', country: 'Iran', flag: `${flagsApiUrl}/ir.svg` },
	ISK: {
		code: 'ISK',
		name: 'Icelandic Króna',
		country: 'Iceland',
		flag: `${flagsApiUrl}/is.svg`
	},
	JEP: { code: 'JEP', name: 'Jersey Pound', country: 'Jersey', flag: `${flagsApiUrl}/je.svg` },
	JMD: {
		code: 'JMD',
		name: 'Jamaican Dollar',
		country: 'Jamaica',
		flag: `${flagsApiUrl}/jm.svg`
	},
	JOD: {
		code: 'JOD',
		name: 'Jordanian Dinar',
		country: 'Jordan',
		flag: `${flagsApiUrl}/jo.svg`
	},
	JPY: { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: `${flagsApiUrl}/jp.svg` },
	KES: {
		code: 'KES',
		name: 'Kenyan Shilling',
		country: 'Kenya',
		flag: `${flagsApiUrl}/ke.svg`
	},
	KGS: {
		code: 'KGS',
		name: 'Kyrgyzstani Som',
		country: 'Kyrgyzstan',
		flag: `${flagsApiUrl}/kg.svg`
	},
	KHR: {
		code: 'KHR',
		name: 'Cambodian Riel',
		country: 'Cambodia',
		flag: `${flagsApiUrl}/kh.svg`
	},
	KID: {
		code: 'KID',
		name: 'Kiribati Dollar',
		country: 'Kiribati',
		flag: `${flagsApiUrl}/ki.svg`
	},
	KMF: {
		code: 'KMF',
		name: 'Comorian Franc',
		country: 'Comoros',
		flag: `${flagsApiUrl}/km.svg`
	},
	KRW: {
		code: 'KRW',
		name: 'South Korean Won',
		country: 'South Korea',
		flag: `${flagsApiUrl}/kr.svg`
	},
	KWD: {
		code: 'KWD',
		name: 'Kuwaiti Dinar',
		country: 'Kuwait',
		flag: `${flagsApiUrl}/kw.svg`
	},
	KYD: {
		code: 'KYD',
		name: 'Cayman Islands Dollar',
		country: 'Cayman Islands',
		flag: `${flagsApiUrl}/ky.svg`
	},
	KZT: {
		code: 'KZT',
		name: 'Kazakhstani Tenge',
		country: 'Kazakhstan',
		flag: `${flagsApiUrl}/kz.svg`
	},
	LAK: { code: 'LAK', name: 'Lao Kip', country: 'Laos', flag: `${flagsApiUrl}/la.svg` },
	LBP: {
		code: 'LBP',
		name: 'Lebanese Pound',
		country: 'Lebanon',
		flag: `${flagsApiUrl}/lb.svg`
	},
	LKR: {
		code: 'LKR',
		name: 'Sri Lanka Rupee',
		country: 'Sri Lanka',
		flag: `${flagsApiUrl}/lk.svg`
	},
	LRD: {
		code: 'LRD',
		name: 'Liberian Dollar',
		country: 'Liberia',
		flag: `${flagsApiUrl}/lr.svg`
	},
	LSL: {
		code: 'LSL',
		name: 'Lesotho Loti',
		country: 'Lesotho',
		flag: `${flagsApiUrl}/ls.svg`
	},
	LYD: { code: 'LYD', name: 'Libyan Dinar', country: 'Libya', flag: `${flagsApiUrl}/ly.svg` },
	MAD: {
		code: 'MAD',
		name: 'Moroccan Dirham',
		country: 'Morocco',
		flag: `${flagsApiUrl}/ma.svg`
	},
	MDL: {
		code: 'MDL',
		name: 'Moldovan Leu',
		country: 'Moldova',
		flag: `${flagsApiUrl}/md.svg`
	},
	MGA: {
		code: 'MGA',
		name: 'Malagasy Ariary',
		country: 'Madagascar',
		flag: `${flagsApiUrl}/mg.svg`
	},
	MKD: {
		code: 'MKD',
		name: 'Macedonian Denar',
		country: 'North Macedonia',
		flag: `${flagsApiUrl}/mk.svg`
	},
	MMK: {
		code: 'MMK',
		name: 'Burmese Kyat',
		country: 'Myanmar',
		flag: `${flagsApiUrl}/mm.svg`
	},
	MNT: {
		code: 'MNT',
		name: 'Mongolian Tögrög',
		country: 'Mongolia',
		flag: `${flagsApiUrl}/mn.svg`
	},
	MOP: {
		code: 'MOP',
		name: 'Macanese Pataca',
		country: 'Macau',
		flag: `${flagsApiUrl}/mo.svg`
	},
	MRU: {
		code: 'MRU',
		name: 'Mauritanian Ouguiya',
		country: 'Mauritania',
		flag: `${flagsApiUrl}/mr.svg`
	},
	MUR: {
		code: 'MUR',
		name: 'Mauritian Rupee',
		country: 'Mauritius',
		flag: `${flagsApiUrl}/mu.svg`
	},
	MVR: {
		code: 'MVR',
		name: 'Maldivian Rufiyaa',
		country: 'Maldives',
		flag: `${flagsApiUrl}/mv.svg`
	},
	MWK: {
		code: 'MWK',
		name: 'Malawian Kwacha',
		country: 'Malawi',
		flag: `${flagsApiUrl}/mw.svg`
	},
	MXN: { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', flag: `${flagsApiUrl}/mx.svg` },
	MYR: {
		code: 'MYR',
		name: 'Malaysian Ringgit',
		country: 'Malaysia',
		flag: `${flagsApiUrl}/my.svg`
	},
	MZN: {
		code: 'MZN',
		name: 'Mozambican Metical',
		country: 'Mozambique',
		flag: `${flagsApiUrl}/mz.svg`
	},
	NAD: {
		code: 'NAD',
		name: 'Namibian Dollar',
		country: 'Namibia',
		flag: `${flagsApiUrl}/na.svg`
	},
	NGN: {
		code: 'NGN',
		name: 'Nigerian Naira',
		country: 'Nigeria',
		flag: `${flagsApiUrl}/ng.svg`
	},
	NIO: {
		code: 'NIO',
		name: 'Nicaraguan Córdoba',
		country: 'Nicaragua',
		flag: `${flagsApiUrl}/ni.svg`
	},
	NOK: {
		code: 'NOK',
		name: 'Norwegian Krone',
		country: 'Norway',
		flag: `${flagsApiUrl}/no.svg`
	},
	NPR: {
		code: 'NPR',
		name: 'Nepalese Rupee',
		country: 'Nepal',
		flag: `${flagsApiUrl}/np.svg`
	},
	NZD: {
		code: 'NZD',
		name: 'New Zealand Dollar',
		country: 'New Zealand',
		flag: `${flagsApiUrl}/nz.svg`
	},
	OMR: { code: 'OMR', name: 'Omani Rial', country: 'Oman', flag: `${flagsApiUrl}/om.svg` },
	PAB: {
		code: 'PAB',
		name: 'Panamanian Balboa',
		country: 'Panama',
		flag: `${flagsApiUrl}/pa.svg`
	},
	PEN: { code: 'PEN', name: 'Peruvian Sol', country: 'Peru', flag: `${flagsApiUrl}/pe.svg` },
	PGK: {
		code: 'PGK',
		name: 'Papua New Guinean Kina',
		country: 'Papua New Guinea',
		flag: `${flagsApiUrl}/pg.svg`
	},
	PHP: {
		code: 'PHP',
		name: 'Philippine Peso',
		country: 'Philippines',
		flag: `${flagsApiUrl}/ph.svg`
	},
	PKR: {
		code: 'PKR',
		name: 'Pakistani Rupee',
		country: 'Pakistan',
		flag: `${flagsApiUrl}/pk.svg`
	},
	PLN: { code: 'PLN', name: 'Polish Złoty', country: 'Poland', flag: `${flagsApiUrl}/pl.svg` },
	PYG: {
		code: 'PYG',
		name: 'Paraguayan Guaraní',
		country: 'Paraguay',
		flag: `${flagsApiUrl}/py.svg`
	},
	QAR: { code: 'QAR', name: 'Qatari Riyal', country: 'Qatar', flag: `${flagsApiUrl}/qa.svg` },
	RON: {
		code: 'RON',
		name: 'Romanian Leu',
		country: 'Romania',
		flag: `${flagsApiUrl}/ro.svg`
	},
	RSD: {
		code: 'RSD',
		name: 'Serbian Dinar',
		country: 'Serbia',
		flag: `${flagsApiUrl}/rs.svg`
	},
	RUB: {
		code: 'RUB',
		name: 'Russian Ruble',
		country: 'Russia',
		flag: `${flagsApiUrl}/ru.svg`
	},
	RWF: {
		code: 'RWF',
		name: 'Rwandan Franc',
		country: 'Rwanda',
		flag: `${flagsApiUrl}/rw.svg`
	},
	SAR: {
		code: 'SAR',
		name: 'Saudi Riyal',
		country: 'Saudi Arabia',
		flag: `${flagsApiUrl}/sa.svg`
	},
	SBD: {
		code: 'SBD',
		name: 'Solomon Islands Dollar',
		country: 'Solomon Islands',
		flag: `${flagsApiUrl}/sb.svg`
	},
	SCR: {
		code: 'SCR',
		name: 'Seychellois Rupee',
		country: 'Seychelles',
		flag: `${flagsApiUrl}/sc.svg`
	},
	SDG: {
		code: 'SDG',
		name: 'Sudanese Pound',
		country: 'Sudan',
		flag: `${flagsApiUrl}/sd.svg`
	},
	SEK: {
		code: 'SEK',
		name: 'Swedish Krona',
		country: 'Sweden',
		flag: `${flagsApiUrl}/se.svg`
	},
	SGD: {
		code: 'SGD',
		name: 'Singapore Dollar',
		country: 'Singapore',
		flag: `${flagsApiUrl}/sg.svg`
	},
	SHP: {
		code: 'SHP',
		name: 'Saint Helena Pound',
		country: 'Saint Helena',
		flag: `${flagsApiUrl}/sh.svg`
	},
	SLE: {
		code: 'SLE',
		name: 'Sierra Leonean Leone',
		country: 'Sierra Leone',
		flag: `${flagsApiUrl}/sl.svg`
	},
	SOS: {
		code: 'SOS',
		name: 'Somali Shilling',
		country: 'Somalia',
		flag: `${flagsApiUrl}/so.svg`
	},
	SRD: {
		code: 'SRD',
		name: 'Surinamese Dollar',
		country: 'Suriname',
		flag: `${flagsApiUrl}/sr.svg`
	},
	SSP: {
		code: 'SSP',
		name: 'South Sudanese Pound',
		country: 'South Sudan',
		flag: `${flagsApiUrl}/ss.svg`
	},
	STN: {
		code: 'STN',
		name: 'São Tomé and Príncipe Dobra',
		country: 'São Tomé and Príncipe',
		flag: `${flagsApiUrl}/st.svg`
	},
	SYP: { code: 'SYP', name: 'Syrian Pound', country: 'Syria', flag: `${flagsApiUrl}/sy.svg` },
	SZL: {
		code: 'SZL',
		name: 'Eswatini Lilangeni',
		country: 'Eswatini',
		flag: `${flagsApiUrl}/sz.svg`
	},
	THB: { code: 'THB', name: 'Thai Baht', country: 'Thailand', flag: `${flagsApiUrl}/th.svg` },
	TJS: {
		code: 'TJS',
		name: 'Tajikistani Somoni',
		country: 'Tajikistan',
		flag: `${flagsApiUrl}/tj.svg`
	},
	TMT: {
		code: 'TMT',
		name: 'Turkmenistan Manat',
		country: 'Turkmenistan',
		flag: `${flagsApiUrl}/tm.svg`
	},
	TND: {
		code: 'TND',
		name: 'Tunisian Dinar',
		country: 'Tunisia',
		flag: `${flagsApiUrl}/tn.svg`
	},
	TOP: {
		code: 'TOP',
		name: 'Tongan Paʻanga',
		country: 'Tonga',
		flag: `${flagsApiUrl}/to.svg`
	},
	TRY: { code: 'TRY', name: 'Turkish Lira', country: 'Turkey', flag: `${flagsApiUrl}/tr.svg` },
	TTD: {
		code: 'TTD',
		name: 'Trinidad and Tobago Dollar',
		country: 'Trinidad and Tobago',
		flag: `${flagsApiUrl}/tt.svg`
	},
	TVD: {
		code: 'TVD',
		name: 'Tuvaluan Dollar',
		country: 'Tuvalu',
		flag: `${flagsApiUrl}/tv.svg`
	},
	TWD: {
		code: 'TWD',
		name: 'New Taiwan Dollar',
		country: 'Taiwan',
		flag: `${flagsApiUrl}/tw.svg`
	},
	TZS: {
		code: 'TZS',
		name: 'Tanzanian Shilling',
		country: 'Tanzania',
		flag: `${flagsApiUrl}/tz.svg`
	},
	UAH: {
		code: 'UAH',
		name: 'Ukrainian Hryvnia',
		country: 'Ukraine',
		flag: `${flagsApiUrl}/ua.svg`
	},
	UGX: {
		code: 'UGX',
		name: 'Ugandan Shilling',
		country: 'Uganda',
		flag: `${flagsApiUrl}/ug.svg`
	},
	USD: {
		code: 'USD',
		name: 'United States Dollar',
		country: 'United States',
		flag: `${flagsApiUrl}/us.svg`
	},
	UYU: {
		code: 'UYU',
		name: 'Uruguayan Peso',
		country: 'Uruguay',
		flag: `${flagsApiUrl}/uy.svg`
	},
	UZS: {
		code: 'UZS',
		name: "Uzbekistani So'm",
		country: 'Uzbekistan',
		flag: `${flagsApiUrl}/uz.svg`
	},
	VES: {
		code: 'VES',
		name: 'Venezuelan Bolívar Soberano',
		country: 'Venezuela',
		flag: `${flagsApiUrl}/ve.svg`
	},
	VND: {
		code: 'VND',
		name: 'Vietnamese Đồng',
		country: 'Vietnam',
		flag: `${flagsApiUrl}/vn.svg`
	},
	VUV: {
		code: 'VUV',
		name: 'Vanuatu Vatu',
		country: 'Vanuatu',
		flag: `${flagsApiUrl}/vu.svg`
	},
	WST: { code: 'WST', name: 'Samoan Tālā', country: 'Samoa', flag: `${flagsApiUrl}/ws.svg` },
	XAF: {
		code: 'XAF',
		name: 'Central African CFA Franc',
		country: 'CEMAC',
		flag: `${flagsApiUrl}/cm.svg`
	},
	XCD: {
		code: 'XCD',
		name: 'East Caribbean Dollar',
		country: 'Organisation of Eastern Caribbean States',
		flag: `${flagsApiUrl}/ag.svg`
	},
	XDR: {
		code: 'XDR',
		name: 'Special Drawing Rights',
		country: 'International Monetary Fund',
		flag: `${flagsApiUrl}/imf.sv`
	},
	XOF: {
		code: 'XOF',
		name: 'West African CFA franc',
		country: 'CFA',
		flag: `${flagsApiUrl}/sn.svg`
	},
	XPF: {
		code: 'XPF',
		name: 'CFP Franc',
		country: "Collectivités d'Outre-Mer",
		flag: `${flagsApiUrl}/pf.svg`
	},
	YER: { code: 'YER', name: 'Yemeni Rial', country: 'Yemen', flag: `${flagsApiUrl}/ye.svg` },
	ZAR: {
		code: 'ZAR',
		name: 'South African Rand',
		country: 'South Africa',
		flag: `${flagsApiUrl}/za.svg`
	},
	ZMW: {
		code: 'ZMW',
		name: 'Zambian Kwacha',
		country: 'Zambia',
		flag: `${flagsApiUrl}/zm.svg`
	},
	ZWL: {
		code: 'ZWL',
		name: 'Zimbabwean Dollar',
		country: 'Zimbabwe',
		flag: `${flagsApiUrl}/zw.svg`
	}
};
