# Guide: Adding Entries to list.csv

This guide explains the research process and methodology for adding new entries to the Depolarize database (list.csv).

## Overview

The Depolarize database is a comprehensive catalog of Italian (and internationally influential) media outlets, journalists, politicians, activists, and public figures, ranked based on their credibility, misinformation patterns, and hate speech levels.

**Important**: This database includes figures across the entire political spectrum - from far-right to far-left, from high misinformation to high credibility. The goal is comprehensive mapping, not just documenting problematic sources.

## CSV Structure

Each entry contains the following fields:

| Field | Description | Example |
|-------|-------------|---------|
| `ID` | Sequential number | 151 |
| `Name` | Full name or organization | Karem Rohana |
| `Type` | Entity type (English) | Activist |
| `Type_IT` | Entity type (Italian) | Attivista |
| `Category` | Political category (English) | Center-Left |
| `Category_IT` | Political category (Italian) | Centro-Sinistra |
| `Misinformation_Score` | 1-10 scale (1=highly credible, 10=extreme misinformation) | 3 |
| `Hate_Speech_Score` | 1-10 scale (1=no hate speech, 10=extreme hate speech) | 1 |
| `Description` | English description (2-4 sentences) | See format below |
| `Description_IT` | Italian description (2-4 sentences) | See format below |
| `Fact_Check_Sources` | URLs separated by ` \| ` | https://example.com \| https://example2.com |
| `Facebook` | Facebook URL | https://www.facebook.com/username |
| `Instagram` | Instagram URL | https://www.instagram.com/username/ |
| `Website` | Official website | https://example.com |
| `Last_Updated` | YYYY-MM format | 2025-01 |
| `Source_Language` | IT or EN | IT |

## Research Process

### Step 1: Initial Web Search

Start with comprehensive web searches to gather basic information:

```
Web searches to perform:
1. "[Name] Italian journalist/politician/activist"
2. "[Name] fact check credibility sources"
3. "[Name] controversy misinformation"
4. "[Name] social media Instagram Facebook"
```

**Tools**: Use WebSearch tool for real-time information.

### Step 2: Identify Entity Type

Determine the appropriate type:

**Common Types:**
- `Media` / `Media` - News outlets, TV channels, newspapers
- `Journalist` / `Giornalista` - Individual journalists, TV hosts, columnists
- `Politician` / `Politico` - Elected officials, party leaders
- `Activist` / `Attivista` - Social activists, influencers with advocacy focus
- `Social Media Page` / `Pagina Social Media` - Facebook/Instagram pages
- `TV Program` / `Programma TV` - Specific TV shows
- `Political Party` / `Partito Politico` - Political organizations
- `Organization` / `Organizzazione` - NGOs, movements, groups
- `Academic` / `Accademico` - Professors, researchers with public influence
- `Philosopher` / `Filosofo` - Public intellectuals
- `Criminal` / `Criminale` - For individuals convicted of serious crimes

### Step 3: Determine Political Category

Categorize political leaning based on positions, rhetoric, and affiliations:

**Categories:**
- `Far-Right` / `Estrema Destra` - Extreme nationalist, xenophobic, or neo-fascist positions
- `Right` / `Destra` - Conservative, traditional right-wing
- `Center-Right` / `Centro-Destra` - Moderate conservative
- `Center` / `Centro` - Centrist, non-aligned
- `Center-Left` / `Centro-Sinistra` - Moderate progressive
- `Left` / `Sinistra` - Progressive, left-wing
- `Far-Left` / `Estrema Sinistra` - Radical left positions
- `Populist` / `Populista` - Anti-establishment, mixed positions
- `Pro-Russia` / `Pro-Russia` - Pro-Russian stance (can overlap with other categories)

### Step 4: Research Misinformation Pattern

**Misinformation Score (1-10):**

Score based on documented fact-checks, verification, and credibility:

- **1-2**: Highly credible, fact-based, rare errors
  - Example: Marco Cappato (2) - Fact-based civil rights activism

- **3-4**: Generally reliable, occasional inaccuracies
  - Example: Karem Rohana (3) - Generally fact-based with one defamation ruling
  - Example: RAI 3 (4) - Mostly reliable with some political bias

- **5-6**: Moderate issues, frequent inaccuracies
  - Example: Matteo Renzi (6) - Multiple fact-checks found errors in statistics
  - Example: Giorgia Meloni (6) - Several inaccurate public statements

- **7-8**: Serious misinformation pattern, conspiracy theories
  - Example: Diego Fusaro (8) - Known conspiracy theorist
  - Example: Mario Giordano (8) - Multiple sanctions for false claims

- **9-10**: Extreme misinformation, propaganda, systematic lying
  - Example: VoxNews (10) - Extreme far-right with constant disinformation
  - Example: Welcome to Favelas (9) - Known for racist propaganda

**Research sources:**
- https://pagellapolitica.it/ (Italian fact-checking)
- https://facta.news/ (Italian fact-checking)
- https://www.butac.it/ (Italian debunking)
- https://mediabiasfactcheck.com/ (International media bias ratings)
- NewsGuard ratings
- Academic papers and media analysis
- Court rulings and journalist sanctions

### Step 5: Research Hate Speech Pattern

**Hate Speech Score (1-10):**

Score based on documented instances of discriminatory language:

- **1-2**: No hate speech, respectful discourse
  - Example: Matteo Hallissey (1) - Civil rights advocacy, no hate speech

- **3-4**: Occasional controversial statements, no systematic hate
  - Example: Bruno Vespa (4) - Biased but not hateful

- **5-6**: Some discriminatory rhetoric, not extreme
  - Example: Claudio Borghi (7) - Some inflammatory statements

- **7-8**: Regular hate speech, discriminatory language
  - Example: Vittorio Feltri (9) - Multiple sanctions for offensive statements
  - Example: Alessandra Mussolini (9) - Known for controversial statements on race

- **9-10**: Extreme hate speech, incitement, racism
  - Example: Welcome to Favelas (10) - Systematic racist content
  - Example: VoxNews (10) - Extreme Islamophobia and racism

**Focus areas:**
- Anti-immigrant rhetoric
- Islamophobia
- Antisemitism
- Racism
- Homophobia/transphobia
- Misogyny
- Discrimination against Roma communities
- Discriminatory statements about Southern Italians

### Step 6: Write Descriptions

**English Description Format:**
- 2-4 sentences
- First sentence: Role/position and primary identification
- Second sentence: Main controversies, fact-check findings, or credibility notes
- Third sentence (if needed): Specific examples, legal issues, or additional context
- Use active voice and factual tone

**Example (High credibility):**
> "Italian-Palestinian activist and social media influencer known as 'Karem from Haifa' (@karem_from_haifa, 267K followers). Uses Instagram to document Palestinian experiences and critique Israeli policies. Subject of multiple legal actions by Italian politicians and officials including defamation lawsuits. Milan Tribunal (March 2024) ruled most statements protected free speech, though one plagiarism claim deemed potentially defamatory."

**Example (Low credibility):**
> "Far-right online news site. Known for extreme anti-immigrant content, Islamophobia, racism, and frequent misinformation. One of most problematic Italian sources."

**Italian Description:**
- Translate the English description maintaining the same structure
- Use appropriate Italian terminology
- Ensure dates and proper nouns remain consistent

### Step 7: Gather Fact-Check Sources

**Priority sources:**
1. https://pagellapolitica.it/ - Italian political fact-checking
2. https://facta.news/ - Italian fact-checking
3. https://www.butac.it/ - Italian debunking site
4. Wikipedia articles (both English and Italian)
5. Court rulings and official documents
6. Reputable news organizations (BBC, Guardian, Reuters)
7. Academic research and media analysis
8. Professional sanctions (Order of Journalists)

**Format:** URLs separated by ` | ` (space-pipe-space)

Example:
```
https://www.strali.org/en/project/il-caso-di-karem-rohana/ | https://www.arabnews.com/node/2398326/media | https://notizie.it/en/Karem-Rohana-and-the-fight-for-the-truth-about-Palestine/
```

### Step 8: Find Social Media Links

**Search for:**
1. Official Facebook page
2. Official Instagram account (include trailing slash)
3. Official website

**Verification:**
- Check for verification badges
- Confirm follower counts match expected reach
- Ensure it's the official account, not fan pages

**Notes:**
- Leave blank if no official presence
- For Facebook: Use full URL format `https://www.facebook.com/username`
- For Instagram: Use full URL format with trailing slash `https://www.instagram.com/username/`

### Step 9: Determine Source Language

- `IT` - If the person/entity primarily operates in Italian context
- `EN` - If primarily international/English-speaking (e.g., CNN, Fox News, Tucker Carlson)

## Adding the Entry

### Finding the Next ID

```bash
tail -1 /home/alessio/repos/depolarize/list.csv
```

Add 1 to the last ID number.

### Format Requirements

**Critical formatting rules:**
1. **Descriptions must be in double quotes** because they contain commas
2. **URLs separated by ` | `** (space-pipe-space) not just pipe
3. **No line breaks** - entire entry on one line
4. **Instagram URLs end with /** - `https://www.instagram.com/username/`
5. **Date format:** `2025-01` (YYYY-MM)
6. **Trailing comma:** Ensure proper comma placement between all fields

### Example Entry

```csv
151,Karem Rohana,Activist,Attivista,Center-Left,Centro-Sinistra,3,1,"Italian-Palestinian activist and social media influencer known as 'Karem from Haifa' (@karem_from_haifa, 267K followers). Uses Instagram to document Palestinian experiences and critique Israeli policies. Subject of multiple legal actions by Italian politicians and officials including defamation lawsuits. Milan Tribunal (March 2024) ruled most statements protected free speech, though one plagiarism claim deemed potentially defamatory. Victim of alleged hate crime assault in Rome (October 2023). Generally fact-based activism with occasional controversial statements.","Attivista italo-palestinese e influencer social noto come 'Karem from Haifa' (@karem_from_haifa, 267K follower). Usa Instagram per documentare esperienze palestinesi e criticare politiche israeliane. Oggetto di multiple azioni legali da politici e funzionari italiani incluse cause per diffamazione. Tribunale di Milano (marzo 2024) ha stabilito che la maggior parte delle dichiarazioni erano protette dalla libertà di parola, anche se un'affermazione sul plagio è stata ritenuta potenzialmente diffamatoria. Vittima di presunta aggressione con crimine d'odio a Roma (ottobre 2023). Attivismo generalmente basato sui fatti con dichiarazioni occasionalmente controverse.",https://www.strali.org/en/project/il-caso-di-karem-rohana/ | https://www.arabnews.com/node/2398326/media | https://notizie.it/en/Karem-Rohana-and-the-fight-for-the-truth-about-Palestine/,,https://www.instagram.com/karem_from_haifa/,,2025-01,IT
```

## Quality Checklist

Before submitting an entry, verify:

- [ ] ID is sequential and unique
- [ ] Name is correctly spelled
- [ ] Type/Type_IT pair matches standard categories
- [ ] Category/Category_IT pair matches standard categories
- [ ] Misinformation score (1-10) is justified by research
- [ ] Hate speech score (1-10) is justified by research
- [ ] English description is 2-4 sentences, factual, cited
- [ ] Italian description accurately translates English version
- [ ] Fact-check sources are reputable and relevant (minimum 1)
- [ ] Social media links are verified (or blank if none)
- [ ] Website is official (or blank if none)
- [ ] Last_Updated is current month in YYYY-MM format
- [ ] Source_Language is IT or EN based on primary context
- [ ] Entire entry is on one line with proper CSV escaping
- [ ] Descriptions are in double quotes
- [ ] No trailing/leading spaces in fields

## Scoring Philosophy

**Important principles:**

1. **Evidence-based**: All scores must be backed by documentable evidence (fact-checks, court rulings, professional sanctions, credible reporting)

2. **Spectrum representation**: The database includes the full spectrum from highly credible (scores 1-3) to highly problematic (scores 8-10)

3. **Not just far-right**: Include credible left-wing, centrist, and center-right figures to provide balanced context

4. **Separate dimensions**: Misinformation and hate speech are evaluated independently
   - Someone can have low misinformation but high hate speech (e.g., controversial but factual statements)
   - Someone can have high misinformation but low hate speech (e.g., conspiracy theories without targeting groups)

5. **Context matters**:
   - Political bias ≠ misinformation (having a viewpoint is different from spreading false information)
   - Controversial ≠ hateful (provocative statements need to be evaluated for actual hate speech)

6. **Victim vs. perpetrator**: Those who are victims of hate crimes or false accusations should be scored based on their own output, not what's said about them

## Examples by Score Range

### Highly Credible (Misinformation: 1-3, Hate Speech: 1-2)
- Marco Cappato (2, 1) - Fact-based civil rights activist
- Matteo Hallissey (2, 1) - Young liberal politician with civil disobedience campaigns
- Karem Rohana (3, 1) - Generally fact-based activist with one controversial statement

### Moderate Issues (Misinformation: 4-6, Hate Speech: 3-5)
- RAI 1 (6, 4) - Government-influenced but professional standards
- Matteo Renzi (6, 3) - Politician with some statistical errors
- Giorgia Meloni (6, 7) - PM with some inaccuracies and nationalist rhetoric

### Serious Problems (Misinformation: 7-8, Hate Speech: 6-8)
- Diego Fusaro (8, 7) - Conspiracy theorist
- Mario Giordano (8, 9) - Sanctioned for racist statements
- Matteo Salvini (8, 9) - Multiple fact-check failures and discriminatory rhetoric

### Extreme Problems (Misinformation: 9-10, Hate Speech: 9-10)
- VoxNews (10, 10) - Extreme far-right disinformation site
- Welcome to Favelas (9, 10) - Racist propaganda page
- Tucker Carlson (9, 9) - White supremacist rhetoric and conspiracy theories

## Common Pitfalls

1. **Conflating political bias with misinformation**: A left-wing or right-wing perspective doesn't automatically mean misinformation
2. **Ignoring credible sources**: Don't only add problematic figures - credible voices across the spectrum are equally important
3. **Insufficient research**: Always check multiple fact-checking sources
4. **Emotional scoring**: Base scores on evidence, not personal political views
5. **Missing context**: Include legal rulings, professional sanctions, and documented incidents
6. **Poor source quality**: Prioritize established fact-checkers over opinion pieces

## Maintenance

- Update entries when new fact-checks emerge
- Add new legal rulings or sanctions
- Refresh Last_Updated when making significant changes
- Keep descriptions concise but comprehensive
- Monitor for changes in social media presence

## Questions?

When in doubt:
1. Check similar entries for formatting guidance
2. Prioritize fact-checking sources over opinion
3. Lower scores = more credible, higher scores = more problematic
4. Include both English and Italian sources when available
5. Document everything with reputable sources
