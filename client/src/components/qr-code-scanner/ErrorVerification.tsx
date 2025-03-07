import { XCircle } from "lucide-react";

interface ErrorVerificationProps {
  message: string;
}

export function ErrorVerification({ message }: ErrorVerificationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <div className="rounded-full bg-red-100 p-3 mb-4">
        <XCircle className="h-10 w-10 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">
        Verification Failed
      </h2>
      <p className="text-muted-foreground">{message}</p>
      <div className="my-4 flex items-center justify-center">
        <div className="animate-pulse h-3 w-3 rounded-full bg-red-500 mr-1"></div>
        <div
          className="animate-pulse h-3 w-3 rounded-full bg-red-500 mr-1"
          style={{ animationDelay: "300ms" }}
        ></div>
        <div
          className="animate-pulse h-3 w-3 rounded-full bg-red-500"
          style={{ animationDelay: "600ms" }}
        ></div>
      </div>
    </div>
  );
}
