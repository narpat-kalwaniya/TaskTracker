import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();
const clientId =
  "433422342619-o7tponv545aplimrm8be4cqhb23rk9i7.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Router>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
