import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { Spinner } from "../components/ui/Animations";

// Lazy load modern pages
const ModernProducts = lazy(() => import("../pages/ModernProducts"));
const ModernProductDetails = lazy(() => import("../pages/ModernProductDetails"));
const ModernCart = lazy(() => import("../pages/ModernCart"));
const ModernSignin = lazy(() => import("../pages/ModernSignin"));
const ModernSignup = lazy(() => import("../pages/ModernSignup"));
const ModernCreateProduct = lazy(() => import("../pages/ModernCreateProduct"));
const ModernSettings = lazy(() => import("../pages/ModernSettings"));
const ModernAbout = lazy(() => import("../pages/ModernAbout"));
const ModernPageNotFound = lazy(() => import("../pages/ModernPageNotFound"));

const Mainroutes = () => {
  const loadingFallback = (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Spinner size="lg" />
    </div>
  );

  return (
    <Suspense fallback={loadingFallback}>
      <Routes>
        <Route path="/" element={<ModernProducts />} />

        <Route
          path="/signin"
          element={
            <PublicRoute>
              <ModernSignin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <ModernSignup />
            </PublicRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ModernSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-product/:id"
          element={
            <ProtectedRoute>
              <ModernProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-product"
          element={
            <ProtectedRoute>
              <ModernCreateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <ModernCart />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<ModernAbout />} />
        <Route path="*" element={<ModernPageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Mainroutes;
