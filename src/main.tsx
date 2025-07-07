import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { Provider } from "./lib/components/defaultChakraUIComponents/provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { LightMode } from "./lib/components/defaultChakraUIComponents/color-mode.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <LightMode>
          <App />
        </LightMode>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
