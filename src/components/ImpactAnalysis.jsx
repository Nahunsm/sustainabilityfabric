import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check } from 'lucide-react';

// StepsTracker Component (from previous version)

// New Components from Reference
const GradePill = ({ grade, isSelected }) => (
  <div className={`
    w-8 h-8 rounded-full flex items-center justify-center font-semibold
    ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}
    transition-colors
  `}>
    {grade}
  </div>
);

const GradesRow = ({ category, selectedGrade }) => (
  <div className="flex items-center justify-between py-3 border-b">
    <span className="font-medium">{category}</span>
    <div className="flex gap-2">
      {['A', 'B', 'C', 'D'].map(grade => (
        <GradePill key={grade} grade={grade} isSelected={grade === selectedGrade} />
      ))}
    </div>
  </div>
);

const ImpactBar = ({ label, percentage }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full">
      <div 
        className="h-full bg-blue-900 rounded-full" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

// MetricCard from previous version
const MetricCard = ({ emoji, title, value, progress, impact, tooltip }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{emoji}</span>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <Badge variant={
          impact === 'High' ? 'destructive' : 
          impact === 'Medium' ? 'warning' : 
          'secondary'
        }>{impact} Impact</Badge>
      </div>
      <Progress value={progress} className="mb-2" />
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{value}</p>
        {tooltip && (
          <span className="text-xs text-muted-foreground">{tooltip}</span>
        )}
      </div>
    </CardContent>
  </Card>
);

const ImpactAnalysis = ({ onNext }) => {
  return (
    <div className="container mx-auto p-6">

      {/* Overall Score and Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Score Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Impact Analysis Results (Powered by BCome)</CardTitle>
            <CardDescription>Cotton T-Shirt with Mixed Materials</CardDescription>
            <div className="mt-4 flex flex-col items-center">
              <span className="text-6xl font-bold text-orange-500">C+</span>
              <p className="text-sm text-muted-foreground mt-2">Environmental Impact Score</p>
              <div className="flex items-center space-x-2 mt-4">
                <Badge variant="outline">Industry Average: B-</Badge>
                <Badge variant="destructive">Below Average</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Grades Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sustainability Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <GradesRow category="Planet" selectedGrade="B" />
            <GradesRow category="People" selectedGrade="A" />
            <GradesRow category="Circularity" selectedGrade="D" />
            <GradesRow category="Transparency" selectedGrade="A" />
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Impact Bars */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImpactBar label="Water scarcity" percentage={30} />
            <ImpactBar label="Global warming" percentage={80} />
            <ImpactBar label="Eutrophication" percentage={60} />
            <ImpactBar label="Abiotic depletion" percentage={50} />
          </CardContent>
        </Card>

        {/* Material Composition */}
        <Card>
          <CardHeader>
            <CardTitle>Material Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                {/* Donut chart visualization would go here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">🌱</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-700" />
                <span>Virgin (40%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-pink-300" />
                <span>Recycled (25%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-300" />
                <span>Organic (20%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <span>Others (15%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricCard 
          emoji="💧"
          title="Water Usage"
          value="2,700 liters per item"
          progress={75}
          impact="High"
          tooltip="30% above industry average"
        />
        <MetricCard 
          emoji="🌱"
          title="CO2 Emissions"
          value="5.3 kg CO2 equivalent"
          progress={45}
          impact="Medium"
          tooltip="15% above industry average"
        />
        <MetricCard 
          emoji="♻️"
          title="Recyclability"
          value="85% recyclable materials"
          progress={85}
          impact="Low"
          tooltip="Good recyclability rate"
        />
      </div>

      {/* Production Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricCard 
          emoji="🌳"
          title="Resource Depletion"
          value="3.2 resource depletion units"
          progress={65}
          impact="Medium"
          tooltip="Consider sustainable alternatives"
        />
        <MetricCard 
          emoji="🏭"
          title="Production Efficiency"
          value="72% material utilization"
          progress={72}
          impact="Medium"
          tooltip="Room for optimization"
        />
        <MetricCard 
          emoji="⏱️"
          title="Lifecycle Duration"
          value="Est. 2.5 years"
          progress={60}
          impact="Medium"
          tooltip="Improve durability needed"
        />
      </div>

      {/* Material Reuse Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl">✂️</span>
              <h3 className="font-semibold">Material Waste Analysis</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Cutting Waste</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <Progress value={15} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Reusable Material</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Potential Savings</span>
                <span className="text-sm font-medium">$2.30/unit</span>
              </div>
              <Progress value={65} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Issues */}
      <Card className="bg-red-50 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold text-red-700">Critical Areas for Improvement</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-sm space-y-2 text-red-600">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                High water consumption in production
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Non-sustainable dyeing process
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Mixed materials affect recyclability
              </li>
            </ul>
            <ul className="text-sm space-y-2 text-red-600">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Material waste in cutting process
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Limited end-of-life options
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Above-average carbon footprint
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Export Report</Button>
        <Button onClick={onNext}>View Recommendations</Button>
      </div>
    </div>
  );
};

export default ImpactAnalysis;