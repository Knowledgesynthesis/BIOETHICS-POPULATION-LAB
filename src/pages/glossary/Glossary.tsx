import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Search } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  definition: string;
  formula?: string;
  example?: string;
  category: string;
  relatedTerms: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Sensitivity',
    definition: 'The proportion of people with the disease who test positive (true positive rate).',
    formula: 'Sensitivity = TP / (TP + FN)',
    example: 'A test with 90% sensitivity will correctly identify 90% of people who have the disease.',
    category: 'Statistics',
    relatedTerms: ['Specificity', 'PPV', 'NPV', 'Likelihood Ratios'],
  },
  {
    term: 'Specificity',
    definition: 'The proportion of people without the disease who test negative (true negative rate).',
    formula: 'Specificity = TN / (TN + FP)',
    example: 'A test with 95% specificity will correctly identify 95% of people who do not have the disease.',
    category: 'Statistics',
    relatedTerms: ['Sensitivity', 'PPV', 'NPV', 'Likelihood Ratios'],
  },
  {
    term: 'Positive Predictive Value (PPV)',
    definition: 'The proportion of positive test results that are true positives.',
    formula: 'PPV = TP / (TP + FP)',
    example: 'If PPV is 80%, then 80% of people who test positive actually have the disease.',
    category: 'Statistics',
    relatedTerms: ['NPV', 'Sensitivity', 'Specificity', 'Prevalence'],
  },
  {
    term: 'Negative Predictive Value (NPV)',
    definition: 'The proportion of negative test results that are true negatives.',
    formula: 'NPV = TN / (TN + FN)',
    example: 'If NPV is 98%, then 98% of people who test negative truly do not have the disease.',
    category: 'Statistics',
    relatedTerms: ['PPV', 'Sensitivity', 'Specificity', 'Prevalence'],
  },
  {
    term: 'Incidence',
    definition: 'The number of new cases of a disease in a population during a specific time period.',
    formula: 'Incidence = New Cases / Population at Risk × Time',
    example: '50 new cases of diabetes per 10,000 people per year.',
    category: 'Epidemiology',
    relatedTerms: ['Prevalence', 'Attack Rate', 'Incidence Rate'],
  },
  {
    term: 'Prevalence',
    definition: 'The total number of existing cases (old and new) in a population at a specific point in time.',
    formula: 'Prevalence = Total Cases / Total Population',
    example: '8% of the population currently has diabetes.',
    category: 'Epidemiology',
    relatedTerms: ['Incidence', 'Point Prevalence', 'Period Prevalence'],
  },
  {
    term: 'Relative Risk (RR)',
    definition: 'The ratio of the risk of an outcome in the exposed group to the risk in the unexposed group.',
    formula: 'RR = Risk in Exposed / Risk in Unexposed',
    example: 'RR = 2.5 means the exposed group has 2.5 times the risk of the outcome.',
    category: 'Epidemiology',
    relatedTerms: ['Odds Ratio', 'Hazard Ratio', 'Absolute Risk'],
  },
  {
    term: 'Odds Ratio (OR)',
    definition: 'The ratio of the odds of an outcome in the exposed group to the odds in the unexposed group.',
    formula: 'OR = (a/c) / (b/d) = ad/bc',
    example: 'OR = 3.0 means the odds of disease are 3 times higher in the exposed group.',
    category: 'Epidemiology',
    relatedTerms: ['Relative Risk', 'Case-Control Study', 'Logistic Regression'],
  },
  {
    term: 'Autonomy',
    definition: 'The ethical principle of respecting a patient\'s right to make their own healthcare decisions.',
    example: 'Respecting a patient\'s informed refusal of treatment, even if you disagree.',
    category: 'Ethics',
    relatedTerms: ['Beneficence', 'Non-Maleficence', 'Justice', 'Informed Consent'],
  },
  {
    term: 'Beneficence',
    definition: 'The ethical principle of acting in the patient\'s best interest.',
    example: 'Recommending treatments that will benefit the patient.',
    category: 'Ethics',
    relatedTerms: ['Autonomy', 'Non-Maleficence', 'Justice'],
  },
  {
    term: 'Non-Maleficence',
    definition: 'The ethical principle of "do no harm" - avoiding actions that cause harm to patients.',
    example: 'Not providing futile treatment that would cause suffering without benefit.',
    category: 'Ethics',
    relatedTerms: ['Beneficence', 'Autonomy', 'Proportionality'],
  },
  {
    term: 'Justice',
    definition: 'The ethical principle of fair distribution of healthcare resources and equal treatment.',
    example: 'Allocating organs for transplant based on medical criteria, not wealth or status.',
    category: 'Ethics',
    relatedTerms: ['Distributive Justice', 'Procedural Justice', 'Resource Allocation'],
  },
  {
    term: 'Decision-Making Capacity',
    definition: 'The ability to understand, appreciate, reason about, and communicate a healthcare decision.',
    example: 'A patient demonstrates capacity by understanding their diagnosis, treatment options, and consequences.',
    category: 'Ethics',
    relatedTerms: ['Informed Consent', 'Competence', 'Surrogate Decision-Making'],
  },
  {
    term: 'Protected Health Information (PHI)',
    definition: 'Individually identifiable health information held or transmitted by a covered entity.',
    example: 'Patient name, medical record number, diagnosis, treatment information.',
    category: 'HIPAA',
    relatedTerms: ['Covered Entity', 'Business Associate', 'De-identification'],
  },
  {
    term: 'Minimum Necessary Rule',
    definition: 'HIPAA requirement to limit PHI disclosure to the minimum necessary to accomplish the purpose.',
    example: 'When billing for an ER visit, send only ER records, not the entire medical history.',
    category: 'HIPAA',
    relatedTerms: ['PHI', 'Privacy Rule', 'Covered Entity'],
  },
  {
    term: 'Active Error',
    definition: 'An error that occurs at the point of contact between a person and a system.',
    example: 'Administering the wrong medication, operating on the wrong site.',
    category: 'Safety',
    relatedTerms: ['Latent Error', 'Swiss Cheese Model', 'Root Cause Analysis'],
  },
  {
    term: 'Latent Error',
    definition: 'System-level defects that create conditions for active errors to occur.',
    example: 'Poor equipment design, inadequate staffing, look-alike drug packaging.',
    category: 'Safety',
    relatedTerms: ['Active Error', 'Swiss Cheese Model', 'Systems Thinking'],
  },
  {
    term: 'Herd Immunity',
    definition: 'Indirect protection from infectious disease when a sufficient proportion of the population is immune.',
    formula: 'Threshold = 1 - (1/R₀)',
    example: 'For measles (R₀=15), need ~93% vaccination to achieve herd immunity.',
    category: 'Public Health',
    relatedTerms: ['R₀', 'Vaccination', 'Epidemic Threshold'],
  },
  {
    term: 'Basic Reproduction Number (R₀)',
    definition: 'The average number of people one infected person will infect in a completely susceptible population.',
    example: 'COVID-19 original strain had R₀ ≈ 3, meaning each infected person spread to ~3 others.',
    category: 'Public Health',
    relatedTerms: ['Effective R', 'Herd Immunity', 'Epidemic Curve'],
  },
];

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(glossaryTerms.map((t) => t.category)))];

  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTerms = filteredTerms.sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-blue-500" />
          Glossary
        </h1>
        <p className="text-muted-foreground">
          Comprehensive reference of key terms and concepts
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search terms..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted-foreground/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Showing {sortedTerms.length} of {glossaryTerms.length} terms
      </div>

      <div className="space-y-4">
        {sortedTerms.map((term) => (
          <Card key={term.term}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{term.term}</CardTitle>
                <Badge variant="outline">{term.category}</Badge>
              </div>
              <CardDescription>{term.definition}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {term.formula && (
                <div className="p-3 bg-muted rounded-md">
                  <strong className="text-sm">Formula:</strong>
                  <code className="block mt-1 font-mono text-sm">{term.formula}</code>
                </div>
              )}
              {term.example && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                  <strong className="text-sm">Example:</strong>
                  <p className="text-sm mt-1">{term.example}</p>
                </div>
              )}
              {term.relatedTerms.length > 0 && (
                <div>
                  <strong className="text-sm">Related Terms:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {term.relatedTerms.map((related) => (
                      <Badge key={related} variant="secondary" className="text-xs">
                        {related}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedTerms.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No terms found matching your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Glossary;
