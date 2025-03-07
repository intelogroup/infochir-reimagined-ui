
import * as React from "react";
import { Suspense, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorBoundary } from "@/components/error-boundary/ErrorBoundary";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { toast } from "sonner";

interface AdminRouteWrapperProps {
  component: React.ComponentType;
}

export const AdminRouteWrapper = ({ component: Component }: AdminRouteWrapperProps) => {
  const { isAdmin, isLoading, error } = useAdminAuth();
  const navigate = useNavigate();

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication error", {
        description: "Please try logging in again",
      });
      navigate("/", { replace: true });
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner variant="default" size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner variant="default" size="lg" />
      </div>
    }>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </Suspense>
  );
};
