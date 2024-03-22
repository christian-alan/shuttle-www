/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	important: true,
	theme: {
		extend: {
			colors: {
				head: '#DDD',
				body: '#A2A2A2',
				orange: '#F09050',
			},
			fontFamily: {
				gradual: 'BwGradual, sans-serif',
				mono: 'Fira Mono, sans-serif',
				atkinson: 'Atkinson, sans-serif',
			},
			borderRadius: {
				'2.5xl': '1.5rem',
				'4xl': '2rem',
				button: '0.875rem',
			},
			fontSize: {
				4.5: '2.5rem',
				6.5: '4rem',
			},
			screens: {
				desktop: '1440px',
			},
			typography: ({ theme }) => {
				const tocCSS = {
					ul: {
						'list-style-type': 'none',
						'padding-left': 0,
						margin: 0,
						li: {
							'padding-left': 0,
							marginTop: '0.375rem',
							marginBottom: '0.375rem',
						},
						a: {
							display: 'block',
							'text-decoration': 'none',
							fontSize: '0.875rem',
							fontWeight: '400',
							color: '#525151',
							transition: 'all 0.5s ease-in-out',
							position: 'relative',
							left: 0,
							'&:hover': {
								color: '#000000',
								left: '1rem',
							},
							'font-weight': '400',
						},
						ul: {
							'list-style-type': 'none',
							li: {
								marginTop: '0.375rem',
								marginBottom: '0.375rem',
								'padding-left': '0 !important',
								'margin-left': '0.75rem',
							},
							a: {
								fontWeight: '200',
								color: '#525151',
								'&:hover': {
									color: '#000000',
								},
							},
						},
					},
				}

				return {
					toc: {
						css: tocCSS,
					},
					'dark-toc': {
						css: {
							...tocCSS,
							ul: {
								...tocCSS.ul,
								a: {
									...tocCSS.ul.a,
									color: '#C2C2C280',
									'&:hover': {
										...tocCSS.ul.a['&:hover'],
										color: '#C2C2C2',
									},
								},
								ul: {
									...tocCSS.ul.ul,
									a: {
										...tocCSS.ul.ul.a,
										color: '#C2C2C280',
										'&:hover': {
											...tocCSS.ul.ul.a['&:hover'],
											color: '#C2C2C2',
										},
									},
								},
							},
						},
					},
				}
			},
			backgroundImage: {
				'gradient-1':
					'linear-gradient(73deg, #FC540C -7.95%, rgba(255, 215, 111, 0.72) 45.94%, #38D4E9 116.73%)',
				'gradient-2':
					'linear-gradient(70deg, #FC540C 34.41%, rgba(255, 215, 111, 0.72) 93.53%, #38D4E9 118.82%)',
				gradient: 'linear-gradient(214.86deg, #F42929 -28.11%, #FF8A3F 21.17%, #E5E938 105.7%)',
				card: 'linear-gradient(214.86deg, rgba(244, 41, 41, 0.1) -28.11%, rgba(255, 138, 63, 0.1) 21.17%, rgba(229, 233, 56, 0.1) 105.7%)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		function ({ addVariant }) {
			addVariant('children', '& > *')
		},
	],
}
