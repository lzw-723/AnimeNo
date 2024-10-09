/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import daisyui from "daisyui"

module.exports = {
    content: ["./**/*.{html,jsx}"], theme: {
        extend: {},
    }, plugins: [typography, daisyui],
}

