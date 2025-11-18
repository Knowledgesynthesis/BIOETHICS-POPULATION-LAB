import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Heart, AlertCircle } from 'lucide-react';

interface EthicsCase {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  principles: string[];
}

const ethicsCases: EthicsCase[] = [
  {
    id: 'capacity-1',
    title: 'Decision-Making Capacity',
    scenario:
      'A 72-year-old man with newly diagnosed lung cancer refuses chemotherapy. He understands his diagnosis, the treatment options, and the consequences of refusing treatment. He states he has lived a full life and prefers quality over quantity of remaining time. His family insists he needs treatment.',
    question: 'What is the most appropriate next step?',
    options: [
      'Honor the patient\'s refusal',
      'Defer to the family\'s wishes',
      'Obtain a psychiatric consultation',
      'Seek a court order for treatment',
    ],
    correctAnswer: 0,
    explanation:
      'The patient demonstrates decision-making capacity: he understands the information, appreciates the consequences, can reason about options, and can communicate a choice. Capacity is decision-specific, not global. Even if his family disagrees, an adult with capacity has the right to refuse treatment. This respects patient autonomy.',
    principles: ['Autonomy', 'Informed Refusal', 'Capacity Assessment'],
  },
  {
    id: 'confidentiality-1',
    title: 'Confidentiality Exception',
    scenario:
      'A 28-year-old patient discloses to you that he has been diagnosed with HIV. He is sexually active with a partner who does not know his status. Despite counseling, he refuses to tell his partner or to practice safe sex.',
    question: 'What should you do?',
    options: [
      'Maintain strict confidentiality',
      'Notify the partner after warning the patient',
      'Report to public health authorities',
      'Refuse to continue care unless he discloses',
    ],
    correctAnswer: 2,
    explanation:
      'This is a justified breach of confidentiality. Most states allow or require physicians to notify public health authorities about certain communicable diseases like HIV, especially when there is a known, identifiable third party at risk. Public health authorities can then contact and counsel the partner. Always warn the patient first, but protecting a known individual from serious harm is an ethical and legal exception to confidentiality.',
    principles: ['Confidentiality Exceptions', 'Duty to Warn', 'Public Health'],
  },
  {
    id: 'surrogate-1',
    title: 'Surrogate Decision-Making',
    scenario:
      'An unconscious 55-year-old woman is brought to the ED after a severe stroke. She has no advance directive. Her husband wants aggressive life-sustaining treatment, but her adult daughter says her mother explicitly stated she would never want to be kept alive on machines.',
    question: 'Who is the appropriate surrogate decision-maker in most states?',
    options: [
      'The husband (spouse)',
      'The daughter (adult child)',
      'A hospital ethics committee',
      'The attending physician',
    ],
    correctAnswer: 0,
    explanation:
      'In most states, the legal hierarchy for surrogate decision-making places the spouse first, followed by adult children. However, the surrogate should make decisions based on substituted judgment (what the patient would have wanted), not their own preferences. The daughter\'s testimony about the patient\'s wishes is important and should be considered, but the legal authority typically rests with the spouse. If there is significant disagreement, an ethics consultation may help.',
    principles: ['Surrogate Hierarchy', 'Substituted Judgment', 'Advance Directives'],
  },
  {
    id: 'consent-1',
    title: 'Informed Consent',
    scenario:
      'A 45-year-old man needs an urgent but non-emergent procedure. You explain the risks, benefits, and alternatives. He signs the consent form but then says, "I don\'t really understand all the medical terms, but you\'re the doctor, so just do what you think is best."',
    question: 'Is valid informed consent present?',
    options: [
      'Yes, he signed the form',
      'No, true understanding is lacking',
      'Yes, he trusts the physician',
      'No, the procedure is too risky',
    ],
    correctAnswer: 1,
    explanation:
      'Valid informed consent requires more than a signature. It requires: (1) disclosure of information in understandable terms, (2) patient comprehension, (3) voluntary decision-making, and (4) decision-making capacity. This patient explicitly states he doesn\'t understand. The physician must re-explain the procedure in simpler terms and verify understanding before proceeding.',
    principles: ['Informed Consent', 'Comprehension', 'Shared Decision-Making'],
  },
];

const ethicsPrinciples = [
  {
    name: 'Autonomy',
    description: 'Respect for patient self-determination and the right to make their own choices.',
    examples: ['Informed consent', 'Informed refusal', 'Advance directives'],
  },
  {
    name: 'Beneficence',
    description: 'Act in the patient\'s best interest and promote their well-being.',
    examples: ['Recommending beneficial treatments', 'Preventive care'],
  },
  {
    name: 'Non-Maleficence',
    description: 'Do no harm. Avoid causing harm to patients.',
    examples: ['Minimize risks', 'Do not provide futile treatment'],
  },
  {
    name: 'Justice',
    description: 'Fair distribution of resources and equal treatment of patients.',
    examples: ['Organ allocation', 'Triage decisions', 'Equitable access to care'],
  },
];

const Ethics = () => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentCase = ethicsCases[currentCaseIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNextCase = () => {
    setCurrentCaseIndex((prev) => (prev + 1) % ethicsCases.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Heart className="h-8 w-8 text-red-500" />
          Ethics Navigator
        </h1>
        <p className="text-muted-foreground">
          Master medical ethics through case-based learning
        </p>
      </div>

      <Tabs defaultValue="cases">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cases">Case Studies</TabsTrigger>
          <TabsTrigger value="principles">Core Principles</TabsTrigger>
          <TabsTrigger value="frameworks">Decision Frameworks</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{currentCase.title}</CardTitle>
                  <CardDescription>
                    Case {currentCaseIndex + 1} of {ethicsCases.length}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {currentCase.principles.map((principle) => (
                    <Badge key={principle} variant="secondary">
                      {principle}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scenario */}
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold mb-2">Scenario</h4>
                <p className="text-sm">{currentCase.scenario}</p>
              </div>

              {/* Question */}
              <div>
                <h4 className="font-semibold mb-3">{currentCase.question}</h4>
                <div className="space-y-2">
                  {currentCase.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentCase.correctAnswer;
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
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md animate-slide-in">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Explanation
                  </h4>
                  <p className="text-sm">{currentCase.explanation}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentCaseIndex((prev) =>
                      prev === 0 ? ethicsCases.length - 1 : prev - 1
                    );
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                >
                  Previous Case
                </Button>
                <Button onClick={handleNextCase}>Next Case</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="principles" className="space-y-4">
          {ethicsPrinciples.map((principle) => (
            <Card key={principle.name}>
              <CardHeader>
                <CardTitle>{principle.name}</CardTitle>
                <CardDescription>{principle.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {principle.examples.map((example, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Capacity Assessment Framework</CardTitle>
              <CardDescription>
                Four criteria for determining decision-making capacity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">1. Understanding</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Can the patient understand the relevant information about their condition and treatment?
                </p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">2. Appreciation</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Can the patient appreciate how this information applies to their own situation?
                </p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">3. Reasoning</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Can the patient reason about treatment options and their consequences?
                </p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">4. Communication</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Can the patient communicate a choice?
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-md mt-4">
                <p className="text-sm">
                  <strong>Key Point:</strong> Capacity is task-specific and can fluctuate. A patient may
                  have capacity for some decisions but not others.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Surrogate Decision-Making Hierarchy</CardTitle>
              <CardDescription>
                Legal order of surrogate decision-makers (may vary by state)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                <li className="flex items-start gap-3">
                  <Badge variant="default">1</Badge>
                  <div>
                    <strong className="text-sm">Healthcare Proxy / Durable Power of Attorney</strong>
                    <p className="text-sm text-muted-foreground">
                      Person designated by the patient in advance
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary">2</Badge>
                  <div>
                    <strong className="text-sm">Spouse / Domestic Partner</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary">3</Badge>
                  <div>
                    <strong className="text-sm">Adult Children</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary">4</Badge>
                  <div>
                    <strong className="text-sm">Parents</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary">5</Badge>
                  <div>
                    <strong className="text-sm">Adult Siblings</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary">6</Badge>
                  <div>
                    <strong className="text-sm">Other Relatives</strong>
                  </div>
                </li>
              </ol>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md mt-4">
                <p className="text-sm">
                  <strong>Remember:</strong> Surrogates should use <em>substituted judgment</em> (what
                  the patient would have wanted), not their own preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confidentiality Exceptions</CardTitle>
              <CardDescription>
                When it is ethical and legal to breach confidentiality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Mandatory reporting:</strong> Child abuse, elder abuse, certain communicable
                    diseases
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Duty to warn:</strong> Credible threat of serious harm to identifiable third
                    party (Tarasoff rule)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Public health emergencies:</strong> Outbreak investigations, contact tracing
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Court orders:</strong> Subpoenas for medical records (verify validity)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Patient consent:</strong> When patient authorizes disclosure
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Ethics;
