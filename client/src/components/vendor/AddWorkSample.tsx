import * as React from "react";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { AddWorkSampleHeader } from "./AddWorkSampleHeader";
import { WorkSampleImageModal } from "../modals/WorkSampleImageModal";
import { Spinner } from "../ui/spinner";
import { useWorkSampleMutation } from "@/hooks/work-sample/useWorkSample";
import { createNewWorkSample } from "@/services/vendor/vendorService";
import { toast } from "sonner";

// Replace with your actual Cloudinary cloud name and upload preset
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESET_NAME;

interface UploadedImage {
  public_id: string;
  secure_url: string;
}

export function AddWorkSample() {
  const [uploadedImages, setUploadedImages] = React.useState<UploadedImage[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setUploadingImage(true);
      uploadToCloudinary(acceptedFiles);
    },
  });

  const { mutate: addNewWorkSample } =
    useWorkSampleMutation(createNewWorkSample);

  const uploadToCloudinary = async (filesToUpload: File[]) => {
    const uploadPromises = filesToUpload.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      return fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => ({
          public_id: data.public_id,
          secure_url: data.secure_url,
        }));
    });

    const newUploadedImages = await Promise.all(uploadPromises);
    setUploadedImages((prev) => [...prev, ...newUploadedImages]);
    setUploadingImage(false);
  };

  const removeImage = (publicId: string) => {
    setUploadedImages((prev) =>
      prev.filter((img) => img.public_id !== publicId)
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const images = uploadedImages.map((image) => image.secure_url);
    try {
      addNewWorkSample(
        { title, description, images },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            navigate("/vendor/work-sample");
          },
          onError: (error: any) => toast.error(error.response.data.message),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
      setTitle("");
      setDescription("");
      setUploadedImages([]);
    }
  }

  return (
    <div className="space-y-4 p-4">
      <AddWorkSampleHeader />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder="Wedding Photography - Beach Theme"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description of your event sample, including special features or unique aspects."
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Images</Label>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8
              text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Select a file or drag and drop here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (JPG, PNG or GIF, max 5 files)
            </p>
          </div>
          {uploadingImage && <Spinner />}
          {uploadedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {uploadedImages.map((image) => (
                <div key={image.public_id} className="relative group">
                  <img
                    src={image.secure_url || "/placeholder.svg"}
                    alt="Uploaded preview"
                    className="w-full h-24 object-cover rounded-lg"
                    onClick={() => setSelectedImage(image.secure_url)}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.public_id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/vendor/work-sample")}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Adding Sample..." : "Add Sample"}
          </Button>
        </div>
      </form>
      {selectedImage && (
        <WorkSampleImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
