import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TenantProvider } from "@/context/TenantContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SessionProvider } from "@/context/SessionContext";
import { AdminSessionProvider } from "@/context/AdminSessionContext";
import App from "@/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TenantProvider>
        <LanguageProvider>
          <SessionProvider>
            <AdminSessionProvider>
              <App />
            </AdminSessionProvider>
          </SessionProvider>
        </LanguageProvider>
      </TenantProvider>
    </BrowserRouter>
  </StrictMode>,
);
