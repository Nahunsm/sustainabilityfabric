import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Image from 'next/image';

// Import your components
import GarmentAssessment from '@/components/GarmentAssessment';
import ImpactAnalysis from '@/components/ImpactAnalysis';
import Recommendations from '@/components/Recommendations';

const StepsTracker = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, title: 'Design Input', emoji: '✂️' },
    { id: 2, title: 'Impact Analysis', emoji: '📊' },
    { id: 3, title: 'Recommendations', emoji: '💡' }
  ];

  const safeStep = Math.max(1, Math.min(currentStep, steps.length));

  return (
    <div className="w-full mb-8">
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div className={`flex flex-col items-center ${safeStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2
                  ${safeStep > step.id ? 'bg-primary border-primary' : 
                    safeStep === step.id ? 'border-primary' : 'border-muted'}
                `}>
                  {safeStep > step.id ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className="text-lg">{step.emoji}</span>
                  )}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 mx-2 ${safeStep > step.id + 1 ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex md:hidden items-center justify-center bg-background py-2">
        <span className="text-sm font-medium">
          Step {safeStep} of {steps.length}: {steps[safeStep - 1].title}
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  // Function to render the current component based on step
  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return <GarmentAssessment onNext={() => setCurrentStep(2)} />;
      case 2:
        return <ImpactAnalysis onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />;
      case 3:
        return <Recommendations onBack={() => setCurrentStep(2)} />;
      default:
        return <GarmentAssessment onNext={() => setCurrentStep(2)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo Space */}
              <div className="w-40 h-10 flex items-center">
                <Image src="/mango-logo.png" alt="Logo" width={100} height={100} />
              </div>
            </div>

            {/* Optional: Right side header content */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Garment Assessment Platform</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Steps Counter */}
        <div className="mb-8">
          <StepsTracker currentStep={currentStep} />
        </div>

        {/* Component Container */}
        <Card className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            {renderComponent()}
          </div>
        </Card>
      </main>

      {/* Optional: Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 The Overview Effect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}