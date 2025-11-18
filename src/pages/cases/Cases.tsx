import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileText, ChevronRight } from 'lucide-react';

interface IntegratedCase {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  domains: string[];
  scenario: string;
  steps: CaseStep[];
}

interface CaseStep {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  domain: string;
}

const integratedCases: IntegratedCase[] = [
  {
    id: 'case-1',
    title: 'Clinical Trial Ethics and Biostatistics',
    difficulty: 'intermediate',
    domains: ['Ethics', 'Statistics', 'Study Design'],
    scenario:
      'You are reviewing a proposed RCT comparing a new chemotherapy regimen to standard treatment for advanced lung cancer. The study plans to enroll 200 patients. The preliminary data shows the new treatment has a relative risk reduction of 30% (HR=0.7, 95% CI: 0.5-0.9, p=0.01) for mortality at 1 year. However, 15% of patients in the new treatment arm experienced severe neutropenia vs 5% in the control arm.',
    steps: [
      {
        question:
          'What is the correct interpretation of the 95% confidence interval (0.5-0.9)?',
        options: [
          'We are 95% certain the true hazard ratio is between 0.5 and 0.9',
          'There is a 95% chance the new treatment is better',
          '95% of patients will have HR between 0.5 and 0.9',
          'The p-value is less than 0.05',
        ],
        correctAnswer: 0,
        explanation:
          'A 95% CI means that if we repeated this study many times, 95% of the confidence intervals would contain the true population parameter. Since the CI excludes 1.0 (no effect), the result is statistically significant at p<0.05. This does NOT mean there\'s a 95% probability the treatment works—the treatment either works or doesn\'t; we\'re uncertain about the magnitude.',
        domain: 'Statistics',
      },
      {
        question:
          'A patient asks if they should enroll in this trial. They have advanced disease but are concerned about side effects. What is the most appropriate ethical response?',
        options: [
          'Recommend enrollment because the treatment shows statistical benefit',
          'Recommend against enrollment due to higher toxicity',
          'Provide balanced information about risks/benefits and support their autonomous decision',
          'Defer the decision to the oncologist',
        ],
        correctAnswer: 2,
        explanation:
          'Informed consent requires providing complete, balanced information without coercion. The patient must understand both the potential benefit (30% relative risk reduction in mortality) and the harm (3-fold higher severe neutropenia rate). They should also understand they might be randomized to either arm. The decision must be the patient\'s, based on their own values—this is respect for autonomy. Simply recommending one way or another violates this principle.',
        domain: 'Ethics',
      },
      {
        question:
          'During the trial, one patient in the experimental arm dies from sepsis related to neutropenia. The investigator believes it was related to the study drug. What should happen?',
        options: [
          'Continue the trial, as one death is not significant',
          'Report to IRB and Data Safety Monitoring Board immediately',
          'Wait until the trial ends to analyze all deaths together',
          'Remove this patient from the analysis',
        ],
        correctAnswer: 1,
        explanation:
          'Any serious adverse event, especially a death potentially related to the study intervention, must be reported immediately to the IRB and DSMB (if one exists). They will determine if the trial should continue, be modified, or be stopped. This is both an ethical obligation (participant safety) and a regulatory requirement. Continuing without reporting would be research misconduct.',
        domain: 'Ethics',
      },
    ],
  },
  {
    id: 'case-2',
    title: 'Screening Program Evaluation',
    difficulty: 'advanced',
    domains: ['Statistics', 'Public Health'],
    scenario:
      'A new screening test for pancreatic cancer is being evaluated. The test has sensitivity of 80% and specificity of 90%. The prevalence of pancreatic cancer in the screened population (high-risk individuals) is 2%. A positive test is followed by a confirmatory biopsy.',
    steps: [
      {
        question:
          'In a population of 10,000 high-risk individuals, how many will have a false positive result?',
        options: ['180', '800', '980', '1,960'],
        correctAnswer: 2,
        explanation:
          'With 2% prevalence, 200 have disease and 9,800 don\'t. With 90% specificity, 10% of the 9,800 healthy individuals will test positive. 10% × 9,800 = 980 false positives. This demonstrates why screening low-prevalence conditions leads to many false positives even with good specificity.',
        domain: 'Statistics',
      },
      {
        question:
          'What is the positive predictive value (PPV) of this test?',
        options: ['14%', '80%', '90%', '98%'],
        correctAnswer: 0,
        explanation:
          'PPV = TP / (TP + FP). True positives: 80% of 200 = 160. False positives: 980 (from previous question). PPV = 160 / (160 + 980) = 160 / 1,140 = 14%. This means that only 14% of positive tests are true positives. The other 86% will undergo unnecessary biopsies. This illustrates the challenge of screening for rare diseases.',
        domain: 'Statistics',
      },
      {
        question:
          'Given the low PPV, what is a potential concern about implementing this screening program?',
        options: [
          'Too many cases will be missed',
          'Too many false positives leading to unnecessary biopsies and patient anxiety',
          'The test is not sensitive enough',
          'The test is not specific enough',
        ],
        correctAnswer: 1,
        explanation:
          'The main concern is the large number of false positives (980 out of 10,000 screened, or nearly 10%). Each false positive may undergo confirmatory biopsy (invasive, with risks), experience significant anxiety, and incur costs. The test itself has reasonable Sn/Sp, but the low prevalence makes PPV poor. This is why screening programs must carefully balance benefits (early detection) with harms (false positives, overdiagnosis).',
        domain: 'Public Health',
      },
    ],
  },
];

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState<IntegratedCase | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelectCase = (caseItem: IntegratedCase) => {
    setSelectedCase(caseItem);
    setCurrentStep(0);
    setSelectedAnswers(new Array(caseItem.steps.length).fill(null));
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (selectedCase && currentStep < selectedCase.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowExplanation(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowExplanation(!!selectedAnswers[currentStep - 1]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (!selectedCase) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FileText className="h-8 w-8 text-orange-500" />
            Integrated Case Studies
          </h1>
          <p className="text-muted-foreground">
            Apply knowledge across multiple domains to solve complex clinical scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {integratedCases.map((caseItem) => (
            <Card
              key={caseItem.id}
              className="hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => handleSelectCase(caseItem)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{caseItem.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {caseItem.scenario.slice(0, 150)}...
                    </CardDescription>
                  </div>
                  <Badge variant={getDifficultyColor(caseItem.difficulty)}>
                    {caseItem.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseItem.domains.map((domain) => (
                    <Badge key={domain} variant="outline">
                      {domain}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full group">
                  Start Case
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const currentStepData = selectedCase.steps[currentStep];
  const currentAnswer = selectedAnswers[currentStep];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Button variant="ghost" onClick={() => setSelectedCase(null)} className="mb-4">
          ← Back to Cases
        </Button>
        <h1 className="text-3xl font-bold mb-2">{selectedCase.title}</h1>
        <div className="flex gap-2 items-center">
          <Badge variant={getDifficultyColor(selectedCase.difficulty)}>
            {selectedCase.difficulty}
          </Badge>
          {selectedCase.domains.map((domain) => (
            <Badge key={domain} variant="outline">
              {domain}
            </Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clinical Scenario</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{selectedCase.scenario}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Question {currentStep + 1} of {selectedCase.steps.length}
          </CardTitle>
          <CardDescription>
            <Badge variant="outline">{currentStepData.domain}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="font-medium">{currentStepData.question}</p>

          <div className="space-y-2">
            {currentStepData.options.map((option, index) => {
              const isSelected = currentAnswer === index;
              const isCorrect = index === currentStepData.correctAnswer;
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
                    <span className="text-sm">{option}</span>
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
              <p className="text-sm">{currentStepData.explanation}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Progress: {currentStep + 1} / {selectedCase.steps.length}
            </div>
            {currentStep < selectedCase.steps.length - 1 ? (
              <Button onClick={handleNext} disabled={!showExplanation}>
                Next Question
              </Button>
            ) : (
              <Button onClick={() => setSelectedCase(null)} variant="default">
                Complete Case
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cases;
