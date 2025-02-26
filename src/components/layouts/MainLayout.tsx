
import * as React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <main className="relative min-h-[calc(100vh-4rem)]">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
