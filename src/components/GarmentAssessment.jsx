import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Shirt,
  AlertCircle,
  Plus,
  Upload,
  ZoomIn,
  ZoomOut,
  Trash2,
} from "lucide-react";

const GarmentAssessment = ({ onNext }) => {
  const [materials, setMaterials] = useState([
    { material: "", percentage: "" },
  ]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [designFile, setDesignFile] = useState(null);

  const handleAddMaterial = () => {
    setMaterials([...materials, { material: "", percentage: "" }]);
  };

  const handleRemoveMaterial = (index) => {
    const newMaterials = materials.filter((_, i) => i !== index);
    setMaterials(newMaterials);
  };

  const handleZoom = (direction) => {
    setZoomLevel((prev) => (direction === "in" ? prev * 1.2 : prev / 1.2));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div>
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shirt className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Garment Details</CardTitle>
                  <CardDescription>
                    Enter specifications and upload design
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  All fields are required for accurate impact calculation
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="garment-type">Garment Type</Label>
                  <Select>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select garment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shirt">Shirt</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="dress">Dress</SelectItem>
                      <SelectItem value="jacket">Jacket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {materials.map((material, index) => (
                    <div key={index} className="flex items-end space-x-2">
                      <div className="flex-grow">
                        <Label>Material {index + 1}</Label>
                        <div className="flex space-x-2">
                          <Select className="w-2/3">
                            <SelectTrigger>
                              <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cotton">Cotton</SelectItem>
                              <SelectItem value="organic-cotton">
                                Organic Cotton
                              </SelectItem>
                              <SelectItem value="polyester">
                                Polyester
                              </SelectItem>
                              <SelectItem value="recycled-polyester">
                                Recycled Polyester
                              </SelectItem>
                              <SelectItem value="wool">Wool</SelectItem>
                              <SelectItem value="linen">Linen</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            placeholder="%"
                            className="w-1/3"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMaterial(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddMaterial}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Material
                </Button>

                <div className="space-y-2">
                  <Label>Design File (SVG)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept=".svg"
                      onChange={(e) => setDesignFile(e.target.files[0])}
                      className="flex-grow"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Historical Records Card */}
                <Card className="mt-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Historical Records
                      </CardTitle>
                      <Badge variant="secondary">{5} designs</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          name: "Summer Cotton Shirt",
                          date: "2024-03-15",
                          materials: ["Cotton", "Elastane"],
                        },
                        {
                          id: 2,
                          name: "Recycled Denim Jacket",
                          date: "2024-03-10",
                          materials: ["Recycled Cotton", "Polyester"],
                        },
                        {
                          id: 3,
                          name: "Organic Linen Dress",
                          date: "2024-03-05",
                          materials: ["Organic Linen"],
                        },
                      ].map((record) => (
                        <div
                          key={record.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/10 transition-colors"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{record.name}</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">
                                {new Date(record.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                •
                              </span>
                              <div className="flex gap-1">
                                {record.materials.map((material, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {material}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-4">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Design Preview Section */}
        <div>
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Design Preview</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleZoom("in")}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleZoom("out")}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed rounded-lg h-96 flex items-center justify-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {designFile ? (
                  <img
                    src={URL.createObjectURL(designFile)}
                    alt="Design Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Upload className="h-12 w-12 mx-auto mb-2" />
                    <p>Upload an SVG file to preview design</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button variant="outline">Save Draft</Button>
        <Button onClick={onNext}>Analyze Impact</Button>
      </div>
    </div>
  );
};

export default GarmentAssessment;
