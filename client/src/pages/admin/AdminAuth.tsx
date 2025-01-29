import { Login } from "@/components/auth/Login";

export function AdminAuth() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Login
        userType="admin"
        onSubmit={(email, password) => console.log(email, password)}
      />
    </main>
  );
}
