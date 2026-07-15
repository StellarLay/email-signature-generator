import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import App from "./App";
import "./index.css";

const themeConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f5f9f3" },
          100: { value: "#e8f1e4" },
          200: { value: "#d7e7d0" },
          300: { value: "#c0d7b5" },
          400: { value: "#9fbe92" },
          500: { value: "#7fa574" },
          600: { value: "#61845a" },
          700: { value: "#4e6949" },
          800: { value: "#40543d" },
          900: { value: "#344532" },
        },
      },
    },
  },
  globalCss: {
    "html, body, #root": { minHeight: "100%" },
    body: { margin: "0" },
  },
});

const system = createSystem(defaultConfig, themeConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
