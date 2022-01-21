import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { ThemeProvider } from "../../components";

const AllTheProviders: FC = ({ children }) => {
  return (
    <React.StrictMode>
      <AppProvider i18n={enTranslations}>
        <ThemeProvider
          theme={{
            colorScheme: "light",
          }}
        >
          {children}
        </ThemeProvider>
      </AppProvider>
    </React.StrictMode>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
