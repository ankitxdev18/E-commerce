import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Base";
import { Home, Search } from "lucide-react";

const ModernPageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8"
        >
          <span className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </span>
        </motion.div>

        {/* Message */}
        <h1 className="text-4xl font-bold text-neutral-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-neutral-600 text-lg mb-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-neutral-500 text-sm mb-8">
          It might have been moved, or maybe you followed a broken link.
        </p>

        {/* Illustration */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-7xl mb-8"
        >
          🔍
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go Home
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2"
          >
            <Search size={20} />
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-neutral-600 text-sm mb-4">
            Need help? Contact our support team
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="mailto:support@shophub.com"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Email
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="tel:1234567890"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Call
            </a>
            <span className="text-neutral-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Chat
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernPageNotFound;
