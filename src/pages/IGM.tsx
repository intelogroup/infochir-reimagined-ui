
import React from 'react';
import { MainLayout } from "@/components/layouts/MainLayout";
import { IGMHeader } from "@/components/igm/components/IGMHeader";
import { IGMSidebar } from "@/components/igm/components/IGMSidebar";
import { IssuesGridLayout } from "@/components/igm/components/layout/IssuesGridLayout";
import { ErrorBoundary } from "@/components/error-boundary/ErrorBoundary";

const IGM = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F1F0FB] pt-[15px]">
        <IGMHeader />

        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-8">
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[1fr,350px] lg:gap-6">
            <div className="order-1">
              <ErrorBoundary name="IGM-IssuesGrid">
                <IssuesGridLayout />
              </ErrorBoundary>
            </div>
            <div className="order-2 lg:order-2">
              <ErrorBoundary name="IGM-Sidebar">
                <IGMSidebar />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default IGM;
