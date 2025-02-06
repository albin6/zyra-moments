import { Login } from "@/components/auth/Login";
import { useLoginMutation } from "@/hooks/auth/useLogin";
import { ILoginData } from "@/services/auth/authService";
import { useDispatch } from "react-redux";
import { adminLogin } from "@/store/slices/adminSlice";
import { toast } from "sonner";

export function AdminAuth() {
  const dispatch = useDispatch();

  const { mutate: loginClient } = useLoginMutation();

  const handleLoginSubmit = (data: Omit<ILoginData, "role">) => {
    loginClient(
      { ...data, role: "admin" },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(adminLogin(data.user));
        },
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  return (
    <main className="container min-h-svh flex items-center mx-auto px-4 py-8">
      <Login userType="admin" onSubmit={handleLoginSubmit} />
    </main>
  );
}
