/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        fontFamily: {
            sans: ["Sriracha"],
        },
        extend: {
            backgroundImage: {
                "board-image": "url('/assets/bg.png')",
                "card-image": "url('/assets/full-todo.png')",
            },
        },
    },
    plugins: [],
};

