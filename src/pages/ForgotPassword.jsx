import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { EXTERNAL_ASSETS } from "@assets";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate API call for password reset
    try {
      // In a real app, this would call your password reset API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen bg-white">
        {/* Left Panel - Image and Content */}
        <div className="relative hidden lg:flex lg:w-1/2 bg-gray-50">
          {/* Header with back button */}
          <div className="absolute z-10 flex items-center justify-between top-6 left-6 right-6">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="text-sm">Back</span>
            </button>
            <Link to="/signin" className="text-sm text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center h-full p-12">
            <div className="max-w-md text-center">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900">
                Check your email
              </h1>
              <p className="text-gray-600">
                We've sent password reset instructions to your email address.
              </p>
              
              {/* Material Box Image */}
              <div className="max-w-sm">
                <img
                  src={EXTERNAL_ASSETS.AUTH.REGISTER_BACKGROUND}
                  alt="Material Bank box with material samples"
                  className="w-full h-auto mb-4 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Success Message */}
        <div className="flex flex-col justify-center flex-1 px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="w-full max-w-sm mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Check your email
              </h2>
              <p className="text-sm text-gray-600">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => navigate("/signin")}
                className="w-full py-3 font-medium text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Return to Sign In
              </Button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Image and Content */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gray-50">
        {/* Header with back button */}
        <div className="absolute z-10 flex items-center justify-between top-6 left-6 right-6">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Back</span>
          </button>
          <Link to="/signin" className="text-sm text-gray-600 hover:text-gray-900">
            Sign In
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center h-full p-12">
          <div className="max-w-md text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900">
              Reset your password
            </h1>
            <p className="text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            {/* Material Box Image */}
            <div className="max-w-sm">
              <img
                src={EXTERNAL_ASSETS.AUTH.REGISTER_BACKGROUND}
                alt="Material Bank box with material samples"
                className="w-full h-auto mb-4 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Reset Form */}
      <div className="flex flex-col justify-center flex-1 px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="text-sm">Back</span>
            </button>
            <Link to="/signin" className="text-sm text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
          </div>

          {/* Reset Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Reset Password
            </h2>
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/signin" className="text-blue-600 underline hover:text-blue-500">
                Sign In
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="px-4 py-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-3 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>

            {/* Back to Sign In */}
            <div className="text-center">
              <Link 
                to="/signin" 
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                ← Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
