import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Toast = ({ message, type = 'info', isVisible, onClose, duration = 5000, showLogin = false, onLogin, onRegister }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300);
  };

  if (!isVisible && !isExiting) return null;

  // Auth toast renders as a modal-style dialog
  if (type === 'auth' && showLogin) {
    return (
      <>
        {/* Backdrop overlay */}
        <div
          className={cn(
            "fixed inset-0 z-[90] bg-black/30 transition-opacity duration-300",
            isVisible && !isExiting ? "opacity-100" : "opacity-0"
          )}
          onClick={handleClose}
        />

        {/* Modal content */}
        <div
          className={cn(
            "fixed top-1/2 left-1/2 z-[100] w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl transition-all duration-300 transform",
            isVisible && !isExiting
              ? "translate-x-[-50%] translate-y-[-50%] opacity-100 scale-100"
              : "translate-x-[-50%] translate-y-[-50%] opacity-0 scale-95"
          )}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Material Bank Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-800 mr-3"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33.516 6.5H44.2757C44.3514 6.5 44.4128 6.56087 44.4128 6.63595V41.364C44.4128 41.4391 44.3514 41.5 44.2757 41.5H33.516C33.4402 41.5 33.3788 41.4391 33.3788 41.364V6.63595C33.3788 6.56087 33.4402 6.5 33.516 6.5ZM31.6822 21.0979C31.7079 21.1234 31.7223 21.1579 31.7223 21.1939C31.7223 21.23 31.7079 21.2645 31.6822 21.29L24.0751 28.8327C24.0489 28.8579 24.0138 28.8719 23.9773 28.8719C23.9408 28.8719 23.9057 28.8579 23.8795 28.8327L9.25042 14.331C9.22506 14.3049 9.21088 14.2702 9.21088 14.234C9.21088 14.1978 9.22506 14.163 9.25042 14.137L16.8575 6.59609C16.8703 6.58321 16.8855 6.57298 16.9023 6.566C16.9191 6.55902 16.9371 6.55542 16.9554 6.55542C16.9736 6.55542 16.9916 6.55902 17.0084 6.566C17.0252 6.57298 17.0404 6.58321 17.0532 6.59609L31.6822 21.0979ZM3.71716 20.7172H14.4768C14.5137 20.7172 14.549 20.7317 14.5751 20.7575C14.6012 20.7834 14.6158 20.8184 14.6158 20.8549V41.3622C14.6158 41.3983 14.6014 41.4329 14.5756 41.4584C14.5499 41.4839 14.515 41.4982 14.4787 41.4982H3.71716C3.68079 41.4982 3.64591 41.4839 3.62019 41.4584C3.59447 41.4329 3.58002 41.3983 3.58002 41.3622V20.8549C3.58002 20.8189 3.59447 20.7843 3.62019 20.7588C3.64591 20.7333 3.68079 20.719 3.71716 20.719V20.7172Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-2xl font-bold text-gray-800">Material Bank</span>
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
              Login to access the most powerful platform for searching and sampling materials
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              300+ brands. Next day delivery. Always free for architects and interior designers.
            </p>
          </div>

          {/* Login button */}
          <button
            onClick={() => {
              handleClose();
              if (onLogin) onLogin();
            }}
            className="w-full py-4 px-6 mb-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors duration-200"
          >
            Login
          </button>

          {/* Register link */}
          <div className="text-center mb-4">
            <span className="text-gray-500 text-sm">Not a registered user? </span>
            <button
              onClick={() => {
                handleClose();
                if (onRegister) onRegister();
              }}
              className="text-gray-700 hover:text-gray-900 font-medium text-sm underline transition-colors"
            >
              Register
            </button>
          </div>

          {/* Forgot Password link */}
          <div className="text-center">
            <button
              onClick={() => {
                handleClose();
                window.location.href = '/reset';
              }}
              className="text-gray-500 hover:text-gray-700 text-xs underline transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </>
    );
  }

  // Regular toast notifications
  const variants = {
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-[100] max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 transform",
        variants[type],
        isVisible && !isExiting ? "translate-y-0 opacity-100 scale-100" : "translate-y-[-20px] opacity-0 scale-95"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
