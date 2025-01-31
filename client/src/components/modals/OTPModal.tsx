import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTimer } from "@/hooks/useTimer";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { timeLeft, startTimer, resetTimer } = useTimer(60);

  useEffect(() => {
    if (isOpen) {
      resetTimer();
      startTimer();
    }
  }, [isOpen, resetTimer, startTimer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = () => {
    onVerify(otp.join(""));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            Please enter the 6-digit code sent to your device.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(input) => (inputRefs.current[index] = input)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-10 h-10 text-center"
              />
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Time remaining: {timeLeft} seconds
            </p>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Verify OTP
          </Button>
          <Button variant="outline" onClick={resetTimer} className="w-full">
            Resend OTP
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
