
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Check, ChevronRight } from 'lucide-react';

// Separate dialog content component
const RecommendationDialog = ({ recommendation }) => (
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>{recommendation.title}</DialogTitle>
    </DialogHeader>
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline">{recommendation.impact}</Badge>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="text-sm">⏱️</span>
          <span className="ml-2">{recommendation.timeframe}</span>
        </div>
      </div>
      <p>{recommendation.description}</p>
      {recommendation.details && (
        <div className="space-y-2 mt-4">
          <h4 className="font-semibold">Implementation Details:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {recommendation.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </DialogContent>
);

// Separate card component with distinct click handlers
const RecommendationCard = ({ recommendation, isSelected, onSelect, onOpenDialog }) => (
  <Card className={`hover:border-primary transition-all ${isSelected ? 'border-primary bg-primary/5' : ''}`}>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-2">
          <input 
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect(recommendation.id);
            }}
            className="mt-1"
          />
          <div 
            className="flex-grow cursor-pointer"
            onClick={() => onOpenDialog(recommendation)}
          >
            <h3 className="font-semibold">{recommendation.title}</h3>
          </div>
        </div>
        <Badge variant="outline" className="ml-2">
          {recommendation.impact}
        </Badge>
      </div>
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <span className="text-sm">⏱️</span>
        <span className="ml-2">{recommendation.timeframe}</span>
      </div>
      <p className="text-sm text-muted-foreground">{recommendation.description}</p>
    </CardContent>
  </Card>
);

const Recommendations = () => {
  const [currentRating, setCurrentRating] = useState('C+');
  const [simulatedRating, setSimulatedRating] = useState(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);
  const [showSimulation, setShowSimulation] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState(null);

  const immediateActions = [
    {
      id: 1,
      title: "Switch to Organic Cotton",
      impact: "High Impact",
      timeframe: "2-3 weeks",
      description: "Replace conventional cotton with certified organic cotton to reduce water consumption and chemical usage.",
      details: [
        "Source from certified organic cotton suppliers",
        "Update material specifications in design system",
        "Adjust costing and pricing models",
        "Update product labeling and marketing materials"
      ]
    },
    {
      id: 2,
      title: "Material Reuse Program",
      impact: "Medium Impact",
      timeframe: "2-4 weeks",
      description: "Implement a system to collect and reuse fabric cut material for smaller garment components or accessories.",
      details: [
        "Set up material collection bins",
        "Create inventory system for leftover materials",
        "Design templates for utilizing smaller fabric pieces",
        "Train staff on material sorting and storage"
      ]
    },
    {
      id: 3,
      title: "Optimize Dyeing Process",
      impact: "High Impact",
      timeframe: "1-3 months",
      description: "Switch to low-impact dyeing methods and optimize the process to reduce water and energy consumption.",
      details: [
        "Evaluate current dyeing process efficiency",
        "Research and test low-impact dye alternatives",
        "Implement water recycling systems",
        "Monitor and adjust process parameters"
      ]
    }
  ];

  const handleRecommendationSelect = (id) => {
    setSelectedRecommendations(prev => 
      prev.includes(id) 
        ? prev.filter(recId => recId !== id)
        : [...prev, id]
    );
  };

  const handleOpenDialog = (recommendation) => {
    setSelectedDialog(recommendation);
  };

  const handleCloseDialog = () => {
    setSelectedDialog(null);
  };

  const handleSimulate = () => {
    const improvements = {
      waterSavings: selectedRecommendations.length * 10,
      co2Reduction: selectedRecommendations.length * 0.8,
      recyclabilityImprovement: selectedRecommendations.length * 12
    };
    
    const ratings = ['C+', 'B-', 'B', 'B+', 'A-', 'A'];
    const currentIndex = ratings.indexOf(currentRating);
    const newIndex = Math.min(ratings.length - 1, currentIndex + selectedRecommendations.length);
    setSimulatedRating(ratings[newIndex]);
    setShowSimulation(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Recommended Solutions</h1>
          <p className="text-muted-foreground">Based on your garment's impact analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current Rating</p>
            <span className="text-2xl font-bold text-orange-500">{currentRating}</span>
          </div>
          {simulatedRating && (
            <>
              <ChevronRight className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Simulated Rating</p>
                <span className="text-2xl font-bold text-green-500">{simulatedRating}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="immediate" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="immediate">Immediate Actions</TabsTrigger>
          <TabsTrigger value="short">Short Term</TabsTrigger>
          <TabsTrigger value="long">Long Term</TabsTrigger>
        </TabsList>

        <TabsContent value="immediate">
          <div className="space-y-4">
            {immediateActions.map(recommendation => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                isSelected={selectedRecommendations.includes(recommendation.id)}
                onSelect={handleRecommendationSelect}
                onOpenDialog={handleOpenDialog}
              />
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleSimulate}
              disabled={selectedRecommendations.length === 0}
            >
              Simulate Selected Improvements
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="short">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Short-term recommendations will be generated based on the results of immediate actions.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="long">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Long-term recommendations will be customized based on your implementation progress.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Simulation Results */}
      {showSimulation && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl">💧</span>
                <div>
                  <p className="text-sm font-medium">Potential Water Savings</p>
                  <p className="text-2xl font-bold">{selectedRecommendations.length * 15}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏭</span>
                <div>
                  <p className="text-sm font-medium">CO₂ Reduction</p>
                  <p className="text-2xl font-bold">{selectedRecommendations.length * 0.8} tons</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl">♻️</span>
                <div>
                  <p className="text-sm font-medium">Recyclability Improvement</p>
                  <p className="text-2xl font-bold">+{selectedRecommendations.length * 12}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dialog for recommendation details */}
      <Dialog open={!!selectedDialog} onOpenChange={() => handleCloseDialog()}>
        {selectedDialog && <RecommendationDialog recommendation={selectedDialog} />}
      </Dialog>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Save as Draft</Button>
        <Button className="flex items-center">
          Generate Action Plan
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Recommendations;