import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { setLoading, setError } from "../../store/slices/authSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));

    // Basic validation
    if (!email) {
      dispatch(setError("Please enter your email address"));
      dispatch(setLoading(false));
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(setError("Please enter a valid email address"));
      dispatch(setLoading(false));
      return;
    }

    // Simulate API call for password reset
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Mock successful response
      setIsSubmitted(true);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError("Failed to send reset email. Please try again."));
      dispatch(setLoading(false));
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
              <div className="max-w-sm mt-8">
                <img
                  src="https://www.materialbank.eu/static/version1753374402/frontend/MaterialBank/mb-eu/en_US/Magento_Customer/images/register_background.png"
                  alt="Material Bank box with material samples"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Success Message */}
        <div className="flex flex-col justify-center flex-1 px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="w-full max-w-sm mx-auto text-center">
            {/* Mobile Header */}
            <div className="flex items-center justify-center mb-8 lg:hidden">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="text-sm">Back</span>
              </button>
            </div>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>

            {/* Success Message */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Email Sent!
              </h2>
              <p className="text-gray-600 mb-2">
                We've sent password reset instructions to:
              </p>
              <p className="font-medium text-gray-900 mb-4">
                {email}
              </p>
              <p className="text-sm text-gray-600">
                Please check your email and follow the instructions to reset your password.
                If you don't see the email, check your spam folder.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                variant="outline"
                className="w-full py-3 font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Send Another Email
              </Button>

              <Button
                onClick={() => navigate("/signin")}
                className="w-full py-3 font-medium text-white bg-gray-600 hover:bg-gray-700"
              >
                Back to Sign In
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-xs text-center text-gray-500">
              <p>
                Need help?{" "}
                <Link to="/contact" className="text-blue-600 underline hover:text-blue-500">
                  Contact Support
                </Link>
              </p>
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
            onClick={() => navigate("/signin")}
            className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Back to Sign In</span>
          </button>
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
            <div className="max-w-sm mt-8">
              <img
                src="https://www.materialbank.eu/static/version1753374402/frontend/MaterialBank/mb-eu/en_US/Magento_Customer/images/register_background.png"
                alt="Material Bank box with material samples"
                className="w-full h-auto rounded-lg"
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
              onClick={() => navigate("/signin")}
              className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="text-sm">Back to Sign In</span>
            </button>
          </div>

          {/* Reset Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="px-4 py-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700"
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>

            {/* Back to Sign In */}
            <div className="text-center">
              <Link 
                to="/signin" 
                className="text-sm text-blue-600 underline hover:text-blue-500"
              >
                Back to Sign In
              </Link>
            </div>

            {/* Footer Text */}
            <div className="text-xs leading-relaxed text-center text-gray-500">
              If you don't receive an email within a few minutes, please check your spam folder
              or{" "}
              <Link to="/contact" className="text-blue-600 underline hover:text-blue-500">
                contact support
              </Link>
              .
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
