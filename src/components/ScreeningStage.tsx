import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@phosphor-icons/react';
import { screeningQuestions, exitMessage } from '@/lib/content';

interface ScreeningStageProps {
  onComplete: () => void;
  onExit: () => void;
}

export function ScreeningStage({ onComplete, onExit }: ScreeningStageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExitMessage, setShowExitMessage] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (!answer) {
      setShowExitMessage(true);
      onExit();
      return;
    }

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < screeningQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (showExitMessage) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-md shadow-2xl border-2">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              תודה על הזמן שלך
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-lg leading-relaxed text-foreground/90">
              {exitMessage}
            </p>
            <Button
              onClick={() => window.parent.postMessage({ type: 'closeSimulator' }, '*')}
              className="w-full shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              סגירה
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = screeningQuestions[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-2">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-6">
              {screeningQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    index < currentQuestion
                      ? 'bg-gradient-to-r from-primary to-accent'
                      : index === currentQuestion
                      ? 'bg-accent animate-pulse'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <CardTitle className="text-xl font-semibold text-center">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button
                onClick={() => handleAnswer(true)}
                className="flex-1 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                size="lg"
              >
                כן
              </Button>
              <Button
                onClick={() => handleAnswer(false)}
                className="flex-1 text-lg shadow-md hover:shadow-lg transition-all duration-300"
                size="lg"
                variant="outline"
              >
                לא
              </Button>
            </div>

            {currentQuestion > 0 && (
              <Button
                onClick={handleBack}
                variant="ghost"
                className="w-full flex items-center justify-center gap-2 hover:bg-muted/50"
              >
                <ArrowRight size={20} />
                <span>חזרה לשאלה הקודמת</span>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
