import { useSelector } from 'react-redux';
import { useToast } from '@/contexts/ToastContext';

export const useAuthCheck = () => {
  const { isSignedIn } = useSelector((state) => state.auth);
  const { showAuthToast } = useToast();

  const requireAuth = (callback, message = "Sign in to access this feature") => {
    return (event) => {
      if (event) {
        event.preventDefault();
      }
      
      if (!isSignedIn) {
        showAuthToast(message);
        return false;
      }
      
      if (callback) {
        callback(event);
      }
      return true;
    };
  };

  return {
    isSignedIn,
    requireAuth
  };
};
