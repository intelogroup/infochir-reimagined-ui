
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorBoundary } from "@/components/error-boundary/ErrorBoundary";
import { Toaster } from "sonner";

// Preload critical routes
const Home = lazy(() => import("@/pages/Home" /* webpackPrefetch: true */));
const RHCA = lazy(() => import("@/pages/RHCA" /* webpackPrefetch: true */));
const IGM = lazy(() => import("@/pages/IGM" /* webpackPrefetch: true */));
const Donate = lazy(() => import("@/pages/Donate" /* webpackPrefetch: true */));
const ADC = lazy(() => import("@/pages/ADC" /* webpackPrefetch: true */));
const IndexMedicus = lazy(() => import("@/pages/IndexMedicus" /* webpackPrefetch: true */));

// Lazy load less frequently accessed routes
const About = lazy(() => import("@/pages/About"));
const EditorialCommittee = lazy(() => import("@/pages/EditorialCommittee"));
const Submission = lazy(() => import("@/pages/Submission"));
const Annuaire = lazy(() => import("@/pages/Annuaire"));
const Opportunities = lazy(() => import("@/pages/Opportunities"));
const RHCADirectives = lazy(() => import("@/pages/rhca/Directives"));
const IGMDirectives = lazy(() => import("@/pages/igm/Directives")); 

function App() {
  console.log("[App] Rendering with React Router context");
  
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rhca" element={<RHCA />} />
          <Route path="/rhca/directives" element={<RHCADirectives />} />
          <Route path="/igm" element={<IGM />} />
          <Route path="/igm/directives" element={<IGMDirectives />} />
          <Route path="/igm/editorial-committee" element={<EditorialCommittee />} />
          <Route path="/about" element={<About />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/annuaire" element={<Annuaire />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/jobs" element={<Opportunities />} />
          <Route path="/adc/*" element={<ADC />} />
          <Route path="/index-medicus" element={<IndexMedicus />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </ErrorBoundary>
  );
}

export default App;
