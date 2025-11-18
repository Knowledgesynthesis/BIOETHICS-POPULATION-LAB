import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Lock, CheckCircle2, XCircle } from 'lucide-react';

interface HIPAAScenario {
  id: string;
  situation: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  principle: string;
}

const hipaaScenarios: HIPAAScenario[] = [
  {
    id: 'disclosure-1',
    situation:
      'A patient\'s spouse calls asking about test results. The patient is not available and has not provided written authorization for the spouse to receive information.',
    question: 'Can you disclose the test results?',
    options: [
      'Yes, spouses are automatically authorized',
      'No, need written patient authorization',
      'Yes, if you verify the caller is the spouse',
      'Yes, under emergency exception',
    ],
    correctAnswer: 1,
    explanation:
      'Under HIPAA, you cannot disclose PHI to family members without patient authorization, even to spouses. Marriage does not automatically grant access to health information. The patient must provide written authorization or verbal consent that is documented. This is not an emergency situation.',
    principle: 'Authorization Required for Disclosure',
  },
  {
    id: 'minimum-necessary-1',
    situation:
      'An insurance company requests medical records for a patient\'s recent ER visit to process a claim. They send a form requesting "all medical records."',
    question: 'What should you do?',
    options: [
      'Send all records as requested',
      'Send only records relevant to the ER visit',
      'Refuse to send any records',
      'Send records only after patient approval',
    ],
    correctAnswer: 1,
    explanation:
      'The Minimum Necessary Rule requires covered entities to limit PHI disclosure to the minimum necessary to accomplish the purpose. For insurance claims, only records relevant to the specific visit should be disclosed. Patient authorization is not required for treatment, payment, or healthcare operations (TPO), but you must still apply minimum necessary.',
    principle: 'Minimum Necessary Rule',
  },
  {
    id: 'public-health-1',
    situation:
      'You diagnose a patient with tuberculosis. The patient asks you not to report it to public health authorities because they fear deportation.',
    question: 'What is the appropriate action?',
    options: [
      'Honor the patient request and do not report',
      'Report to public health despite patient objection',
      'Wait until the patient agrees to report',
      'Only report if the patient becomes non-compliant',
    ],
    correctAnswer: 1,
    explanation:
      'Reporting certain communicable diseases to public health authorities is a legal requirement and an exception to HIPAA confidentiality. Tuberculosis is a reportable disease in all states. This disclosure is permitted without patient authorization under the public health exception. The patient should be informed of this requirement, but their consent is not needed.',
    principle: 'Public Health Exception',
  },
  {
    id: 'research-1',
    situation:
      'A researcher wants to review patient charts for a study on diabetes outcomes. The study has IRB approval but will not contact patients or obtain individual consent.',
    question: 'Under what condition can the researcher access the records?',
    options: [
      'Never, individual consent is always required',
      'With a HIPAA waiver granted by IRB',
      'Only if all patient identifiers are removed first',
      'Only with hospital administrator approval',
    ],
    correctAnswer: 1,
    explanation:
      'HIPAA allows research use of PHI with either: (1) individual authorization, (2) IRB/Privacy Board waiver of authorization (if certain criteria are met), or (3) use of de-identified data. Since the question states IRB approval exists, a HIPAA waiver of authorization can be granted if the IRB determines the research meets specific criteria (minimal risk, impracticable without waiver, etc.).',
    principle: 'Research Exception with Waiver',
  },
];

const HIPAA = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentScenario = hipaaScenarios[currentScenarioIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setCurrentScenarioIndex((prev) => (prev + 1) % hipaaScenarios.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Lock className="h-8 w-8 text-yellow-500" />
          HIPAA Compliance Challenge
        </h1>
        <p className="text-muted-foreground">
          Master privacy and confidentiality rules in healthcare
        </p>
      </div>

      <Tabs defaultValue="scenarios">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="exceptions">Disclosure Exceptions</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>HIPAA Scenario {currentScenarioIndex + 1}</CardTitle>
                  <CardDescription>
                    {currentScenarioIndex + 1} of {hipaaScenarios.length}
                  </CardDescription>
                </div>
                <Badge variant="outline">{currentScenario.principle}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold mb-2">Situation</h4>
                <p className="text-sm">{currentScenario.situation}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">{currentScenario.question}</h4>
                <div className="space-y-2">
                  {currentScenario.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentScenario.correctAnswer;
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
                          {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {showExplanation && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md animate-slide-in">
                  <h4 className="font-semibold mb-2">Explanation</h4>
                  <p className="text-sm">{currentScenario.explanation}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentScenarioIndex((prev) =>
                      prev === 0 ? hipaaScenarios.length - 1 : prev - 1
                    );
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                >
                  Previous
                </Button>
                <Button onClick={handleNext}>Next Scenario</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>What is PHI (Protected Health Information)?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                PHI is individually identifiable health information held or transmitted by a covered
                entity or its business associate, in any form or media.
              </p>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">PHI includes 18 identifiers:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Names, addresses, dates (except year)</li>
                  <li>Phone numbers, fax numbers, email addresses</li>
                  <li>Social security numbers, medical record numbers</li>
                  <li>Account numbers, certificate/license numbers</li>
                  <li>Vehicle identifiers, device serial numbers</li>
                  <li>URLs, IP addresses</li>
                  <li>Biometric identifiers (fingerprints, voice)</li>
                  <li>Full-face photos</li>
                  <li>Any other unique identifying number or code</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Covered Entities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                HIPAA applies to three types of covered entities:
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-sm">
                  <strong>1. Healthcare Providers</strong>
                  <p className="mt-1">
                    Who transmit health information electronically in connection with covered
                    transactions (billing, etc.)
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-sm">
                  <strong>2. Health Plans</strong>
                  <p className="mt-1">
                    Insurance companies, HMOs, Medicare, Medicaid
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-md text-sm">
                  <strong>3. Healthcare Clearinghouses</strong>
                  <p className="mt-1">
                    Entities that process health information from nonstandard to standard format
                  </p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-muted rounded-md text-sm">
                <strong>Business Associates:</strong> Entities that perform services for covered
                entities involving PHI (e.g., billing companies, IT vendors, shredding services) must
                also comply with HIPAA.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Minimum Necessary Rule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                When using or disclosing PHI, covered entities must make reasonable efforts to limit
                PHI to the minimum necessary to accomplish the intended purpose.
              </p>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-sm">
                <strong>Exceptions (minimum necessary does NOT apply):</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Disclosures to the patient</li>
                  <li>Disclosures pursuant to patient authorization</li>
                  <li>Disclosures to HHS for compliance review</li>
                  <li>Uses or disclosures required by law</li>
                  <li>Disclosures to another covered entity for treatment</li>
                </ul>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-sm">
                <strong>Example:</strong> When billing insurance for an ER visit, send only the ER
                records, not the patient\'s entire medical history.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Rule vs Security Rule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <strong className="text-sm">Privacy Rule</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Establishes national standards for the protection of PHI. Covers who can access
                    PHI and under what circumstances.
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <strong className="text-sm">Security Rule</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Establishes national standards for protecting electronic PHI (ePHI). Requires
                    administrative, physical, and technical safeguards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exceptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permitted Uses and Disclosures Without Authorization</CardTitle>
              <CardDescription>
                When PHI can be used or disclosed without patient consent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <strong className="text-sm">Treatment, Payment, Healthcare Operations (TPO)</strong>
                <p className="text-sm mt-2">
                  <strong>Treatment:</strong> Providing, coordinating, or managing healthcare
                </p>
                <p className="text-sm mt-1">
                  <strong>Payment:</strong> Billing and reimbursement activities
                </p>
                <p className="text-sm mt-1">
                  <strong>Operations:</strong> Quality assessment, case management, business planning
                </p>
              </div>

              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <strong className="text-sm">To the Individual (Patient)</strong>
                <p className="text-sm mt-1">
                  Patients have the right to access their own health information
                </p>
              </div>

              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-md">
                <strong className="text-sm">Public Health Activities</strong>
                <p className="text-sm mt-1">
                  Reporting communicable diseases, adverse drug events, product recalls, disease
                  surveillance
                </p>
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
                <strong className="text-sm">Victims of Abuse, Neglect, or Domestic Violence</strong>
                <p className="text-sm mt-1">
                  Required or permitted reporting to government authorities
                </p>
              </div>

              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                <strong className="text-sm">Health Oversight Activities</strong>
                <p className="text-sm mt-1">
                  Audits, investigations, inspections by government agencies overseeing the healthcare
                  system
                </p>
              </div>

              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                <strong className="text-sm">Judicial and Administrative Proceedings</strong>
                <p className="text-sm mt-1">
                  In response to court orders, subpoenas (with patient notice or protective order)
                </p>
              </div>

              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-md">
                <strong className="text-sm">Law Enforcement Purposes</strong>
                <p className="text-sm mt-1">
                  Reporting crimes, victims of crimes, suspicious deaths, evidence of criminal conduct
                </p>
              </div>

              <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-md">
                <strong className="text-sm">Serious Threat to Health or Safety</strong>
                <p className="text-sm mt-1">
                  When necessary to prevent or lessen a serious and imminent threat to a person or the
                  public (Tarasoff-like situations)
                </p>
              </div>

              <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-md">
                <strong className="text-sm">Research (with waiver or de-identification)</strong>
                <p className="text-sm mt-1">
                  With IRB/Privacy Board waiver of authorization, or using de-identified data
                </p>
              </div>

              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-md">
                <strong className="text-sm">Workers' Compensation</strong>
                <p className="text-sm mt-1">
                  As authorized by workers' compensation laws
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>When Authorization IS Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Patient authorization is required for uses and disclosures not covered by the
                exceptions above, including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Disclosures to family members or friends (unless emergency)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Marketing purposes</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Sale of PHI</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Most uses of psychotherapy notes</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Disclosures for purposes not covered by TPO or other exceptions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HIPAA;
