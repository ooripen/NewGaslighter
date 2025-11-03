import { useState } from 'react';
import { ScreeningStage } from '@/components/ScreeningStage';
import { ChatStage } from '@/components/ChatStage';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import type { AppStage } from '@/lib/types';

function App() {
  const [stage, setStage] = useState<AppStage>('screening');
  const [hasCompletedScreening, setHasCompletedScreening] = useState<boolean>(false);

  const handleScreeningComplete = () => {
    setHasCompletedScreening(true);
    setStage('chat');
  };

  const handleExit = () => {
    setStage('exit');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header showClose={hasCompletedScreening} />

      <main className="pt-16">
        {stage === 'screening' && (
          <ScreeningStage onComplete={handleScreeningComplete} onExit={handleExit} />
        )}
        
        {stage === 'chat' && <ChatStage />}
      </main>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;