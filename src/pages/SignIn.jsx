import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";


import { updateSignInForm, clearSignInForm, setLoading, setError, signInSuccess } from "../../store/slices/authSlice";

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
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Image and Content */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gray-50">
        {/* Header with back button and join for free */}
        <div className="absolute z-10 flex items-center justify-between top-6 left-6 right-6">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Back</span>
          </button>
          <span className="text-sm text-gray-600">Join for free</span>
        </div>

        <div className="flex flex-col items-center justify-center h-full p-12">
          {/* Logo */}
          

          <div className="max-w-md text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900">              The fastest and most sustainable way to search and sample materials
            </h1>
            <p className="text-gray-600 ">
              Hundreds of leading brands. One site. Order by 16:30 CET. 
              Samples tomorrow. Free for architects and interior designers.
            </p>
            
            {/* Material Box Image */}
            <div className="max-w-sm ">
              <img
                src="https://www.materialbank.eu/static/version1753374402/frontend/MaterialBank/mb-eu/en_US/Magento_Customer/images/register_background.png"
                alt="Material Bank box with material samples"
                className="w-full h-auto mb-4 rounded-lg"
              />
              
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
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
            <span className="text-sm text-gray-600">Join for free</span>
          </div>

          {/* Sign In Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Sign In
            </h2>
            <p className="text-sm text-gray-600">
              Not a registered user?{" "}
              <Link to="/register" className="text-blue-600 underline hover:text-blue-500">
                Register
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

            {/* Business Email */}
            <div>
              <Input
                id="email"
                type="email"
                value={signInForm.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-3 pr-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Terms and Forgot Password */}
            <div className="space-y-2 text-xs text-gray-500">
              <p>
                By clicking "Sign In" you agree to{" "}
                <Link to="/terms" className="text-blue-600 underline hover:text-blue-500">
                  Our Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 underline hover:text-blue-500">
                  Privacy Policy
                </Link>
                .
              </p>
              <p>
                Forgot Your Password?{" "}
                <Link to="/reset" className="text-blue-600 underline hover:text-blue-500">
                  Reset Your Password
                </Link>
              </p>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            {/* Footer Text */}
            <div className="text-xs leading-relaxed text-center text-gray-500">
              Your personal information will be used by Material Bank Europe to create and
              manage your account.{" "}
              <Link to="/privacy" className="text-blue-600 underline hover:text-blue-500">
                Read more about your data
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
