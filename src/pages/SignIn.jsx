import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import {
  updateSignInForm,
  clearSignInForm,
  setLoading,
  setError,
  signInSuccess,
} from "../../client/store/slices/authSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signInForm, isLoading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleInputChange = (field, value) => {
    dispatch(updateSignInForm({ field, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));

    // Basic validation for sign in (just email and password)
    if (!signInForm.email || !signInForm.password) {
      dispatch(setError("Please fill in all required fields"));
      dispatch(setLoading(false));
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock successful sign in
      dispatch(signInSuccess({
        id: Date.now(),
        email: signInForm.email,
      }));
      
      dispatch(clearSignInForm());
      navigate("/");
    } catch (err) {
      dispatch(setError("Failed to sign in. Please try again."));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Image and Content */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-50">
        {/* Header with back button and join for free */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Back</span>
          </button>
          <span className="text-sm text-gray-600">Join for free</span>
        </div>

        <div className="flex flex-col justify-center items-center h-full p-12">
          {/* Logo */}
          <div className="absolute top-6 left-6 flex items-center">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="font-semibold text-gray-900">Material Bank</span>
          </div>

          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              The fastest and most sustainable way to search and sample materials
            </h1>
            <p className="text-gray-600 mb-8">
              Hundreds of leading brands. One site. Order by 16:30 CET. 
              Samples tomorrow. Free for architects and interior designers.
            </p>
            
            {/* Material Box Image */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb6d0bc45a36343a4b0569259163dfb47%2Fe3e6e70c4b41432ba596d07899ebe3b6?format=webp&width=800"
                alt="Material Bank box with material samples"
                className="w-full h-auto rounded-lg mb-4"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">M</span>
                  </div>
                  <span className="font-medium text-gray-900 text-sm">Material Bank</span>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs">▶</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 flex justify-between items-center">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="text-sm">Back</span>
            </button>
            <span className="text-sm text-gray-600">Join for free</span>
          </div>

          {/* Sign In Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign In
            </h2>
            <p className="text-sm text-gray-600">
              Not a registered user?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-500 underline">
                Register
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Business Email */}
            <div>
              <Input
                id="email"
                type="email"
                value={signInForm.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Business Email"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={signInForm.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Terms and Forgot Password */}
            <div className="text-xs text-gray-500 space-y-2">
              <p>
                By clicking "Sign In" you agree to{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500 underline">
                  Our Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500 underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                Forgot Your Password?{" "}
                <Link to="/reset" className="text-blue-600 hover:text-blue-500 underline">
                  Reset Your Password
                </Link>
              </p>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-md font-medium transition-colors"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            {/* Footer Text */}
            <div className="text-center text-xs text-gray-500 leading-relaxed">
              Your personal information will be used by Material Bank Europe to create and
              manage your account.{" "}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-500 underline">
                Read more about your data
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
