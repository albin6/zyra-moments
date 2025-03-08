import { useState, useEffect, useRef } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { Camera, Copy, ExternalLink, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useTicketMutation } from "@/hooks/event/useTicket";

export default function QRScanner({
  handleShowSuccess,
  handleShowError,
  setShowQRScannerModal,
}: {
  handleShowSuccess: () => void;
  handleShowError: () => void;
  setShowQRScannerModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("user");

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  const { mutate: markAttendance } = useTicketMutation();

  // Initialize scanner
  useEffect(() => {
    console.log("Initializing scanner...", hasPermission);
    console.log("Scanner container ref:", scannerContainerRef);

    if (!scannerContainerRef.current) {
      console.warn("Scanner container not found in DOM");
      return;
    }

    const checkPermissions = async () => {
      try {
        console.log("Attempting to get camera permission...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log("Camera permission granted");
        setHasPermission(true);
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error("Camera permission error:", error);
        setHasPermission(false);
      }
    };

    checkPermissions();

    html5QrCodeRef.current = new Html5Qrcode("qr-reader");

    return () => {
      if (
        html5QrCodeRef.current?.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        html5QrCodeRef.current
          .stop()
          .catch((error: any) =>
            console.error("Failed to stop scanner:", error)
          );
      }
    };
  }, [scannerContainerRef, hasPermission]);

  // Start/stop scanning based on the scanning state
  useEffect(() => {
    if (!html5QrCodeRef.current) return;

    const startScanner = async () => {
      console.log("Starting scanner with facingMode:", facingMode);
      if (!html5QrCodeRef.current) return;

      try {
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        };

        await html5QrCodeRef.current.start(
          { facingMode },
          config,
          handleScan,
          handleScanError
        );
      } catch (error) {
        console.error("Failed to start scanner:", error);
        setScanning(false);
      }
    };

    const stopScanner = async () => {
      if (!html5QrCodeRef.current) return;

      if (
        html5QrCodeRef.current.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        try {
          await html5QrCodeRef.current.stop();
        } catch (error) {
          console.error("Failed to stop scanner:", error);
        }
      }
    };

    if (scanning) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      if (
        html5QrCodeRef.current?.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        html5QrCodeRef.current
          .stop()
          .catch((error: any) =>
            console.error("Failed to stop scanner:", error)
          );
      }
    };
  }, [scanning, facingMode]);

  // Handle QR code scan
  const handleScan = (decodedText: string) => {
    setResult(decodedText);
    setScanning(false);

    console.log("this is the decoded data ==>", decodedText);
    markAttendance(
      { qrCode: decodedText },
      {
        onSuccess: (data) => {
          setResult(decodedText);

          toast.success(data.message || "Attendance marked successfully");
          handleShowSuccess();
          setScanning(false);
          // setShowQRScannerModal(false);

          if (navigator.vibrate) {
            navigator.vibrate(100);
          }
        },
        onError: (error: any) => {
          handleShowError();
          toast.error(
            error.response.data.message || "Failed to mark attendance"
          );
          setScanning(false);
          // setShowQRScannerModal(false);
        },
      }
    );

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const handleScanError = (error: string | Error) => {
    console.error("QR Scan error:", error);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const openUrl = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.open(`https://${url}`, "_blank", "noopener,noreferrer");
    }
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));

    if (scanning) {
      setScanning(false);
      setTimeout(() => setScanning(true), 300);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const requestPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
    } catch (error) {
      console.error("Failed to get permission:", error);
      setHasPermission(false);
    }
  };

  const resetScanner = () => {
    setScanning(true);
    setResult(null);
  };

  const isUrl = (text: string) => {
    return (
      text.startsWith("http://") ||
      text.startsWith("https://") ||
      text.match(/^(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}$/)
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>QR Code Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          {hasPermission === false && (
            <Alert className="mb-4">
              <Camera className="h-4 w-4" />
              <AlertTitle>Camera access required</AlertTitle>
              <AlertDescription>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={requestPermission}
                  className="mt-2"
                >
                  Request Permission
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {hasPermission === true && (
            <div className="relative">
              <div
                className="aspect-square w-full overflow-hidden rounded-lg border"
                ref={scannerContainerRef}
              >
                <div id="qr-reader" className="h-full w-full"></div>
                {!scanning && result && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/90">
                    <div className="text-center p-4 max-w-[90%]">
                      <p className="mb-2 text-muted-foreground">
                        QR code detected!
                      </p>
                      <div className="mb-4 p-4 bg-muted/50 rounded-md">
                        <p className="font-medium break-all">
                          {truncateText(result, 100)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Button onClick={resetScanner}>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Scan Again
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => copyToClipboard(result)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>

                        {isUrl(result) && (
                          <Button
                            variant="outline"
                            onClick={() => openUrl(result)}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {scanning && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="border-2 border-primary w-[70%] h-[70%] rounded-lg animate-pulse opacity-50"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant={scanning ? "destructive" : "default"}
            onClick={() => setScanning(!scanning)}
            disabled={!hasPermission}
          >
            {scanning ? "Stop Scanning" : "Start Scanning"}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleCamera}
            disabled={!hasPermission}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
