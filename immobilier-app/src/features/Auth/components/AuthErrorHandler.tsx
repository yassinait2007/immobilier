import axios from "axios";

export const handleAuthError = (err: any): string => {
  let message = "An error occurred";
  
  if (axios.isAxiosError(err) && err.response?.data) {
    const errorData = err.response.data;
    
    // Check if there's an error object with validation messages
    if (errorData.error && typeof errorData.error === 'object') {
      // Get the first error message from the error object
      const firstErrorField = Object.keys(errorData.error)[0];
      const firstError = errorData.error[firstErrorField];
      message = Array.isArray(firstError) ? firstError[0] : firstError;
    } else if (errorData.message) {
      if (errorData.message === "invalid-credentials") {
        message = "Email ou mot de passe incorrect";
      } else {
        message = errorData.message;
      }
    }
  } else if (err.message) {
    message = err.message;
  }
  
  return message;
};