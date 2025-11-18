import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { FlaskConical, CheckCircle2, XCircle } from 'lucide-react';

const studyTypes = [
  {
    id: 'rct',
    name: 'Randomized Controlled Trial',
    description: 'Gold standard for causality. Participants randomly assigned to treatment or control.',
    strengths: ['Minimizes bias', 'Establishes causality', 'Controls confounding'],
    weaknesses: ['Expensive', 'Time-consuming', 'May lack external validity'],
    example: 'Testing a new antihypertensive medication vs placebo in hypertensive patients.',
    level: 'Level 1 Evidence',
  },
  {
    id: 'cohort',
    name: 'Cohort Study',
    description: 'Follow groups with and without exposure over time to see who develops the outcome.',
    strengths: ['Can establish temporality', 'Multiple outcomes', 'Calculates incidence and RR'],
    weaknesses: ['Time-consuming', 'Expensive', 'Loss to follow-up', 'Confounding'],
    example: 'Following smokers and non-smokers over 20 years to assess lung cancer incidence.',
    level: 'Level 2 Evidence',
  },
  {
    id: 'case-control',
    name: 'Case-Control Study',
    description: 'Compare people with disease (cases) to those without (controls), looking back at exposures.',
    strengths: ['Quick and inexpensive', 'Good for rare diseases', 'Multiple exposures'],
    weaknesses: ['Recall bias', 'Cannot calculate incidence', 'Cannot prove causality'],
    example: 'Comparing patients with pancreatic cancer to controls, asking about past smoking history.',
    level: 'Level 3 Evidence',
  },
  {
    id: 'cross-sectional',
    name: 'Cross-Sectional Study',
    description: 'Snapshot at one point in time. Measures exposure and outcome simultaneously.',
    strengths: ['Quick', 'Inexpensive', 'Good for prevalence'],
    weaknesses: ['Cannot establish temporality', 'Cannot prove causality'],
    example: 'Survey asking about current depression and current exercise habits.',
    level: 'Level 4 Evidence',
  },
];

const biasTypes = [
  {
    name: 'Selection Bias',
    description: 'Study population not representative of target population.',
    example: 'Recruiting only hospital patients for a community health study.',
    prevention: 'Random sampling, clear inclusion/exclusion criteria',
  },
  {
    name: 'Recall Bias',
    description: 'Differential recall of exposure between cases and controls.',
    example: 'Mothers of children with birth defects better remember medication use during pregnancy.',
    prevention: 'Use objective records, prospective design',
  },
  {
    name: 'Measurement Bias',
    description: 'Systematic error in how variables are measured.',
    example: 'Blood pressure cuff too small systematically overestimates BP.',
    prevention: 'Standardize measurements, calibrate equipment, blind assessors',
  },
  {
    name: 'Lead-Time Bias',
    description: 'Early detection makes survival appear longer without changing actual outcome.',
    example: 'Screening detects cancer earlier but doesn\'t extend actual lifespan.',
    prevention: 'Use mortality as endpoint, not survival time from diagnosis',
  },
  {
    name: 'Length-Time Bias',
    description: 'Screening detects slower-growing (better prognosis) cases more often.',
    example: 'Screening mammography overrepresents slow-growing tumors.',
    prevention: 'RCTs comparing screened vs unscreened populations',
  },
];

const StudyDesign = () => {
  const [selectedStudy, setSelectedStudy] = useState(studyTypes[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <FlaskConical className="h-8 w-8 text-purple-500" />
          Study Design Builder
        </h1>
        <p className="text-muted-foreground">
          Master clinical research methodology and study design principles
        </p>
      </div>

      <Tabs defaultValue="types">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="types">Study Types</TabsTrigger>
          <TabsTrigger value="biases">Biases</TabsTrigger>
          <TabsTrigger value="scenarios">Practice Scenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="types" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Study Type List */}
            <div className="lg:col-span-1 space-y-2">
              <h3 className="font-semibold mb-3">Select Study Design</h3>
              {studyTypes.map((study) => (
                <button
                  key={study.id}
                  onClick={() => setSelectedStudy(study)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedStudy.id === study.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold">{study.name}</div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {study.level}
                  </Badge>
                </button>
              ))}
            </div>

            {/* Study Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{selectedStudy.name}</CardTitle>
                <CardDescription>{selectedStudy.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {selectedStudy.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    Weaknesses
                  </h4>
                  <ul className="space-y-2">
                    {selectedStudy.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                  <h4 className="font-semibold mb-2">Example</h4>
                  <p className="text-sm">{selectedStudy.example}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="biases" className="space-y-4">
          {biasTypes.map((bias) => (
            <Card key={bias.name}>
              <CardHeader>
                <CardTitle className="text-xl">{bias.name}</CardTitle>
                <CardDescription>{bias.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Example:</h4>
                  <p className="text-sm text-muted-foreground italic">{bias.example}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-green-600">How to Prevent:</h4>
                  <p className="text-sm">{bias.prevention}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Practice Scenario #1</CardTitle>
              <CardDescription>
                You want to study the relationship between coffee consumption and heart disease
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                <strong>Question:</strong> Which study design would be most appropriate and why?
              </p>
              <div className="space-y-2">
                <details className="p-3 bg-muted rounded-md">
                  <summary className="font-semibold cursor-pointer">Answer</summary>
                  <div className="mt-3 text-sm space-y-2">
                    <p>
                      <strong>Best choice:</strong> Prospective Cohort Study
                    </p>
                    <p>
                      <strong>Rationale:</strong> You can identify coffee drinkers and non-drinkers at
                      baseline and follow them over time to see who develops heart disease. This
                      establishes temporality (exposure before outcome) and allows you to calculate
                      incidence and relative risk.
                    </p>
                    <p>
                      <strong>Why not RCT?</strong> Unethical and impractical to randomize people to
                      drink coffee for years.
                    </p>
                    <p>
                      <strong>Why not case-control?</strong> Could work for rare outcomes, but recall
                      bias about past coffee consumption would be a major issue.
                    </p>
                  </div>
                </details>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Practice Scenario #2</CardTitle>
              <CardDescription>
                You want to study a rare genetic disorder and its association with environmental toxins
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                <strong>Question:</strong> Which study design is most efficient?
              </p>
              <div className="space-y-2">
                <details className="p-3 bg-muted rounded-md">
                  <summary className="font-semibold cursor-pointer">Answer</summary>
                  <div className="mt-3 text-sm space-y-2">
                    <p>
                      <strong>Best choice:</strong> Case-Control Study
                    </p>
                    <p>
                      <strong>Rationale:</strong> For rare diseases, case-control is ideal because you
                      start with cases (people who have the disorder) and matched controls, then look
                      back at environmental exposures. This is much more efficient than waiting years
                      in a cohort study for enough cases to accumulate.
                    </p>
                    <p>
                      <strong>What to watch out for:</strong> Recall bias about past environmental
                      exposures. Use objective records when possible.
                    </p>
                  </div>
                </details>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Concepts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-sm">
                <strong>Confounding:</strong> A third variable associated with both exposure and outcome
                that distorts the apparent relationship.
                <p className="mt-2 italic">
                  Example: Age confounds the relationship between gray hair and heart disease.
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-md text-sm">
                <strong>Effect Modification:</strong> The effect of exposure on outcome differs across
                levels of a third variable.
                <p className="mt-2 italic">
                  Example: Smoking's effect on lung cancer may be stronger in those with genetic
                  predisposition.
                </p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-sm">
                <strong>Intention-to-Treat Analysis:</strong> Analyze patients in the groups they were
                originally assigned to, regardless of whether they completed treatment.
                <p className="mt-2 italic">
                  This preserves randomization and prevents bias from dropouts.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyDesign;
