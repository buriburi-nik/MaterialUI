import React from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/button';

const ToastTest = () => {
  const { showToast, showAuthToast } = useToast();

  const testToasts = [
    { type: 'info', message: 'This is an info message' },
    { type: 'success', message: 'This is a success message' },
    { type: 'warning', message: 'This is a warning message' },
    { type: 'error', message: 'This is an error message' },
  ];

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Toast System Test</h3>
      
      <div className="space-y-2 mb-4">
        {testToasts.map((toast) => (
          <Button
            key={toast.type}
            variant="outline"
            size="sm"
            onClick={() => showToast(toast.message, toast.type)}
            className="mr-2 mb-2"
          >
            Test {toast.type} toast
          </Button>
        ))}
      </div>
      
      <Button
        variant="secondary"
        size="sm"
        onClick={() => showAuthToast("You need to sign in to access this feature")}
      >
        Test Auth Toast
      </Button>
    </div>
  );
};

export default ToastTest;
