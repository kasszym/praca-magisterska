import { AxiosInstance } from "axios";
import { ElMessage } from "element-plus";

export const errorInterceptor = (api: AxiosInstance): void => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      ElMessage({
        showClose: true,
        message: "Ups! Coś poszło nie tak. Spróbuj ponownie.",
        type: "error",
      });
      return Promise.reject(error);
    }
  );
};
