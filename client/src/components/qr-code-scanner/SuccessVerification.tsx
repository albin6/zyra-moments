import { CheckCircle } from "lucide-react";

interface SuccessVerificationProps {
  userName: string;
  eventName: string;
}

export function SuccessVerification({
  userName,
  eventName,
}: SuccessVerificationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <div className="rounded-full bg-green-100 p-3 mb-4">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">
        Verification Successful
      </h2>
      <p className="text-muted-foreground mb-1">
        <span className="font-semibold text-foreground">{userName}</span> is
        verified
      </p>
      <p className="text-muted-foreground">
        and allowed to enter{" "}
        <span className="font-semibold text-foreground">{eventName}</span>
      </p>
      <div className="my-4 flex items-center justify-center">
        <div className="animate-pulse h-3 w-3 rounded-full bg-green-500 mr-1"></div>
        <div
          className="animate-pulse h-3 w-3 rounded-full bg-green-500 mr-1"
          style={{ animationDelay: "300ms" }}
        ></div>
        <div
          className="animate-pulse h-3 w-3 rounded-full bg-green-500"
          style={{ animationDelay: "600ms" }}
        ></div>
      </div>
    </div>
  );
}
