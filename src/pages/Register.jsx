import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import{ updateSignInForm, clearSignInForm, setLoading, setError, signInSuccess } from "../../store/slices/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signInForm, isLoading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleInputChange = (field, value) => {
    dispatch(updateSignInForm({ field, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));

    // Basic validation for registration
    if (!signInForm.firstName || !signInForm.lastName || !signInForm.email || !signInForm.password || !signInForm.confirmPassword) {
      dispatch(setError("Please fill in all required fields"));
      dispatch(setLoading(false));
      return;
    }

    if (signInForm.password !== signInForm.confirmPassword) {
      dispatch(setError("Passwords do not match"));
      dispatch(setLoading(false));
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock successful registration
      dispatch(signInSuccess({
        id: Date.now(),
        email: signInForm.email,
        firstName: signInForm.firstName,
        lastName: signInForm.lastName,
      }));
      
      dispatch(clearSignInForm());
      navigate("/");
    } catch (err) {
      dispatch(setError("Failed to register. Please try again."));
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
         

          <div className="max-w-md text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900">
              The fastest and most sustainable way to search and sample materials
            </h1>
            <p className="mb-8 text-gray-600">
              Hundreds of leading brands. One site. Order by 16:30 CET. 
              Samples tomorrow. Free for architects and interior designers.
            </p>
            
            {/* Material Box Image */}
            <div className="max-w-sm p-6 mx-auto">
              <img
                src="https://www.materialbank.eu/static/version1753374402/frontend/MaterialBank/mb-eu/en_US/Magento_Customer/images/register_background.png"
                alt="Material Bank box with material samples"
                className="w-full h-auto"
              />
                         </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
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

          {/* Register Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Let's get started
            </h2>
            <p className="text-sm text-gray-600">
              Free membership for qualified professionals and design creatives.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="px-4 py-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">
                {error}
              </div>
            )}

            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  id="firstName"
                  type="text"
                  value={signInForm.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <Input
                  id="lastName"
                  type="text"
                  value={signInForm.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

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

            {/* Confirm Password */}
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={signInForm.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="w-full px-3 py-3 pr-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm Your Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* LinkedIn Profile */}
            <div>
              <Input
                id="linkedinProfile"
                type="url"
                value={signInForm.linkedinProfile}
                onChange={(e) => handleInputChange("linkedinProfile", e.target.value)}
                className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="LinkedIn / Other Professional Profile Link"
              />
            </div>

            {/* Terms */}
            <div className="text-xs text-gray-500">
              <p>
                By clicking "Join" you agree to{" "}
                <Link to="/terms" className="text-blue-600 underline hover:text-blue-500">
                  our Terms of Use
                </Link>{" "}
                - and -{" "}
                <Link to="/privacy" className="text-blue-600 underline hover:text-blue-500">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-medium text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700"
            >
              {isLoading ? "Creating Account..." : "Join"}
            </Button>

            {/* Already have account */}
            <div className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 underline hover:text-blue-500">
                Sign in here
              </Link>
            </div>

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
