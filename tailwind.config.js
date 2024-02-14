/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // SCREEN RESOLUTION
      screens: {
        xxs: "300px",
        xxs2: "360px",
        xxs3: "374px",
        xxs4: "383px",
        xs: "400px",
        xs1: "410px",
        xs2: "425px",
        sm1: "576px",
        md: "768px",
      },
      // COLORS THEME PALETTE
      colors: {
        primarycolor: "#6244B5",
        primarycolor2: "#6244b4",
        secondarycolor: "#9750B5",
        tertiarycolor: "#ffc945",
        tertiarycolor2: "#f0a324",
        tertiarycolor3: "#ffc145",
        purplecolor: "#7d44a8",
        purplecolor2: "#8748a3",
        bgTransparent: "rgba(0,0,0,.5)",
        greycolor: "#c1c1c1",
        greycolor2: "#c0c0c0",
      },
      // FONT FAMILY MEANS FONT NAME
      fontFamily: {
        proximanovaR: ["proximanova-regular"],
        proximanovaB: ["proximanova-bold"],
        proximanovaEB: ["proximanova-extrabld"],
      },
      // BOX SHADOW
      boxShadow: {
        inputField: "0px 0px 14px 8px rgba(250,250,250,0.2)",
        inputFieldYellow: "0px 0px 14px 8px #fbda5b80",
        btnPrimaryWhiteGoldenArrow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        btnPrimaryPurpleArrow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        btnPrimaryShadow: "0px 0px 4px 3px rgba(255,255,255,0.9)",
        btnPrimaryDarkShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        btnPrimaryBlackShadow: "0px 16px 23px -4px #000000",
        activeSlider: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      // BACKGROUND IMAGE
      backgroundImage: {
        primaryGradient1:
          "linear-gradient(to right, #6244b4, #6344b4, #6444b4, #6545b4, #6645b4, #6745b4, #6946b4, #6a46b4, #6c46b4, #6f47b4, #7147b4, #7348b4)",
        btnCloseSidebarGradient:
          "linear-gradient(to left, #f2aa2e, #f4ae32, #f7b337, #f9b73b, #fbbb3f, #fbba3f, #fbba3e, #fbb93e, #f9b438, #f6ae33, #f4a92d, #f1a327)",
        btnPrimaryRounded:
          "linear-gradient(to right top,#6244b5,#7147b5,#7f49b5,#8b4cb5,#9750b5)",
        oopsCongratsGradient:
          "linear-gradient(to bottom, #9450b3, #9450b3, #9450b3, #9450b3, #9450b3, #904fb3, #8d4db4, #894cb4, #804ab4, #7748b5, #6d46b5, #6244b5)",
        chantGradient:
          "linear-gradient(to top, #f6af32,#f6b033,#f6b134,#f7b134,#f7b235,#f7b134,#f6b033,#f6af32,#f5ac2f,#f3a92c,#f2a628,#f0a325)",
        chantSectionTitleGradient:
          "linear-gradient(to right bottom, #6245b3, #6546b3, #6846b3, #6b47b3, #6e48b3, #7249b3, #7649b3, #7a4ab3, #7f4bb3, #854cb4, #8a4db4, #8f4eb4)",
      },
      linearGradientColors: {
        btnPrimary: "linear-gradient(#6244b5,#7147b5,#7f49b5,#8b4cb5,#9750B5)",
      },
    },
  },
  plugins: [],
};
