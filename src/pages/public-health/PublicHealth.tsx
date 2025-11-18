import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Slider } from '@/components/ui/Slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Users, TrendingDown, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PublicHealth = () => {
  const [vaccinationRate, setVaccinationRate] = useState(0.7);
  const [r0, setR0] = useState(3);
  const [interventionStrength, setInterventionStrength] = useState(0.5);

  // Calculate herd immunity threshold
  const herdImmunityThreshold = 1 - (1 / r0);
  const isHerdImmunity = vaccinationRate >= herdImmunityThreshold;

  // Generate outbreak curve data
  const generateOutbreakData = () => {
    const data = [];
    const effectiveR = r0 * (1 - vaccinationRate) * (1 - interventionStrength);

    for (let day = 0; day <= 100; day += 5) {
      const cases = effectiveR > 1
        ? Math.floor(10 * Math.pow(effectiveR, day / 10))
        : Math.floor(100 * Math.exp(-day / 20));

      data.push({
        day,
        cases: Math.min(cases, 10000),
      });
    }

    return data;
  };

  const outbreakData = generateOutbreakData();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Users className="h-8 w-8 text-indigo-500" />
          Public Health Policy Simulator
        </h1>
        <p className="text-muted-foreground">
          Understand population-level interventions and disease control
        </p>
      </div>

      <Tabs defaultValue="simulator">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="simulator">Outbreak Simulator</TabsTrigger>
          <TabsTrigger value="concepts">Core Concepts</TabsTrigger>
          <TabsTrigger value="screening">Screening Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Disease Outbreak Control</CardTitle>
              <CardDescription>
                Adjust vaccination rates and interventions to control a hypothetical outbreak
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Slider
                  label="Vaccination Rate"
                  value={vaccinationRate}
                  onChange={setVaccinationRate}
                  min={0}
                  max={1}
                  step={0.05}
                  formatValue={(v) => `${(v * 100).toFixed(0)}%`}
                />
                <Slider
                  label="Basic Reproduction Number (R₀)"
                  value={r0}
                  onChange={setR0}
                  min={1}
                  max={10}
                  step={0.5}
                  formatValue={(v) => v.toFixed(1)}
                />
                <Slider
                  label="Non-Pharmaceutical Interventions"
                  value={interventionStrength}
                  onChange={setInterventionStrength}
                  min={0}
                  max={1}
                  step={0.1}
                  formatValue={(v) => `${(v * 100).toFixed(0)}%`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">Effective R</div>
                  <div className="text-2xl font-bold">
                    {(r0 * (1 - vaccinationRate) * (1 - interventionStrength)).toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {r0 * (1 - vaccinationRate) * (1 - interventionStrength) < 1 ? (
                      <span className="text-green-500 flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" /> Outbreak controlled
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> Outbreak growing
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">Herd Immunity Threshold</div>
                  <div className="text-2xl font-bold">
                    {(herdImmunityThreshold * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Required for herd immunity
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">Herd Immunity Status</div>
                  <div className="mt-2">
                    {isHerdImmunity ? (
                      <Badge variant="success">Achieved ✓</Badge>
                    ) : (
                      <Badge variant="warning">Not Achieved</Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {isHerdImmunity
                      ? 'Population protected'
                      : `Need ${((herdImmunityThreshold - vaccinationRate) * 100).toFixed(0)}% more`}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Projected Outbreak Curve</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={outbreakData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'New Cases', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <h4 className="font-semibold mb-2">Interpretation</h4>
                <p className="text-sm">
                  <strong>R₀ (Basic Reproduction Number):</strong> The average number of people one
                  infected person will infect in a completely susceptible population.
                </p>
                <p className="text-sm mt-2">
                  <strong>Effective R:</strong> The actual reproduction number considering immunity and
                  interventions. When Effective R {'<'} 1, the outbreak will eventually end.
                </p>
                <p className="text-sm mt-2">
                  <strong>Herd Immunity Threshold:</strong> The proportion of the population that needs
                  to be immune to stop sustained transmission. Formula: 1 - (1/R₀)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incidence vs Prevalence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Incidence</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  The number of NEW cases of a disease in a population during a specific time period.
                </p>
                <code className="text-sm bg-background p-2 rounded block mt-2">
                  Incidence = New Cases / Population at Risk × Time
                </code>
                <p className="text-sm mt-2 italic">
                  Example: 50 new cases of diabetes per 10,000 people per year
                </p>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Prevalence</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  The total number of EXISTING cases (old and new) in a population at a specific point
                  in time.
                </p>
                <code className="text-sm bg-background p-2 rounded block mt-2">
                  Prevalence = Total Cases / Total Population
                </code>
                <p className="text-sm mt-2 italic">
                  Example: 8% of the population currently has diabetes
                </p>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <h4 className="font-semibold text-sm mb-2">Key Relationship</h4>
                <p className="text-sm">
                  Prevalence ≈ Incidence × Duration
                </p>
                <p className="text-sm mt-2">
                  For chronic diseases (long duration), prevalence is much higher than incidence. For
                  acute diseases (short duration), they are closer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Primary, Secondary, and Tertiary Prevention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <strong className="text-sm">Primary Prevention</strong>
                <p className="text-sm mt-1">
                  Prevent disease before it occurs. Target healthy populations.
                </p>
                <p className="text-sm mt-2 italic">
                  Examples: Vaccines, seat belts, health education, clean water
                </p>
              </div>

              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                <strong className="text-sm">Secondary Prevention</strong>
                <p className="text-sm mt-1">
                  Detect and treat disease early, before symptoms appear.
                </p>
                <p className="text-sm mt-2 italic">
                  Examples: Screening programs (mammography, colonoscopy), BP checks
                </p>
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
                <strong className="text-sm">Tertiary Prevention</strong>
                <p className="text-sm mt-1">
                  Reduce complications and disability from established disease.
                </p>
                <p className="text-sm mt-2 italic">
                  Examples: Diabetes management, cardiac rehabilitation, physical therapy
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attack Rate and Case Fatality Rate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Attack Rate</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  The proportion of people exposed to an infectious agent who become ill.
                </p>
                <code className="text-sm bg-background p-2 rounded block mt-2">
                  Attack Rate = People Who Became Ill / Total Exposed
                </code>
                <p className="text-sm mt-2 italic">
                  Example: 30 out of 100 people at a buffet got food poisoning → Attack rate = 30%
                </p>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Case Fatality Rate</strong>
                <p className="text-sm text-muted-foreground mt-1">
                  The proportion of people with a disease who die from it.
                </p>
                <code className="text-sm bg-background p-2 rounded block mt-2">
                  Case Fatality Rate = Deaths from Disease / Total Cases of Disease
                </code>
                <p className="text-sm mt-2 italic">
                  Example: Ebola has a case fatality rate of ~50% (half of infected people die)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Years of Potential Life Lost (YPLL)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                A measure of premature mortality that gives more weight to deaths at younger ages.
              </p>
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Calculation:</strong>
                <p className="text-sm mt-2">
                  For each death, subtract age at death from a reference age (e.g., 75 or life
                  expectancy). Sum across all deaths.
                </p>
                <p className="text-sm mt-3 italic">
                  Example: A 30-year-old dies in a car accident → YPLL = 75 - 30 = 45 years
                </p>
              </div>
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-sm">
                <strong>Why it matters:</strong> YPLL highlights conditions that affect younger people
                (accidents, overdoses, suicide) as public health priorities, even if they cause fewer
                total deaths than diseases of the elderly.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screening" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criteria for Effective Screening Programs</CardTitle>
              <CardDescription>
                Based on WHO and USPSTF guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="default">1</Badge>
                  <div>
                    <strong className="text-sm">Important Health Problem</strong>
                    <p className="text-sm text-muted-foreground">
                      Disease should have significant morbidity/mortality
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="default">2</Badge>
                  <div>
                    <strong className="text-sm">Detectable Pre-clinical Phase</strong>
                    <p className="text-sm text-muted-foreground">
                      Disease must have an early, asymptomatic stage when it can be detected
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="default">3</Badge>
                  <div>
                    <strong className="text-sm">Effective Treatment Available</strong>
                    <p className="text-sm text-muted-foreground">
                      Early treatment must improve outcomes compared to treatment after symptoms appear
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="default">4</Badge>
                  <div>
                    <strong className="text-sm">Acceptable Test</strong>
                    <p className="text-sm text-muted-foreground">
                      Test should be accurate (high Sn/Sp), safe, acceptable to patients, and affordable
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="default">5</Badge>
                  <div>
                    <strong className="text-sm">Benefits Outweigh Harms</strong>
                    <p className="text-sm text-muted-foreground">
                      Screening benefits (lives saved, morbidity reduced) must exceed harms (false
                      positives, overdiagnosis, anxiety)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Screening Biases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                <strong className="text-sm">Lead-Time Bias</strong>
                <p className="text-sm mt-1">
                  Screening detects disease earlier, making survival appear longer, but doesn't actually
                  extend life.
                </p>
                <p className="text-sm mt-2 italic">
                  Example: Cancer detected at age 50 vs 55. Patient dies at 60 either way. Screened
                  patient has "10-year survival," unscreened has "5-year survival," but both lived to 60.
                </p>
              </div>

              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
                <strong className="text-sm">Length-Time Bias</strong>
                <p className="text-sm mt-1">
                  Screening preferentially detects slow-growing (better prognosis) cases and misses
                  fast-growing (worse prognosis) cases.
                </p>
                <p className="text-sm mt-2 italic">
                  Example: Annual mammography is more likely to detect slow-growing breast cancers than
                  aggressive ones that appear and progress between screenings.
                </p>
              </div>

              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                <strong className="text-sm">Overdiagnosis Bias</strong>
                <p className="text-sm mt-1">
                  Screening detects "disease" that would never have caused symptoms or death in the
                  patient's lifetime.
                </p>
                <p className="text-sm mt-2 italic">
                  Example: Prostate cancer detected via PSA screening in an 80-year-old who would have
                  died of other causes before the cancer became symptomatic.
                </p>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md mt-4">
                <h4 className="font-semibold text-sm mb-2">Prevention</h4>
                <p className="text-sm">
                  Use randomized controlled trials comparing screened vs unscreened populations. Measure
                  disease-specific mortality, not just survival time from diagnosis.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Screening Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Breast Cancer (Mammography)</strong>
                <p className="text-sm mt-1">
                  <strong>Who:</strong> Women 50-74 every 2 years (USPSTF Grade B)
                </p>
                <p className="text-sm">
                  <strong>Benefit:</strong> Reduced breast cancer mortality
                </p>
                <p className="text-sm">
                  <strong>Harm:</strong> False positives, overdiagnosis
                </p>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Colorectal Cancer</strong>
                <p className="text-sm mt-1">
                  <strong>Who:</strong> Adults 45-75 (colonoscopy every 10 years or FIT annually)
                </p>
                <p className="text-sm">
                  <strong>Benefit:</strong> Reduced CRC mortality, can remove precancerous polyps
                </p>
                <p className="text-sm">
                  <strong>Harm:</strong> Colonoscopy complications (perforation, bleeding)
                </p>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Cervical Cancer (Pap Smear)</strong>
                <p className="text-sm mt-1">
                  <strong>Who:</strong> Women 21-65 every 3 years (Pap) or 30-65 every 5 years
                  (Pap+HPV)
                </p>
                <p className="text-sm">
                  <strong>Benefit:</strong> Highly effective, can detect and treat precancerous lesions
                </p>
                <p className="text-sm">
                  <strong>Harm:</strong> False positives, anxiety
                </p>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <strong className="text-sm">Lung Cancer (Low-Dose CT)</strong>
                <p className="text-sm mt-1">
                  <strong>Who:</strong> Adults 50-80 with 20 pack-year smoking history
                </p>
                <p className="text-sm">
                  <strong>Benefit:</strong> Reduced lung cancer mortality in high-risk smokers
                </p>
                <p className="text-sm">
                  <strong>Harm:</strong> False positives, radiation exposure, overdiagnosis
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicHealth;
