import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Poppins", ...defaultTheme.fontFamily.sans],
        body: ["Outfit", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: "#f3f8ff",
          100: "#e6efff",
          200: "#c7dcff",
          300: "#92b7ff",
          400: "#5f8cff",
          500: "#3b69f5",
          600: "#3054d6",
          700: "#2a44a8",
          800: "#24367c",
          900: "#1d2d5a",
        },
      },
      boxShadow: {
        card: "0 18px 60px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at top, rgba(59, 130, 246, 0.12), transparent 40%), radial-gradient(circle at right, rgba(79, 70, 229, 0.12), transparent 25%)",
      },
    },
  },
  plugins: [],
};
