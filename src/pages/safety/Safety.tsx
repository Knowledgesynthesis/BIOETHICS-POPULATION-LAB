import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SafetyScenario {
  id: string;
  title: string;
  scenario: string;
  errorType: 'active' | 'latent';
  rootCauses: string[];
  preventionStrategies: string[];
}

const safetyScenarios: SafetyScenario[] = [
  {
    id: 'med-error-1',
    title: 'Medication Dosing Error',
    scenario:
      'A nurse administers 10mg of morphine IV to a patient, but the order was for 1mg. The patient develops respiratory depression. Investigation reveals: the order was handwritten and difficult to read, there was no independent double-check, and the pharmacy had recently changed to look-alike vials.',
    errorType: 'active',
    rootCauses: [
      'Handwritten orders (latent)',
      'Look-alike medication packaging (latent)',
      'Lack of double-check system (latent)',
      'Nurse misread order (active)',
    ],
    preventionStrategies: [
      'Implement computerized physician order entry (CPOE)',
      'Use tall-man lettering for look-alike drugs',
      'Require independent double-check for high-risk medications',
      'Implement barcode scanning for medication administration',
      'Use smart pumps with dose limits',
    ],
  },
  {
    id: 'handoff-error',
    title: 'Handoff Communication Failure',
    scenario:
      'During shift change, a patient\'s critical lab result (potassium 6.8) is not communicated to the incoming team. The lab was called to the outgoing nurse who planned to address it but forgot during a busy handoff. The patient develops a cardiac arrhythmia overnight.',
    errorType: 'active',
    rootCauses: [
      'Unstructured handoff process (latent)',
      'Busy environment with interruptions (latent)',
      'Lack of standardized communication tool (latent)',
      'Nurse forgot to communicate critical result (active)',
    ],
    preventionStrategies: [
      'Use structured handoff tool (e.g., SBAR, I-PASS)',
      'Create quiet zones for handoffs',
      'Implement read-back and verify protocols',
      'Use electronic handoff tools with checklists',
      'Flag critical values in EHR for automatic escalation',
    ],
  },
];

const errorTypes = [
  {
    type: 'Active Errors',
    description: 'Errors that occur at the point of contact between a person and a system.',
    examples: [
      'Wrong medication administered',
      'Surgical wrong-site error',
      'Incorrect dosage calculation',
    ],
    color: 'text-red-500',
  },
  {
    type: 'Latent Errors',
    description: 'System-level defects that create conditions for active errors to occur.',
    examples: [
      'Poor equipment design',
      'Inadequate staffing',
      'Look-alike drug packaging',
      'Lack of safety protocols',
    ],
    color: 'text-orange-500',
  },
];

const Safety = () => {
  const [selectedScenario, setSelectedScenario] = useState(safetyScenarios[0]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8 text-green-500" />
          Safety Lab
        </h1>
        <p className="text-muted-foreground">
          Master medical error analysis and quality improvement principles
        </p>
      </div>

      <Tabs defaultValue="scenarios">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenarios">Case Analysis</TabsTrigger>
          <TabsTrigger value="concepts">Core Concepts</TabsTrigger>
          <TabsTrigger value="models">Safety Models</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="flex gap-2 mb-4">
            {safetyScenarios.map((scenario) => (
              <Button
                key={scenario.id}
                variant={selectedScenario.id === scenario.id ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedScenario(scenario);
                  setShowAnalysis(false);
                }}
              >
                {scenario.title}
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{selectedScenario.title}</CardTitle>
              <CardDescription>
                <Badge
                  variant={selectedScenario.errorType === 'active' ? 'destructive' : 'warning'}
                >
                  Primary: {selectedScenario.errorType === 'active' ? 'Active' : 'Latent'} Error
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold mb-2">Scenario</h4>
                <p className="text-sm">{selectedScenario.scenario}</p>
              </div>

              {!showAnalysis ? (
                <Button onClick={() => setShowAnalysis(true)} className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Analyze Root Causes
                </Button>
              ) : (
                <div className="space-y-4 animate-slide-in">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Root Cause Analysis
                    </h4>
                    <ul className="space-y-2">
                      {selectedScenario.rootCauses.map((cause, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-md"
                        >
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span className="text-sm">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Prevention Strategies
                    </h4>
                    <ul className="space-y-2">
                      {selectedScenario.preventionStrategies.map((strategy, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-md"
                        >
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-sm">{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                    <h4 className="font-semibold mb-2">Key Learning Point</h4>
                    <p className="text-sm">
                      Notice how active errors are often the result of multiple latent (system-level)
                      failures. Effective prevention focuses on fixing systems, not blaming individuals.
                      This is the essence of the <strong>Swiss Cheese Model</strong>.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          {errorTypes.map((errorType) => (
            <Card key={errorType.type}>
              <CardHeader>
                <CardTitle className={errorType.color}>{errorType.type}</CardTitle>
                <CardDescription>{errorType.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {errorType.examples.map((example, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Key Safety Principles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Culture of Safety</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Organizations should encourage error reporting without blame, focusing on system
                  improvement rather than individual punishment.
                </p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Just Culture</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Distinguish between human error (systems issue), at-risk behavior (needs coaching),
                  and reckless behavior (may need disciplinary action).
                </p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">High Reliability Organizations (HRO)</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Organizations that operate in hazardous conditions but have fewer accidents due to
                  preoccupation with failure, reluctance to simplify, sensitivity to operations,
                  commitment to resilience, and deference to expertise.
                </p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Error Prevention Hierarchy</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  Most effective → Least effective: Elimination, Substitution, Engineering controls,
                  Administrative controls, Personal protective equipment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Safety Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <strong>Standardization:</strong> Checklists, protocols, and bundles reduce variation
                and ensure critical steps are not missed.
              </div>
              <div className="text-sm p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <strong>Redundancy:</strong> Double-checks, independent verification, and backup
                systems catch errors before they reach patients.
              </div>
              <div className="text-sm p-3 bg-purple-500/10 border border-purple-500/20 rounded-md">
                <strong>Forcing Functions:</strong> Design features that prevent errors (e.g.,
                connectors that only fit one way, alerts that must be acknowledged).
              </div>
              <div className="text-sm p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
                <strong>Simplification:</strong> Reduce complexity, minimize handoffs, streamline
                processes to reduce opportunities for error.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Swiss Cheese Model (Reason's Model)</CardTitle>
              <CardDescription>
                Understanding how multiple system failures align to allow errors to reach patients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm mb-4">
                  Imagine multiple slices of Swiss cheese, each representing a defensive layer in a
                  system. Each slice has holes (weaknesses). Normally, the holes don't align, so errors
                  are caught. But when holes align across multiple layers, an error can pass through
                  all defenses and harm a patient.
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-background rounded border-l-4 border-blue-500">
                    <strong className="text-sm">Layer 1:</strong>
                    <span className="text-sm ml-2">Organizational (policies, culture, resources)</span>
                  </div>
                  <div className="p-2 bg-background rounded border-l-4 border-green-500">
                    <strong className="text-sm">Layer 2:</strong>
                    <span className="text-sm ml-2">
                      Supervision (oversight, training, communication)
                    </span>
                  </div>
                  <div className="p-2 bg-background rounded border-l-4 border-yellow-500">
                    <strong className="text-sm">Layer 3:</strong>
                    <span className="text-sm ml-2">
                      Preconditions (staffing, equipment, environment)
                    </span>
                  </div>
                  <div className="p-2 bg-background rounded border-l-4 border-red-500">
                    <strong className="text-sm">Layer 4:</strong>
                    <span className="text-sm ml-2">Active failures (individual errors)</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <h4 className="font-semibold mb-2">Clinical Example</h4>
                <p className="text-sm">
                  A wrong-site surgery occurs when:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Hospital lacks mandatory timeout policy (organizational)</li>
                    <li>Surgical team not trained on verification protocols (supervision)</li>
                    <li>Operating room is rushed due to understaffing (preconditions)</li>
                    <li>Surgeon marks wrong site (active failure)</li>
                  </ul>
                </p>
                <p className="text-sm mt-3">
                  <strong>Prevention:</strong> Fix the system layers, not just blame the surgeon.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Root Cause Analysis (RCA)</CardTitle>
              <CardDescription>
                Systematic approach to investigating serious safety events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                RCA uses the "5 Whys" technique and fishbone diagrams to identify underlying causes
                rather than surface symptoms.
              </p>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Steps in RCA:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                  <li>Define the problem clearly</li>
                  <li>Collect data about what happened</li>
                  <li>Identify contributing factors</li>
                  <li>Determine root causes (often system issues)</li>
                  <li>Develop action plans to address root causes</li>
                  <li>Implement changes and monitor effectiveness</li>
                </ol>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                <h4 className="font-semibold text-sm mb-2">Example "5 Whys"</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Problem:</strong> Patient received wrong medication
                  </p>
                  <p>
                    <strong>Why?</strong> Nurse picked wrong medication from drawer
                  </p>
                  <p>
                    <strong>Why?</strong> Similar-looking bottles were stored next to each other
                  </p>
                  <p>
                    <strong>Why?</strong> Pharmacy stocks alphabetically without considering safety
                  </p>
                  <p>
                    <strong>Why?</strong> No policy for separating look-alike medications
                  </p>
                  <p>
                    <strong>Why?</strong> Hospital safety committee hasn't reviewed medication storage
                    protocols
                  </p>
                  <p className="mt-2 text-green-600 dark:text-green-400">
                    <strong>Root cause:</strong> Lack of medication storage safety protocols
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Failure Mode and Effects Analysis (FMEA)</CardTitle>
              <CardDescription>
                Proactive approach to identifying potential failures before they occur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                FMEA is used to analyze processes and identify where failures might occur, then
                prioritize them by severity, frequency, and detectability.
              </p>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Risk Priority Number (RPN):</strong>
                <p className="text-sm mt-2">
                  RPN = Severity × Occurrence × Detection
                </p>
                <p className="text-sm mt-2 text-muted-foreground">
                  Higher RPN = higher priority for intervention
                </p>
              </div>
              <div className="mt-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-md text-sm">
                <strong>Use case:</strong> Before implementing a new medication dispensing system,
                conduct FMEA to identify potential failure points and design safeguards in advance.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Safety;
