import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import { getTheme } from "./theme/theme.tsx";
import "./main.css";
import { UserProvider } from "./context/userContext.tsx";
import DateProviders from "./providers/localizationProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={getTheme()}>
      <UserProvider>
        <DateProviders>
          <App />
        </DateProviders>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
