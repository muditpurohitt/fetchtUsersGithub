import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { DataContextProvider } from "./context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </StrictMode>
);
