import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterForm } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { EXTERNAL_ASSETS } from "@assets";

export default function Register() {
  const navigate = useNavigate();
  const { form, validation, updateField, handleSubmit, isLoading } = useRegisterForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Image and Content */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gray-50">
        {/* Header with back button and sign in */}
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
              The fastest and most sustainable way to search and sample materials
            </h1>
            <p className="text-gray-600">
              Hundreds of leading brands. One site. Order by 16:30 CET. 
              Samples tomorrow. Free for architects and interior designers.
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

      {/* Right Panel - Registration Form */}
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

          {/* Registration Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Register
            </h2>
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 underline hover:text-blue-500">
                Sign In
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
          

            {/* First Name */}
            <div>
              <Input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className={`w-full px-3 py-3 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validation.errors.firstName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="First Name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <Input
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className={`w-full px-3 py-3 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validation.errors.lastName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Last Name"
                required
              />
            </div>

            {/* Business Email */}
            <div>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={`w-full px-3 py-3 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validation.errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Business Email"
                required
              />
            </div>

            {/* LinkedIn Profile (Optional) */}
            <div>
              <Input
                id="linkedinProfile"
                type="url"
                value={form.linkedinProfile}
                onChange={(e) => updateField("linkedinProfile", e.target.value)}
                className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="LinkedIn Profile (Optional)"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={`w-full px-3 py-3 pr-10 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validation.errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
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
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                className={`w-full px-3 py-3 pr-10 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validation.errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Confirm Password"
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

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={form.agreeToTerms}
                onChange={(e) => updateField("agreeToTerms", e.target.checked)}
                className={`w-4 h-4 mt-1 text-blue-600 border rounded focus:ring-blue-500 ${
                  validation.errors.agreeToTerms ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-xs text-gray-500">
                By clicking "Register" you agree to{" "}
                <Link to="/terms" className="text-blue-600 underline hover:text-blue-500">
                  Our Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 underline hover:text-blue-500">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={!validation.canSubmit || isLoading}
              className="w-full py-3 font-medium text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Register"}
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
