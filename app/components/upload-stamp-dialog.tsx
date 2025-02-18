"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tag, Upload, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface UploadStampDialogProps {
  onUpload: (stampData: any) => void
}

export function UploadStampDialog({ onUpload }: UploadStampDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    condition: "",
    category: "",
    description: "",
    image: null as File | null,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      // In a real app, you would upload the image to a storage service first
      const mockImageUrl = imagePreview // Replace with actual image upload

      const stampData = {
        name: formData.name,
        price: formData.price,
        condition: formData.condition,
        category: formData.category,
        description: formData.description,
        image: mockImageUrl,
        seller: "John Doe", // Get from auth context in real app
        sellerRating: 5.0,
      }

      const response = await fetch('/api/stamps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stampData),
      });

      if (!response.ok) {
        throw new Error('Failed to create stamp');
      }

      const data = await response.json();
      onUpload(data.stamp);
      setIsOpen(false);
      setFormData({
        name: "",
        price: "",
        condition: "",
        category: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error uploading stamp:", error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Tag className="h-4 w-4" />
          List Your Stamps
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>List a New Stamp</DialogTitle>
          <DialogDescription>
            Upload your stamp details. All listings are protected by NPDA.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Stamp Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="stamp-image"
                onChange={handleImageChange}
              />
              <Label htmlFor="stamp-image" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-[200px] rounded-lg"
                    />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload stamp image
                      </span>
                    </>
                  )}
                </div>
              </Label>
            </div>
          </div>

          {/* Stamp Details */}
          <div className="space-y-2">
            <Label htmlFor="name">Stamp Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => setFormData({ ...formData, condition: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mint">Mint</SelectItem>
                  <SelectItem value="Fine Used">Fine Used</SelectItem>
                  <SelectItem value="Very Fine">Very Fine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Historical">Historical</SelectItem>
                <SelectItem value="Rare">Rare</SelectItem>
                <SelectItem value="Aviation">Aviation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your stamp's details, history, and condition..."
            />
          </div>

          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "List Stamp"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 