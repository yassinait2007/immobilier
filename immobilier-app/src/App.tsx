"use client";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import { PropertyProvider } from "@/context/PropertyContext";
import { AuthProvider } from "@/context/authentication/auth-context";
import { AuthModalProvider } from "@/context/authentication/auth-modal-context";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ToastProvider, ToastContainer } from "@/utils/toast";
import { BookingProvider } from "@/context/BookingContext";
import AuthModalContainer from "@/features/Auth/container/AuthModalContainer";

import "./index.css";

function App() {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <PropertyProvider>
          <BookingProvider>
            <FavoritesProvider>
              <ToastProvider>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col bg-gray-50">
                  <Header />
                  <AuthModalContainer />
                  <main className="flex-grow">
                    <Outlet />
                  </main>
                  <Footer />
                </div>
                <ToastContainer />
              </ToastProvider>
            </FavoritesProvider>
          </BookingProvider>
        </PropertyProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}

export default App;
