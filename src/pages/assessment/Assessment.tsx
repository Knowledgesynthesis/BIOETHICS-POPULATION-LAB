import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { BookOpen, Award, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question:
      'A test has a sensitivity of 95% and specificity of 90%. In a population where disease prevalence is 50%, what is the approximate PPV?',
    options: ['50%', '90%', '95%', '97%'],
    correctAnswer: 2,
    explanation:
      'With 50% prevalence, in 1000 people: 500 diseased, 500 healthy. TP = 0.95 × 500 = 475. FP = 0.10 × 500 = 50. PPV = 475/(475+50) = 475/525 ≈ 90.5%, closest to 95%. Note how high prevalence increases PPV.',
    category: 'Statistics',
  },
  {
    id: 'q2',
    question:
      'A cohort study finds that smokers have a relative risk of 10.0 for developing lung cancer compared to non-smokers. What does this mean?',
    options: [
      'Smokers are 10% more likely to get lung cancer',
      'Smoking causes 10 cases of lung cancer per 100 smokers',
      'Smokers are 10 times more likely to get lung cancer',
      'Smoking increases lung cancer risk by 10 years',
    ],
    correctAnswer: 2,
    explanation:
      'Relative risk (RR) = incidence in exposed / incidence in unexposed. RR = 10 means the incidence of lung cancer in smokers is 10 times that in non-smokers. This is a measure of association strength.',
    category: 'Statistics',
  },
  {
    id: 'q3',
    question:
      'A patient with decision-making capacity refuses a blood transfusion for religious reasons despite life-threatening anemia. What should you do?',
    options: [
      'Transfuse anyway to save their life (beneficence)',
      'Seek a court order to override their refusal',
      'Respect their autonomous refusal',
      'Obtain consent from their family',
    ],
    correctAnswer: 2,
    explanation:
      'An adult with decision-making capacity has the right to refuse any treatment, even life-saving treatment, based on their personal beliefs. Autonomy generally trumps beneficence in such cases. Forcing treatment would be battery.',
    category: 'Ethics',
  },
  {
    id: 'q4',
    question:
      'Under HIPAA, which of the following disclosures requires patient authorization?',
    options: [
      'Sharing information with another physician for treatment',
      'Billing insurance for services',
      'Sending patient information to a marketing company',
      'Reporting tuberculosis to public health',
    ],
    correctAnswer: 2,
    explanation:
      'Treatment, payment, and healthcare operations (TPO) do not require authorization. Public health reporting is an exception. However, marketing requires specific authorization unless it involves refill reminders or generic health information.',
    category: 'HIPAA',
  },
  {
    id: 'q5',
    question:
      'A medication error occurs because a nurse misread a handwritten order. What type of error is the nurse\'s misreading?',
    options: [
      'Active error',
      'Latent error',
      'Sentinel event',
      'Near miss',
    ],
    correctAnswer: 0,
    explanation:
      'The nurse\'s misreading is an active error (human error at the point of contact). However, the handwritten order system is a latent error (system defect). Effective prevention addresses the latent error (e.g., implement CPOE).',
    category: 'Safety',
  },
  {
    id: 'q6',
    question:
      'What is the herd immunity threshold for a disease with R₀ = 5?',
    options: ['50%', '60%', '75%', '80%'],
    correctAnswer: 3,
    explanation:
      'Herd immunity threshold = 1 - (1/R₀) = 1 - (1/5) = 1 - 0.2 = 0.8 = 80%. This means 80% of the population needs to be immune to prevent sustained transmission.',
    category: 'Public Health',
  },
  {
    id: 'q7',
    question:
      'In a case-control study, what measure of association is typically calculated?',
    options: [
      'Relative risk',
      'Odds ratio',
      'Hazard ratio',
      'Incidence rate',
    ],
    correctAnswer: 1,
    explanation:
      'Case-control studies calculate odds ratios because they start with cases and controls (not exposed and unexposed), so you cannot calculate true incidence or relative risk. Cohort studies calculate RR or HR.',
    category: 'Study Design',
  },
  {
    id: 'q8',
    question:
      'Screening mammography detects a slow-growing breast cancer that would never have caused symptoms in the patient\'s lifetime. This is an example of:',
    options: [
      'Lead-time bias',
      'Length-time bias',
      'Overdiagnosis',
      'Selection bias',
    ],
    correctAnswer: 2,
    explanation:
      'Overdiagnosis occurs when screening detects "disease" that would never have caused harm. This is a significant concern with screening programs and represents a harm (unnecessary treatment, anxiety) without benefit.',
    category: 'Public Health',
  },
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const updateProgress = useAppStore((state) => state.updateProgress);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
      setShowExplanation(userAnswers[currentQuestion + 1] !== null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
      setShowExplanation(userAnswers[currentQuestion - 1] !== null);
    }
  };

  const handleSubmit = () => {
    const score = userAnswers.reduce<number>((acc, answer, idx) => {
      return answer === quizQuestions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);
    const percentage = Math.round((score / quizQuestions.length) * 100);
    updateProgress('assessment', percentage);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers(new Array(quizQuestions.length).fill(null));
    setShowResults(false);
    setShowExplanation(false);
  };

  const score = userAnswers.reduce<number>((acc, answer, idx) => {
    return answer === quizQuestions[idx].correctAnswer ? acc + 1 : acc;
  }, 0);
  const percentage = (score / quizQuestions.length) * 100;

  if (showResults) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Award className="h-8 w-8 text-yellow-500" />
            Assessment Results
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">{percentage.toFixed(0)}%</div>
              <p className="text-lg text-muted-foreground">
                {score} out of {quizQuestions.length} correct
              </p>
            </div>

            <Progress value={percentage} className="h-4" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {score}
                    </div>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">
                      {quizQuestions.length - score}
                    </div>
                    <p className="text-sm text-muted-foreground">Incorrect</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {percentage >= 80 ? 'Pass' : 'Review'}
                    </div>
                    <p className="text-sm text-muted-foreground">Status</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Performance by Category</h3>
              {Array.from(new Set(quizQuestions.map((q) => q.category))).map((category) => {
                const categoryQuestions = quizQuestions.filter((q) => q.category === category);
                const categoryScore = categoryQuestions.reduce<number>((acc, q) => {
                  const globalIdx = quizQuestions.findIndex((question) => question.id === q.id);
                  return userAnswers[globalIdx] === q.correctAnswer ? acc + 1 : acc;
                }, 0);
                const categoryPercentage = (categoryScore / categoryQuestions.length) * 100;

                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="font-mono">
                        {categoryScore}/{categoryQuestions.length}
                      </span>
                    </div>
                    <Progress value={categoryPercentage} className="h-2" />
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleRestart} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quizQuestions.map((question, idx) => {
              const userAnswer = userAnswers[idx] ?? 0;
              const isCorrect = userAnswers[idx] === question.correctAnswer;

              return (
                <div key={question.id} className="p-4 bg-muted rounded-md space-y-2">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-sm">
                      {idx + 1}. {question.question}
                    </p>
                    {isCorrect ? (
                      <Badge variant="success">Correct</Badge>
                    ) : (
                      <Badge variant="destructive">Incorrect</Badge>
                    )}
                  </div>
                  <p className="text-sm">
                    <strong>Your answer:</strong> {question.options[userAnswer]}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                    </p>
                  )}
                  <details className="text-sm">
                    <summary className="cursor-pointer font-medium">Explanation</summary>
                    <p className="mt-2 text-muted-foreground">{question.explanation}</p>
                  </details>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const progressPercentage = (answeredCount / quizQuestions.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-pink-500" />
          Knowledge Assessment
        </h1>
        <p className="text-muted-foreground">
          Test your understanding across all modules
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </CardTitle>
            <Badge variant="outline">{question.category}</Badge>
          </div>
          <CardDescription>
            <Progress value={progressPercentage} className="mt-2" showLabel />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-medium">{question.question}</p>

          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-md border transition-all ${
                    !showResult
                      ? 'hover:border-primary hover:bg-primary/5'
                      : isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : isSelected
                      ? 'border-red-500 bg-red-500/10'
                      : 'opacity-50'
                  } ${isSelected && !showResult ? 'border-primary bg-primary/10' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && isCorrect && (
                      <Badge variant="success">Correct</Badge>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <Badge variant="destructive">Incorrect</Badge>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md animate-slide-in">
              <h4 className="font-semibold mb-2">Explanation</h4>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            {currentQuestion < quizQuestions.length - 1 ? (
              <Button onClick={handleNext} disabled={!showExplanation}>
                Next Question
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={answeredCount < quizQuestions.length}
                variant="default"
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assessment;
