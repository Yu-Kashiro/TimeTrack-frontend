import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { LightMode } from "./components/ui/color-mode.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <LightMode>
          <App />
        </LightMode>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
