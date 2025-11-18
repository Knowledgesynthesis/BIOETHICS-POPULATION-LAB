import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import {
  calculate2x2TableFromParams,
  calculatePPV,
  calculateNPV,
  calculateLikelihoodRatioPositive,
  calculateLikelihoodRatioNegative,
  formatPercentage,
  formatNumber,
} from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

const StatsLab = () => {
  const [sensitivity, setSensitivity] = useState(0.9);
  const [specificity, setSpecificity] = useState(0.95);
  const [prevalence, setPrevalence] = useState(0.1);
  const population = 1000;

  // Calculate 2x2 table
  const { tp, fp, tn, fn } = calculate2x2TableFromParams(prevalence, sensitivity, specificity, population);

  // Calculate derived metrics
  const ppv = calculatePPV(tp, fp);
  const npv = calculateNPV(tn, fn);
  const lrPositive = calculateLikelihoodRatioPositive(sensitivity, specificity);
  const lrNegative = calculateLikelihoodRatioNegative(sensitivity, specificity);

  // Data for visualization
  const chartData = [
    {
      name: 'Disease +',
      'True Positive': tp,
      'False Negative': fn,
    },
    {
      name: 'Disease -',
      'False Positive': fp,
      'True Negative': tn,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Stats Lab</h1>
        <p className="text-muted-foreground">
          Interactive playground for understanding diagnostic test characteristics
        </p>
      </div>

      <Tabs defaultValue="playground">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="playground">Interactive Playground</TabsTrigger>
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
        </TabsList>

        <TabsContent value="playground" className="space-y-6">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Test Parameters</CardTitle>
              <CardDescription>
                Adjust the sliders to see how test characteristics affect outcomes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Slider
                label="Sensitivity (True Positive Rate)"
                value={sensitivity}
                onChange={setSensitivity}
                min={0}
                max={1}
                step={0.01}
                formatValue={(v) => formatPercentage(v)}
              />
              <Slider
                label="Specificity (True Negative Rate)"
                value={specificity}
                onChange={setSpecificity}
                min={0}
                max={1}
                step={0.01}
                formatValue={(v) => formatPercentage(v)}
              />
              <Slider
                label="Disease Prevalence"
                value={prevalence}
                onChange={setPrevalence}
                min={0.01}
                max={0.99}
                step={0.01}
                formatValue={(v) => formatPercentage(v)}
              />
            </CardContent>
          </Card>

          {/* 2x2 Table */}
          <Card>
            <CardHeader>
              <CardTitle>2×2 Contingency Table</CardTitle>
              <CardDescription>Population of {population} individuals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-border p-3 bg-muted"></th>
                      <th className="border border-border p-3 bg-muted font-semibold">
                        Disease Present
                      </th>
                      <th className="border border-border p-3 bg-muted font-semibold">
                        Disease Absent
                      </th>
                      <th className="border border-border p-3 bg-muted font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3 bg-muted font-semibold">Test +</td>
                      <td className="border border-border p-3 text-center bg-green-500/10">
                        <div className="font-mono text-lg">{tp}</div>
                        <div className="text-xs text-muted-foreground">True Positive</div>
                      </td>
                      <td className="border border-border p-3 text-center bg-red-500/10">
                        <div className="font-mono text-lg">{fp}</div>
                        <div className="text-xs text-muted-foreground">False Positive</div>
                      </td>
                      <td className="border border-border p-3 text-center font-semibold">
                        {tp + fp}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 bg-muted font-semibold">Test -</td>
                      <td className="border border-border p-3 text-center bg-red-500/10">
                        <div className="font-mono text-lg">{fn}</div>
                        <div className="text-xs text-muted-foreground">False Negative</div>
                      </td>
                      <td className="border border-border p-3 text-center bg-green-500/10">
                        <div className="font-mono text-lg">{tn}</div>
                        <div className="text-xs text-muted-foreground">True Negative</div>
                      </td>
                      <td className="border border-border p-3 text-center font-semibold">
                        {fn + tn}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 bg-muted font-semibold">Total</td>
                      <td className="border border-border p-3 text-center font-semibold">
                        {tp + fn}
                      </td>
                      <td className="border border-border p-3 text-center font-semibold">
                        {fp + tn}
                      </td>
                      <td className="border border-border p-3 text-center font-semibold">
                        {population}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Calculated Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Characteristics</CardTitle>
                <CardDescription>Intrinsic properties of the test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <span className="font-medium">Sensitivity</span>
                  <Badge variant="secondary">{formatPercentage(sensitivity)}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <span className="font-medium">Specificity</span>
                  <Badge variant="secondary">{formatPercentage(specificity)}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <Info className="inline h-3 w-3 mr-1" />
                  These do NOT change with prevalence
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Predictive Values</CardTitle>
                <CardDescription>Depend on disease prevalence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <span className="font-medium">PPV</span>
                  <Badge variant="default">{formatPercentage(ppv)}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <span className="font-medium">NPV</span>
                  <Badge variant="default">{formatPercentage(npv)}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <Info className="inline h-3 w-3 mr-1" />
                  These CHANGE with prevalence
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Likelihood Ratios</CardTitle>
                <CardDescription>How much the test changes probability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <span className="font-medium">LR+</span>
                  <Badge variant="success">{formatNumber(lrPositive)}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <span className="font-medium">LR−</span>
                  <Badge variant="warning">{formatNumber(lrNegative)}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <Info className="inline h-3 w-3 mr-1" />
                  LR+ &gt; 10 or LR− &lt; 0.1 are considered strong
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Visual Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="True Positive" fill="#22c55e" />
                    <Bar dataKey="False Positive" fill="#ef4444" />
                    <Bar dataKey="False Negative" fill="#f59e0b" />
                    <Bar dataKey="True Negative" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sensitivity and Specificity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Sensitivity (True Positive Rate)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  The proportion of people WITH the disease who test positive.
                </p>
                <code className="text-sm bg-muted p-2 rounded block">
                  Sensitivity = TP / (TP + FN)
                </code>
                <p className="text-sm mt-2">
                  <strong>Mnemonic:</strong> SN-N-OUT — High sensitivity rules OUT disease when negative
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Specificity (True Negative Rate)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  The proportion of people WITHOUT the disease who test negative.
                </p>
                <code className="text-sm bg-muted p-2 rounded block">
                  Specificity = TN / (TN + FP)
                </code>
                <p className="text-sm mt-2">
                  <strong>Mnemonic:</strong> SP-P-IN — High specificity rules IN disease when positive
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Predictive Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Positive Predictive Value (PPV)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  The proportion of positive tests that are true positives.
                </p>
                <code className="text-sm bg-muted p-2 rounded block">
                  PPV = TP / (TP + FP)
                </code>
                <p className="text-sm mt-2 text-yellow-600 dark:text-yellow-400">
                  ⚠️ PPV increases with higher prevalence
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Negative Predictive Value (NPV)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  The proportion of negative tests that are true negatives.
                </p>
                <code className="text-sm bg-muted p-2 rounded block">
                  NPV = TN / (TN + FN)
                </code>
                <p className="text-sm mt-2 text-yellow-600 dark:text-yellow-400">
                  ⚠️ NPV decreases with higher prevalence
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Likelihood Ratios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Likelihood ratios tell you how much a test result changes the probability of disease.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Positive Likelihood Ratio (LR+)</h4>
                <code className="text-sm bg-muted p-2 rounded block">
                  LR+ = Sensitivity / (1 − Specificity)
                </code>
                <p className="text-sm mt-2">
                  How much more likely is a positive test in diseased vs non-diseased patients?
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Negative Likelihood Ratio (LR−)</h4>
                <code className="text-sm bg-muted p-2 rounded block">
                  LR− = (1 − Sensitivity) / Specificity
                </code>
                <p className="text-sm mt-2">
                  How much more likely is a negative test in diseased vs non-diseased patients?
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-sm">
                <strong>Interpretation:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>LR+ &gt; 10: Large increase in probability</li>
                  <li>LR+ 5-10: Moderate increase</li>
                  <li>LR+ 2-5: Small increase</li>
                  <li>LR− &lt; 0.1: Large decrease in probability</li>
                  <li>LR− 0.1-0.2: Moderate decrease</li>
                  <li>LR− 0.2-0.5: Small decrease</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pitfalls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Pitfalls</CardTitle>
              <CardDescription>Avoid these frequent mistakes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                  ❌ Pitfall #1: Confusing intrinsic vs population-dependent metrics
                </h4>
                <p className="text-sm">
                  <strong>Wrong:</strong> "This test has a PPV of 90%, so it's very accurate."
                </p>
                <p className="text-sm mt-2">
                  <strong>Right:</strong> "PPV depends on prevalence. In a low-prevalence population, even a good test can have low PPV."
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                  ❌ Pitfall #2: Ignoring the effect of prevalence
                </h4>
                <p className="text-sm">
                  When you screen a low-prevalence population, most positive tests may be false positives, even with a highly specific test.
                </p>
                <p className="text-sm mt-2">
                  <strong>Example:</strong> COVID testing in asymptomatic, low-risk populations can yield many false positives.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                  ❌ Pitfall #3: Using screening tests for diagnosis
                </h4>
                <p className="text-sm">
                  Screening tests (high sensitivity) should be followed by confirmatory tests (high specificity).
                </p>
                <p className="text-sm mt-2">
                  <strong>Example:</strong> HIV screening (ELISA) → confirmation (Western blot)
                </p>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                  ✅ Best Practice: Always consider the clinical context
                </h4>
                <p className="text-sm">
                  Test characteristics must be interpreted in the context of:
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Disease prevalence in your population</li>
                  <li>Pre-test probability based on clinical findings</li>
                  <li>Consequences of false positives vs false negatives</li>
                  <li>Availability and risk of confirmatory testing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatsLab;
