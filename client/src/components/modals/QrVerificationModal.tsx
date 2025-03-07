import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SuccessVerification } from "../qr-code-scanner/SuccessVerification";
import { ErrorVerification } from "../qr-code-scanner/ErrorVerification";

type QRVerificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error";
  userName?: string;
  eventName?: string;
  errorMessage?: string;
};

export function QrVerificationModal({
  isOpen,
  onClose,
  status,
  userName = "Guest",
  eventName = "Event",
  errorMessage = "This QR code is invalid or has already been used.",
}: QRVerificationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {status === "success" ? (
          <SuccessVerification userName={userName} eventName={eventName} />
        ) : (
          <ErrorVerification message={errorMessage} />
        )}
        <DialogFooter className="sm:justify-center">
          <Button
            variant="default"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
