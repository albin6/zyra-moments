import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function WorkSampleImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-3xl w-full">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt="Large preview"
          className="w-full h-auto rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
