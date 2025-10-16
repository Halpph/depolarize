# Italian Media & Public Figures Directory

A bilingual (English/Italian) website displaying information about Italian media outlets, politicians, and public figures with their social media presence. The site separates sources into two categories: misinformation sources and factual/reliable sources, with visual danger indicators.

## Features

- **Bilingual Support**: Automatic language detection (Italian/English) with manual toggle
- **Two-Page System**:
  - Misinformation Sources (scores > 3)
  - Factual & Reliable Sources (scores ≤ 3)
- **Danger Score Indicators**: Visual color-coded scores for misinformation and hate speech (1-10 scale)
  - 🟢 Minimal (1-2): Green
  - 🟡 Low (3-4): Yellow
  - 🟠 Medium (5-6): Orange
  - 🔴 High (7-8): Red
  - ⚫ Extreme (9-10): Dark red with pulsing animation
- **Search functionality**: Search by name
- **Filter options**: Filter by Type and Category
- **Social media links**: Direct links to Facebook and Instagram profiles (only shows entries with social media)
- **Detailed descriptions**: Context about why sources are reliable or unreliable
- **Responsive design**: Works perfectly on desktop, tablet, and mobile devices
- **Clean interface**: Modern, professional design with smooth animations

## How to Deploy on GitHub Pages

1. **Create a new repository on GitHub** (or use this one if already on GitHub)

2. **Push these files to your repository**:
   ```bash
   git init
   git add index.html styles.css script.js list.csv README.md
   git commit -m "Initial commit: Italian Media Directory website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" section in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your website**:
   - After a few minutes, your site will be available at:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Files Structure

- `index.html` - Main HTML structure with bilingual support
- `styles.css` - All styling, responsive design, and score indicators
- `script.js` - JavaScript for CSV parsing, filtering, translations, and dynamic rendering
- `list.csv` - Data source with information about media and public figures
- `README.md` - This file

## How It Works

### Language Detection
- Automatically detects browser language on page load
- Defaults to Italian for Italian browsers, English for others
- Manual toggle button in the header to switch languages

### Scoring System
The website uses two scoring metrics (1-10 scale):
- **Misinformation Score**: Frequency and severity of false information
- **Hate Speech Score**: Level of inflammatory, discriminatory content

Sources are categorized:
- **Factual Sources**: Misinformation Score ≤ 3
- **Misinformation Sources**: Misinformation Score > 3

### Visual Indicators
Each entry displays two score badges with color coding:
- Scores 9-10: Extreme danger (dark red with pulse animation)
- Scores 7-8: High danger (red)
- Scores 5-6: Medium concern (orange)
- Scores 3-4: Low concern (yellow)
- Scores 1-2: Minimal concern (green)

## Local Testing

To test locally, you can use any simple HTTP server:

### Option 1: Using Python
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Option 2: Using Node.js
```bash
npx serve

# Then open the URL shown in your terminal
```

### Option 3: Using VS Code
Install the "Live Server" extension and right-click on index.html → "Open with Live Server"

## Database Statistics

- **Total Entries**: 223 sources
- **Individuals**: 191 (media figures, politicians, journalists, activists, influencers)
- **Organizations**: 32 (parties, unions, NGOs, associations, movements)
- **With Social Media**: ~195 entries (displayed on website)
- **Categories**: Media outlets, political parties, journalists, politicians, labor unions, NGOs, humanitarian organizations, environmental groups, anti-mafia associations, LGBTQ+ rights groups, business associations, religious organizations, youth movements, fact-checkers, historians, scientists, satirists
- **Coverage**: From extreme far-right (score 10/10) to international NGOs and academic authorities (score 1/1)
- **Languages**: Full bilingual support (English/Italian)
- **Political Spectrum**: Complete coverage from far-right to left including all major Italian political parties and civil society organizations

## Data Format

The CSV file contains the following columns:
- ID
- Name
- Type (Media, Politician, Organization, etc.)
- Category (Far-Right, Right, Center, Center-Left, etc.)
- Misinformation_Score
- Hate_Speech_Score
- Description
- Description_IT
- Fact_Check_Sources
- Facebook (URL)
- Instagram (URL)
- Website (URL)
- Last_Updated

## Customization

You can easily customize the website by:
- Editing colors in `styles.css` (look for the gradient colors: `#667eea` and `#764ba2`)
- Modifying the header text in `index.html`
- Adding more filter options in `script.js`
- Updating the CSV data in `list.csv`

## Browser Compatibility

Works with all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

This is a simple data display website. Data sources are cited in the footer.

## Credits

Data sources include:
- Facta.news
- Pagella Politica
- BUTAC (Bufale Un Tanto Al Chilo)
- Various fact-checking organizations
