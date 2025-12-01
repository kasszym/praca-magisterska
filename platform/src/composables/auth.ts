import { ref } from "vue";
import { ElMessage } from "element-plus";
import API from "../config/api";
import type { GoogleUser } from "./useOAuth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  user: any;
  message?: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string | string[]>;
    };
  };
}

export const useAuth = () => {
  const isLoading = ref(false);

  const handleValidationErrors = (
    error: ApiError,
    formRef: any,
    fieldMapping?: Record<string, string>
  ) => {
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      Object.keys(errors).forEach((field) => {
        const fieldName = fieldMapping?.[field] || field;
        
        if (formRef) {
          formRef.setFields([
            {
              prop: fieldName,
              errors: Array.isArray(errors[field]) ? errors[field] : [errors[field]],
            },
          ]);
        }
      });
    }
  };

  const login = async (
    credentials: LoginCredentials,
    formRef: any = null
  ): Promise<AuthResponse | null> => {
    isLoading.value = true;
    try {
      const response = await API.post<AuthResponse>("/login", credentials);

      localStorage.setItem("token", response.data.token);

      ElMessage({
        message: response.data.message || "Logowanie zakończone pomyślnie",
        type: "success",
        duration: 3000,
      });

      return response.data;
    } catch (error) {
      handleValidationErrors(error as ApiError, formRef);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (
    credentials: RegisterCredentials,
    formRef: any = null
  ): Promise<AuthResponse | null> => {
    isLoading.value = true;
    try {
      const response = await API.post<AuthResponse>("/register", credentials);

      localStorage.setItem("token", response.data.token);

      ElMessage({
        message: response.data.message || "Rejestracja zakończona pomyślnie",
        type: "success",
        duration: 3000,
      });

      return response.data;
    } catch (error) {
      const fieldMapping = {
        password_confirmation: "confirmPassword",
      };
      handleValidationErrors(error as ApiError, formRef, fieldMapping);
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  const logout = async (): Promise<void> => {
    try {
      await API.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      
      ElMessage({
        message: "Wylogowano pomyślnie",
        type: "success",
        duration: 3000,
      });
    }
  };

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("token");
  };

  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

 
  const googleAuth = async (
    googleUser: GoogleUser
  ): Promise<AuthResponse | null> => {
    isLoading.value = true;
    try {
      const response = await API.post<AuthResponse>("/auth/google", {
        email: googleUser.email,
        name: googleUser.name,
        google_id: googleUser.sub,
      });

      localStorage.setItem("token", response.data.token);

      ElMessage({
        message: response.data.message || "Uwierzytelnianie przez Google zakończone pomyślnie",
        type: "success",
        duration: 3000,
      });

      return response.data;
    } catch (error) {
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    getToken,
    googleAuth,
  };
};
