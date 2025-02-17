import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, X, Trash, Upload, Loader2, AlertCircle } from "lucide-react";
import { uploadToCloudinary } from "@/utils/upload-cloudinary/cloudinary";
import { useWorkSampleMutation } from "@/hooks/work-sample/useWorkSample";
import { updateWorkSampleById } from "@/services/vendor/vendorService";
import { toast } from "sonner";

interface IWorkSampleEntity {
  _id?: any;
  title: string;
  description: string;
  images: string[];
}

export function WorkSampleDisplay({
  workSample,
}: {
  workSample: IWorkSampleEntity;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedSample, setEditedSample] =
    useState<IWorkSampleEntity>(workSample);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGES = 5;

  const { mutate: updateWordSample } =
    useWorkSampleMutation(updateWorkSampleById);

  const handleEdit = () => {
    console.log("Saving edited work sample:", editedSample);
    updateWordSample(
      { id: workSample._id, data: editedSample },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
    setIsModalOpen(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...editedSample.images];
    updatedImages.splice(index, 1);
    setEditedSample({ ...editedSample, images: updatedImages });
    setError(null);
  };

  const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (editedSample.images.length >= MAX_IMAGES) {
        setError(`Maximum of ${MAX_IMAGES} images allowed`);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setUploading(true);
      setError(null);

      try {
        const file = event.target.files[0];
        const imageUrl = await uploadToCloudinary(file);
        setEditedSample({
          ...editedSample,
          images: [...editedSample.images, imageUrl],
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{workSample.title}</CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{workSample.description}</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {workSample.images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={image || "/placeholder.svg"}
                alt={`Work sample image ${index + 1}`}
                className="rounded-md object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </CardContent>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Edit Work Sample</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editedSample.title}
                  onChange={(e) =>
                    setEditedSample({ ...editedSample, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedSample.description}
                  onChange={(e) =>
                    setEditedSample({
                      ...editedSample,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Images</Label>
                  <span className="text-sm text-muted-foreground">
                    {editedSample.images.length}/{MAX_IMAGES} images
                  </span>
                </div>
                {error && (
                  <div className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 p-2 rounded-md flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {editedSample.images.map((image, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Work sample image ${index + 1}`}
                        className="rounded-md object-cover w-full h-full"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {editedSample.images.length < MAX_IMAGES && (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center aspect-square">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleAddImage}
                      />
                      <Button
                        variant="ghost"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-full h-full flex flex-col items-center justify-center"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin mb-2" />
                            <span className="text-sm">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-6 w-6 mb-2" />
                            <span className="text-sm">Add image</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEdit} disabled={uploading}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
