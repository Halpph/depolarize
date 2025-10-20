# Changelog - Depolarize

## 2025-01-20

### ✨ New Features

#### Scoring Legend System
- **Added compact scoring legend** to main page ([index.html](index.html))
  - Visual color-coded scale showing 1-10 rating system
  - Two independent dimensions: Misinformation and Hate Speech
  - Expandable/collapsible section with toggle button
  - Responsive design for mobile and desktop
  - Link to full detailed legend page

- **Created comprehensive scoring legend page** ([scoring-legend.html](scoring-legend.html))
  - Beautiful gradient design with modern UI
  - Bilingual (English/Italian) with language toggle
  - 5 detailed score categories with examples:
    - 1-2: Highly Credible (Green)
    - 3-4: Generally Reliable (Blue)
    - 5-6: Moderate Issues (Yellow)
    - 7-8: Serious Problems (Orange)
    - 9-10: Extreme Problems (Red)
  - Visual scale bar showing color progression
  - Methodology explanation section
  - Two-dimensional rating explanation
  - Real examples from database for each category
  - Mobile responsive design

#### New Database Entries
Added 4 new high-profile entries to the database:

1. **Karem Rohana** (ID: 151)
   - Type: Activist
   - Category: Center-Left
   - Scores: Misinformation 3, Hate Speech 1
   - Italian-Palestinian activist, subject of legal actions, Milan court ruled most statements protected speech

2. **Francesca Albanese** (ID: 152)
   - Type: UN Official
   - Category: Center-Left
   - Scores: Misinformation 4, Hate Speech 2
   - UN Special Rapporteur on Palestinian territories, polarized figure

3. **Benjamin Netanyahu** (ID: 153)
   - Type: Politician
   - Category: Right
   - Scores: Misinformation 8, Hate Speech 7
   - Israeli Prime Minister, multiple fact-checks found significant misinformation

4. **Vladimir Putin** (ID: 154)
   - Type: Politician
   - Category: Far-Right
   - Scores: Misinformation 10, Hate Speech 9
   - Russian President, systematic disinformation campaigns documented

5. **Francesco Giubilei** (ID: 155)
   - Type: Journalist
   - Category: Right
   - Scores: Misinformation 5, Hate Speech 4
   - Conservative journalist and political advisor, close to Fratelli d'Italia

### 📚 Documentation

- **Created comprehensive guide** ([ADDING_ENTRIES_GUIDE.md](ADDING_ENTRIES_GUIDE.md))
  - Step-by-step research process for adding new entries
  - Detailed scoring methodology and criteria
  - Political categorization guidelines
  - Fact-checking source recommendations
  - Quality checklist for entries
  - Examples across scoring spectrum
  - Common pitfalls to avoid
  - CSV formatting requirements

### 🎨 UI/UX Improvements

- Added visual scoring explanation directly in main page
- Color-coded scale segments (green to red) for instant understanding
- Hover tooltips on scale segments with detailed descriptions
- Smooth transitions and animations
- Consistent design language with existing site theme
- Improved user education about rating methodology

### 🔧 Technical Changes

- Updated [styles.css](styles.css) with new `.scoring-legend-compact` styles
- Added `toggleLegend()` function to [script.js](script.js)
- Responsive breakpoints for mobile devices
- Accessibility improvements with ARIA labels
- SEO optimization maintained

---

## Database Stats
- **Total Entries**: 155 (up from 150)
- **Date Updated**: 2025-01-20
- **Coverage**: Italian and international figures with Italian relevance
- **Languages**: IT and EN entries

## What's Next?
- Continue monitoring for new entries
- Regular updates based on new fact-checks
- Community contributions via GitHub
- Potential API development for programmatic access
