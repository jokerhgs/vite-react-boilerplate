import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AnalyticsProvider } from "./components/analytics-provider";
import { AppRoutes } from "./router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AnalyticsProvider>
      <AppRoutes />
    </AnalyticsProvider>
  </BrowserRouter>
);
