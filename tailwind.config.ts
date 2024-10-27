import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: colors.teal,
				secondary: colors.cyan
			},
			fontFamily: {
				jp: ['Noto Sans JP', 'sans-serif']
			}
		}
	},

	plugins: []
} as Config;
