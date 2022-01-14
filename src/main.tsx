import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { ThemeProvider } from "./components";
import "@shopify/polaris/build/esm/styles.css";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <ThemeProvider
        theme={{
          colorScheme: "light",
        }}
      >
        <App />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
