import * as React from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddWorkSampleProps {
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export function AddWorkSample({ onSubmit, onCancel }: AddWorkSampleProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Wedding Photography - Beach Theme"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
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
          {files.length > 0 && (
            <ul className="text-sm text-muted-foreground mt-2">
              {files.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
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
    </Card>
  );
}
