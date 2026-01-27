import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import './index.css'
// creation du client qui nous permettra de faire des requetes et gerer le cache
const queryClient = new QueryClient();

//provider de React Query pour permettre l'acces au client dans toute l'application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);