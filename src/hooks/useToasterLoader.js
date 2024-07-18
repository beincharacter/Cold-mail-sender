import { useState } from 'react';

function useToasterLoader() {
  const [toastState, setToastState] = useState({
    message: '',
    severity: 'info',
  });
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, severity = 'info') => {
    setToastState({ message, severity });
  };

  const clearToast = () => {
    setToastState({ message: '', severity: 'info' });
  };

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    toastState,
    showToast,
    clearToast,
    isLoading,
    startLoading,
    stopLoading,
  };
}

export default useToasterLoader;