'use client';

import { useState } from 'react';
import Hero from './components/Hero';
import OnboardingFlow from './components/OnboardingFlow';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <main className="w-full min-h-screen">
      <div className="container mx-auto">
        {showOnboarding ? (
          <OnboardingFlow />
        ) : (
          <Hero onGetStarted={() => setShowOnboarding(true)} />
        )}
      </div>
    </main>
  );
}
