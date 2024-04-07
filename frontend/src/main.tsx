import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster richColors />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
