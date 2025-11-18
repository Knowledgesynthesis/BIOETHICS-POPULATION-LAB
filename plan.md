# BIOETHICS & POPULATION LAB — OPTIMIZED MASTER PROMPT FOR EDUCATIONAL APP GENERATION

A clinically rigorous, guideline-aligned master prompt for generating a **mobile-first, offline-capable, dark-mode educational app** that teaches biostatistics, population health, evidence interpretation, and medical ethics — the essential triad of **Step 3, board exams, residency practice, and real-world clinical reasoning**.

---

## MASTER PROMPT — BioEthics & Population Lab Educational App Generator (SPECIALIZED VERSION)

## Role & Mission
You are a cross-functional team:
PM, Staff Engineer, Senior Instructional Designer, Biostatistics SME, Epidemiology SME, Clinical Research SME, Bioethics SME, Public Health SME, Risk/Safety SME, HIPAA/Legal SME, UX Writer, and QA.

Your mission is to produce an **interactive learning app** that teaches:
- Biostatistics (Sn/Sp, PPV/NPV, likelihood ratios, incidence, prevalence, hazard ratios)
- Population health & research methodology
- Clinical trials and study design
- Interpreting abstracts, graphs, tables, and data
- Medical ethics: consent, capacity, refusal of care, confidentiality, surrogate decision-making, end-of-life care
- HIPAA rules, patient safety, medical errors, risk reduction, systems-based thinking
- Public health frameworks and policies (screening programs, outbreak response, vaccination policy)

The app must:
- Be **mobile-first, dark mode, offline-ready**
- Maintain **evidence-based, guideline-consistent** reasoning (USPSTF, CDC, HIPAA standards, AMA Code of Ethics)
- Use only **synthetic examples**, no real PHI
- Be visually intuitive, clinically serious, and exam-ready

---

## Inputs (Fill These)

Primary Topics:
- Diagnostic test characteristics (sensitivity, specificity, PPV, NPV, LR+ and LR–)
- Epidemiologic metrics (incidence, prevalence, risk, odds, hazard ratios)
- Clinical research: study design, RCTs, cohort/case-control, biases, confounding, effect modification
- Statistical interpretation: p-values, confidence intervals, power, Type I/II error (conceptual), forest plots, survival curves
- Abstract interpretation: tables, graphs, Kaplan–Meier curves
- Ethics:
  - Consent, refusal, decision-making capacity
  - Surrogate hierarchy, end-of-life planning, advance directives
  - Confidentiality, exceptions to confidentiality
  - Mandated reporting
- HIPAA:
  - PHI, covered entities, permitted disclosures
  - Minimum necessary rule
  - Privacy vs security rules (conceptual)
- Safety & Errors:
  - Latent vs active errors
  - Swiss Cheese model (conceptual)
  - Root-cause analysis
  - Protocols for medication errors, handoffs
- Public health:
  - Outbreak control
  - Screening strategies
  - Community-level interventions

Target Learner Levels: {{LEVELS}}  
Learner Context: {{CONTEXT}}  
Learning Outcomes: {{LEARNING_OBJECTIVES}}  
Constraints: *mobile-first, dark mode, offline-ready, evidence-based, synthetic data only*  
References: {{REFERENCES}}  
Brand/Voice: {{VOICE_TONE}}  
Locale: {{LOCALE}}

---

## 1. Executive Summary

Medical trainees often struggle to integrate:
- biostatistics  
- study design  
- research interpretation  
- ethics  
- public health  
- safety systems  

BioEthics & Population Lab unifies these into a **single interactive learning environment**.

Alternate names:
- PopHealth MD – “Statistics, ethics, and systems thinking, simplified.”
- StudySense – “Interpret research like a pro.”
- EthicsStat Tutor – “Where biostats meets clinical ethics.”

---

## 2. Personas & Use Cases

Personas:
- Resident preparing for Step 3
- Medical student struggling with biostats interpretation
- Research trainee reading abstracts
- Clinician refreshing HIPAA and ethics knowledge
- Quality improvement resident learning safety systems

Use Cases:
- Exam prep
- Research rotation support
- Ethics consult preparation
- Hospital orientation modules
- Public health coursework

---

## 3. Curriculum Map & Knowledge Graph

### Biostatistics Core
- Sensitivity, specificity
- Predictive values (PPV/NPV)
- Likelihood ratios
- Incidence vs prevalence
- Risk, odds, relative risk, odds ratio
- Hazard ratios and survival analysis (conceptual)
- Confounding vs effect modification

### Study Design & Clinical Trials
- RCTs
- Cohort and case-control studies
- Cross-sectional and ecological designs
- Biases: selection, recall, misclassification, lead-time, length-time
- Sample size and power (conceptual)
- Allocation concealment, blinding, intention-to-treat

### Abstract & Data Interpretation
- Tables and 2x2 structures
- Kaplan–Meier curves (conceptual)
- Forest plots (conceptual)
- Diagnostic test graphs
- Prevalence vs PPV changes

### Ethics
- Autonomy, beneficence, non-maleficence, justice
- Decision-making capacity
- Informed consent
- Confidentiality and exceptions
- End-of-life care
- Surrogate decision hierarchy
- Ethical dilemmas in resource allocation

### Safety & Quality
- Error types (active vs latent)
- Swiss Cheese model
- Root-cause analysis
- Handoff safety
- Medication error reduction
- Preventability vs non-preventability

### Public Health & Population Medicine
- Screening strategies
- Outbreak investigation basics
- Vaccination principles
- Herd immunity (conceptual)
- Community-level interventions

### HIPAA
- PHI definitions
- Permitted uses and disclosures
- Minimum necessary rule
- Research disclosures (conceptual)
- Privacy and security rule distinctions

Knowledge Graph Links:
Concept → Definition → Formula/Framework → Example → Interpretation → Pitfalls → Related Ethical/Policy Considerations

---

## 4. Interactive Specs

### Stats Playground
- Adjust sensitivity/specificity → visualize PPV/NPV changes
- See influence of prevalence
- Compute LR+, LR– with sliders

### Study Design Builder
- Construct hypothetical studies
- Identify biases and confounding

### Kaplan–Meier Explorer
- Interactive survival curves with hazard ratio explanation

### Abstract Analyzer
- Synthetic abstract with tables/graphs
- User extracts the key statistic and meaning

### Ethics Navigator
- Case-based decision-making for:
  - Consent
  - Capacity
  - Surrogate choice
  - Confidentiality exceptions

### Safety Lab Simulator
- Root-cause analysis builder
- Identify latent vs active errors in a synthetic case

### HIPAA Compliance Challenge
- Decide whether information sharing is permitted
- Apply minimum necessary rule

### Public Health Policy Simulator
- Choose interventions during synthetic outbreaks
- Evaluate impact on incidence/prevalence

---

## 5. Assessment & Mastery

Item types:
- MCQs (interpretation, ethics, HIPAA)
- Matching (study design ↔ appropriate use)
- Scenario-based: “Does this patient have capacity?”
- Error classification exercises
- Abstract interpretation items

Provide 10–20 sample items with rationales.

---

## 6. Reasoning Framework

Teach universal steps:

1. Identify the metric or ethical rule  
2. Understand the formula or framework  
3. Interpret in context (population or patient)  
4. Apply guideline or ethical principle  
5. Anticipate downstream effects  
6. Avoid common pitfalls  

Pitfalls include:
- Confusing OR with RR
- Thinking PPV/NPV are intrinsic to test
- Misinterpreting hazard ratios
- Forgetting exceptions to confidentiality
- Overlooking minimum necessary rule
- Misclassifying study bias types

---

## 7. Accessibility & Safety
- WCAG 2.2 AA  
- No PHI  
- HIPAA content is conceptual, not legal advice  
- Ethics guidance is educational, not binding  
- Visuals optimized for dark mode  
- Inclusive scenarios  

---

## 8. Tech Architecture

Stack:
- React, TypeScript  
- Tailwind, shadcn/ui  
- Zustand/Redux  
- IndexedDB + Service Worker  
- D3/Recharts for statistical visualizations  

Structure:
- /stats  
- /study-design  
- /ethics  
- /safety  
- /hipaa  
- /public-health  
- /cases  
- /assessment  
- /glossary  
- /settings  

---

## 9. Data Model (Plain-text JSON examples)

    {
      "id": "sens_spec",
      "concept": "Sensitivity and Specificity",
      "definition": "Common diagnostic test characteristics",
      "interactive": "PPV/NPV visualizer",
      "pitfalls": ["Not affected by disease prevalence"],
      "related": ["Predictive values", "Likelihood ratios"]
    }

    {
      "id": "capacity_case",
      "scenario": "Patient refusing treatment",
      "key_questions": ["Can they understand?", "Can they communicate a choice?"],
      "correct_logic": "Assess capacity before labeling refusal as invalid"
    }

---

## 10. Screen Specs & Wireframes

### Stats Lab
- Graph cards
- Sliders for prevalence, Sn, Sp

### Study Design Hub
- Builder for hypothetical studies
- Bias identification exercises

### Ethics Center
- Case cards
- Decision branches

### Safety & Quality Page
- Error classification tool
- RCA builder

### HIPAA Zone
- Disclosure decision simulator

### Public Health Dashboard
- Outbreak curve simulations

### Case Engine
- Multi-step clinical research/ethics scenarios

### Assessment
- Randomized quiz sets with feedback

---

## 11. Copy & Content Kit

Examples:

Sensitivity/Specificity:
- “Sensitivity is the true positive rate; specificity is the true negative rate.”

Ethics:
- “Capacity is task-specific, not global or permanent.”

HIPAA:
- “Minimum necessary rule: disclose only what is needed for the task.”

Safety:
- “Latent errors are system-level defects that enable active errors.”

Public Health:
- “Incident cases reflect new occurrences; prevalence includes all existing cases.”

---

## 12. Analytics & A/B Plan
- Compare visual vs numeric stats teaching
- Compare card vs tree layout in ethics module
- Evaluate error-identification speed as learning metric

---

## 13. QA Checklist
- Validate stats against standard references
- Confirm ethics content aligns with AMA Code of Ethics
- Confirm HIPAA content follows official definitions
- Ensure no contradictory public health statements
- Verify synthetic nature of all cases

---

## 14. Roadmap
- M0: Biostatistics + Ethics modules
- M1: HIPAA + Safety/Quality
- M2: Study Design + Abstract Interpretation
- M3: Personalized pathways + spaced repetition

---

## Acceptance Criteria
- Learners interpret diagnostic and research statistics correctly
- Learners apply ethical principles with consistency
- Learners classify safety events accurately
- Learners understand HIPAA fundamentals
- App maintains unified BioEthics & Population Lab reasoning map

---

## Now Generate
Using the inputs above, produce the deliverables in the required order.  
If any inputs are missing, make reasonable, evidence-based assumptions and label them as defaults.
