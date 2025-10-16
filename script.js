// Parse CSV data
let allData = [];
let filteredData = [];
let currentPage = 'misinformation'; // 'misinformation' or 'factual'
let currentLanguage = 'en'; // 'en' or 'it'
let currentSort = { column: null, ascending: true };
let darkMode = false;

// Pagination
let currentPaginationPage = 1;
let itemsPerPage = 50;
let totalPages = 1;

// Translations
const translations = {
    en: {
        mainTitle: 'Depolarize',
        mainSubtitle: 'Depolarize your feed. Reclaim your mind. A comprehensive list of Italian media outlets, politicians, and public figures with their social media presence',
        disclaimerText: '<strong>Disclaimer:</strong> The information in this directory has been gathered from external fact-checking organizations and public sources. The categorizations and reliability scores represent aggregated assessments from these sources and do not reflect my personal judgment. This is an educational resource intended to help users make informed decisions about their media consumption.',
        disclaimerContribute: 'Want to contribute? This is a community-driven project. You can submit corrections or additions via pull request on <a href="https://github.com/Halpph/depolarize" target="_blank">GitHub</a>.',
        misinfoTitle: 'Misinformation Sources',
        factualTitle: 'Factual & Reliable Sources',
        misinfoBtn: 'Misinformation Sources',
        factualBtn: 'Factual & Reliable Sources',
        searchLabel: 'Search:',
        searchPlaceholder: 'Search by name...',
        typeLabel: 'Filter by Type:',
        categoryLabel: 'Filter by Category:',
        allTypes: 'All Types',
        allCategories: 'All Categories',
        showing: 'Showing',
        of: 'of',
        entries: 'entries',
        nameHeader: 'Name',
        typeHeader: 'Type',
        categoryHeader: 'Category',
        descriptionHeader: 'Description',
        socialHeader: 'Social Media',
        noResults: 'No results found',
        ctaTitle: 'Take Action for Better Information',
        ctaText: 'Consider <strong>unfollowing or being critical of misinformation sources</strong> identified below, and instead <strong>follow factual and reliable sources</strong>. Your media diet shapes your understanding of the world—choose sources that prioritize accuracy and fact-checking.',
        footerUpdated: 'Last Updated: January 2025',
        footerSources: 'Data sources: Fact-checking organizations including Facta.news, Pagella Politica, and BUTAC'
    },
    it: {
        mainTitle: 'Depolarize',
        mainSubtitle: 'Depolarizza il tuo feed. Riconquista il tuo pensiero. Una lista completa di testate giornalistiche, politici e personaggi pubblici italiani con la loro presenza sui social media',
        disclaimerText: '<strong>Avviso:</strong> Le informazioni contenute in questa directory sono state raccolte da organizzazioni di fact-checking esterne e fonti pubbliche. Le categorizzazioni e i punteggi di affidabilità rappresentano valutazioni aggregate da queste fonti e non riflettono il mio giudizio personale. Questa è una risorsa educativa destinata ad aiutare gli utenti a prendere decisioni informate sul loro consumo di media.',
        disclaimerContribute: 'Vuoi contribuire? Questo è un progetto guidato dalla comunità. Puoi inviare correzioni o aggiunte tramite pull request su <a href="https://github.com/Halpph/depolarize" target="_blank">GitHub</a>.',
        misinfoTitle: 'Fonti di Disinformazione',
        factualTitle: 'Fonti Affidabili e Verificate',
        misinfoBtn: 'Fonti di Disinformazione',
        factualBtn: 'Fonti Affidabili',
        searchLabel: 'Cerca:',
        searchPlaceholder: 'Cerca per nome...',
        typeLabel: 'Filtra per Tipo:',
        categoryLabel: 'Filtra per Categoria:',
        allTypes: 'Tutti i Tipi',
        allCategories: 'Tutte le Categorie',
        showing: 'Visualizzazione',
        of: 'di',
        entries: 'voci',
        nameHeader: 'Nome',
        typeHeader: 'Tipo',
        categoryHeader: 'Categoria',
        descriptionHeader: 'Descrizione',
        socialHeader: 'Social Media',
        noResults: 'Nessun risultato trovato',
        ctaTitle: 'Agisci per una Migliore Informazione',
        ctaText: 'Considera di <strong>smettere di seguire o essere critico delle fonti di disinformazione</strong> identificate qui sotto, e invece <strong>segui fonti affidabili e verificate</strong>. La tua dieta mediatica plasma la tua comprensione del mondo—scegli fonti che danno priorità all\'accuratezza e al fact-checking.',
        footerUpdated: 'Ultimo Aggiornamento: Gennaio 2025',
        footerSources: 'Fonti dati: Organizzazioni di fact-checking tra cui Facta.news, Pagella Politica e BUTAC'
    }
};

// Function to parse CSV
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        // Handle CSV parsing with proper quote handling
        const values = [];
        let currentValue = '';
        let insideQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());

        // Create object from values
        const entry = {};
        headers.forEach((header, index) => {
            entry[header.trim()] = values[index] || '';
        });

        data.push(entry);
    }

    return data;
}

// Check if entry has social media
function hasSocialMedia(entry) {
    return entry.Facebook || entry.Instagram;
}

// Check if entry is factual (Misinformation_Score <= 3) or misinformation (> 3)
function isFactual(entry) {
    const score = parseInt(entry.Misinformation_Score);
    return score <= 3;
}

// Get data for current page
function getPageData() {
    const dataWithSocial = allData.filter(hasSocialMedia);

    if (currentPage === 'factual') {
        const factualData = dataWithSocial.filter(isFactual);
        return factualData.sort((a, b) => {
            const misinfoScoreA = parseInt(a.Misinformation_Score) || 0;
            const misinfoScoreB = parseInt(b.Misinformation_Score) || 0;
            const hateScoreA = parseInt(a.Hate_Speech_Score) || 0;
            const hateScoreB = parseInt(b.Hate_Speech_Score) || 0;

            if (misinfoScoreA !== misinfoScoreB) {
                return misinfoScoreA - misinfoScoreB;
            }
            return hateScoreA - hateScoreB;
        });
    } else {
        return dataWithSocial.filter(entry => !isFactual(entry));
    }
}

// Detect browser language
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('it')) {
        currentLanguage = 'it';
    } else {
        currentLanguage = 'en';
    }
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'it' : 'en';
    updateLanguage();
}

// Update all text to current language
function updateLanguage() {
    const t = translations[currentLanguage];

    document.getElementById('mainTitle').textContent = t.mainTitle;
    document.getElementById('mainSubtitle').textContent = t.mainSubtitle;
    document.getElementById('disclaimerText').innerHTML = t.disclaimerText;
    document.getElementById('disclaimerContribute').innerHTML = t.disclaimerContribute;
    document.getElementById('ctaTitle').textContent = t.ctaTitle;
    document.getElementById('ctaText').innerHTML = t.ctaText;
    document.getElementById('search').placeholder = t.searchPlaceholder;

    // Update table headers - preserve the sorting structure
    const nameHeader = document.getElementById('nameHeader');
    if (nameHeader) {
        nameHeader.querySelector('span').textContent = t.nameHeader;
    }

    const typeHeader = document.getElementById('typeHeader');
    if (typeHeader) {
        typeHeader.querySelector('span').textContent = t.typeHeader;
    }

    document.getElementById('categoryHeader').textContent = t.categoryHeader;
    document.getElementById('descriptionHeader').textContent = t.descriptionHeader;

    const socialHeader = document.getElementById('socialHeader');
    if (socialHeader) {
        socialHeader.querySelector('span').textContent = 'Reliability';
    }

    document.getElementById('footerUpdated').textContent = t.footerUpdated;
    document.getElementById('footerSources').textContent = t.footerSources;
    document.getElementById('langText').textContent = currentLanguage === 'en' ? 'IT' : 'EN';

    // Update page-specific text
    updatePageTitle();
    populateFilters();
    renderTable();
    renderCards();
    updateStats();
}

// Load CSV file
async function loadCSV() {
    try {
        detectLanguage();

        // Use only list.csv - it contains both English and Italian descriptions
        const response = await fetch('list.csv');
        const text = await response.text();
        allData = parseCSV(text);

        // Filter to only entries with social media and apply page filter
        filteredData = getPageData();

        updateLanguage();
    } catch (error) {
        console.error('Error loading CSV:', error);
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="6" style="text-align: center; color: red;">Error loading data. Please make sure list.csv is in the same directory.</td></tr>';
    }
}

// Populate filter dropdowns
function populateFilters() {
    const t = translations[currentLanguage];
    const types = new Set();
    const categories = new Set();

    // Use Italian columns if in Italian mode, otherwise English
    const typeKey = currentLanguage === 'it' ? 'Type_IT' : 'Type';
    const categoryKey = currentLanguage === 'it' ? 'Category_IT' : 'Category';

    const pageData = getPageData();
    pageData.forEach(entry => {
        if (entry[typeKey]) types.add(entry[typeKey]);
        if (entry[categoryKey]) categories.add(entry[categoryKey]);
    });

    const typeFilter = document.getElementById('typeFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    // Clear existing options (except the first "All" option)
    typeFilter.innerHTML = `<option value="">${t.allTypes}</option>`;
    categoryFilter.innerHTML = `<option value="">${t.allCategories}</option>`;

    // Add options to type filter
    Array.from(types).sort().forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });

    // Add options to category filter
    Array.from(categories).sort().forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Get paginated data
function getPaginatedData() {
    if (itemsPerPage === 'all') {
        return filteredData;
    }
    const startIndex = (currentPaginationPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
}

// Update pagination controls
function updatePaginationControls() {
    if (itemsPerPage === 'all') {
        totalPages = 1;
        currentPaginationPage = 1;
    } else {
        totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPaginationPage > totalPages) {
            currentPaginationPage = totalPages || 1;
        }
    }

    const pageInfo = document.getElementById('pageInfo');
    const firstPageBtn = document.getElementById('firstPageBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const lastPageBtn = document.getElementById('lastPageBtn');

    if (itemsPerPage === 'all') {
        pageInfo.textContent = `Showing all ${filteredData.length} items`;
        firstPageBtn.disabled = true;
        prevPageBtn.disabled = true;
        nextPageBtn.disabled = true;
        lastPageBtn.disabled = true;
    } else {
        const startItem = (currentPaginationPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPaginationPage * itemsPerPage, filteredData.length);
        pageInfo.textContent = `Page ${currentPaginationPage} of ${totalPages} (${startItem}-${endItem} of ${filteredData.length})`;

        firstPageBtn.disabled = currentPaginationPage === 1;
        prevPageBtn.disabled = currentPaginationPage === 1;
        nextPageBtn.disabled = currentPaginationPage === totalPages;
        lastPageBtn.disabled = currentPaginationPage === totalPages;
    }

    // Scroll to top of table when changing pages
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Go to specific page
function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPaginationPage = page;
    renderTable();
    renderCards();
    updatePaginationControls();
}

// Change page size
function changePageSize() {
    const pageSizeSelect = document.getElementById('pageSize');
    const value = pageSizeSelect.value;
    itemsPerPage = value === 'all' ? 'all' : parseInt(value);
    currentPaginationPage = 1;
    renderTable();
    renderCards();
    updatePaginationControls();
}

// Render cards
function renderCards() {
    const t = translations[currentLanguage];
    const cardsContainer = document.getElementById('cardsContainer');

    if (filteredData.length === 0) {
        cardsContainer.innerHTML = `<div style="text-align: center; color: #999; padding: 40px; background: white; border-radius: 8px;">${t.noResults}</div>`;
        updatePaginationControls();
        return;
    }

    // Use Italian columns if in Italian mode, otherwise English
    const typeKey = currentLanguage === 'it' ? 'Type_IT' : 'Type';
    const categoryKey = currentLanguage === 'it' ? 'Category_IT' : 'Category';

    const paginatedData = getPaginatedData();
    const startIndex = itemsPerPage === 'all' ? 0 : (currentPaginationPage - 1) * itemsPerPage;

    cardsContainer.innerHTML = paginatedData.map((entry, index) => {
        const rank = startIndex + index + 1;
        const socialButtons = [];

        if (entry.Facebook) {
            socialButtons.push(`<a href="${entry.Facebook}" target="_blank" class="social-btn facebook-btn" title="Visit Facebook page">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
            </a>`);
        }

        if (entry.Instagram) {
            socialButtons.push(`<a href="${entry.Instagram}" target="_blank" class="social-btn instagram-btn" title="Visit Instagram page">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
            </a>`);
        }

        const socialButtonsHTML = socialButtons.length > 0
            ? socialButtons.join('')
            : '<span class="no-link">No social media</span>';

        const description = currentLanguage === 'it' ? entry.Description_IT : entry.Description;
        const descriptionHTML = description
            ? `<p class="card-description">${truncateDescription(description, 150)}</p>`
            : '<span class="no-description">No description available</span>';

        const misinfoScore = parseInt(entry.Misinformation_Score) || 0;
        const hateScore = parseInt(entry.Hate_Speech_Score) || 0;

        function getScoreClass(score) {
            if (score >= 9) return 'score-extreme';
            if (score >= 7) return 'score-high';
            if (score >= 5) return 'score-medium';
            if (score >= 3) return 'score-low';
            return 'score-minimal';
        }

        const scoreHTML = `
            <div class="scores">
                <div class="score-item ${getScoreClass(misinfoScore)}">
                    <span class="score-label">${currentLanguage === 'it' ? 'Disinfo' : 'Misinfo'}</span>
                    <span class="score-value">${misinfoScore}/10</span>
                </div>
                <div class="score-item ${getScoreClass(hateScore)}">
                    <span class="score-label">${currentLanguage === 'it' ? 'Odio' : 'Hate'}</span>
                    <span class="score-value">${hateScore}/10</span>
                </div>
            </div>
        `;

        return `
            <div class="card">
                <div class="card-header">
                    <div class="card-id">#${rank}</div>
                    <h3 class="card-name">${entry.Name}</h3>
                    ${scoreHTML}
                    <div class="card-badges">
                        <span class="badge badge-type">${entry[typeKey]}</span>
                        <span class="badge badge-category">${entry[categoryKey]}</span>
                    </div>
                </div>
                <div class="card-section">
                    <div class="card-section-title">${currentLanguage === 'it' ? 'Descrizione' : 'Description'}</div>
                    ${descriptionHTML}
                </div>
                <div class="card-section">
                    <div class="card-section-title">${currentLanguage === 'it' ? 'Social Media' : 'Social Media'}</div>
                    <div class="card-social">
                        ${socialButtonsHTML}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    updatePaginationControls();
}

// Render table
function renderTable() {
    const t = translations[currentLanguage];
    const tableBody = document.getElementById('tableBody');

    if (filteredData.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #999; padding: 40px;">${t.noResults}</td></tr>`;
        updatePaginationControls();
        return;
    }

    // Use Italian columns if in Italian mode, otherwise English
    const typeKey = currentLanguage === 'it' ? 'Type_IT' : 'Type';
    const categoryKey = currentLanguage === 'it' ? 'Category_IT' : 'Category';

    const paginatedData = getPaginatedData();
    const startIndex = itemsPerPage === 'all' ? 0 : (currentPaginationPage - 1) * itemsPerPage;

    tableBody.innerHTML = paginatedData.map((entry, index) => {
        const rank = startIndex + index + 1;
        const socialButtons = [];

        if (entry.Facebook) {
            socialButtons.push(`<a href="${entry.Facebook}" target="_blank" class="social-btn facebook-btn" title="Visit Facebook page">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
            </a>`);
        }

        if (entry.Instagram) {
            socialButtons.push(`<a href="${entry.Instagram}" target="_blank" class="social-btn instagram-btn" title="Visit Instagram page">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
            </a>`);
        }

        const socialButtonsHTML = socialButtons.length > 0
            ? `<div class="social-buttons">${socialButtons.join('')}</div>`
            : '<span class="no-link">No social media</span>';

        // Get description in current language
        const description = currentLanguage === 'it' ? entry.Description_IT : entry.Description;
        const descriptionHTML = description
            ? `<p class="description-text">${truncateDescription(description, 200)}</p>`
            : '<span class="no-description">No description available</span>';

        // Get score and determine color/danger level
        const misinfoScore = parseInt(entry.Misinformation_Score) || 0;
        const hateScore = parseInt(entry.Hate_Speech_Score) || 0;

        // Determine danger level for coloring
        function getScoreClass(score) {
            if (score >= 9) return 'score-extreme';
            if (score >= 7) return 'score-high';
            if (score >= 5) return 'score-medium';
            if (score >= 3) return 'score-low';
            return 'score-minimal';
        }

        const scoreHTML = `
            <div class="scores">
                <div class="score-item ${getScoreClass(misinfoScore)}">
                    <span class="score-label">${currentLanguage === 'it' ? 'Disinfo' : 'Misinfo'}</span>
                    <span class="score-value">${misinfoScore}/10</span>
                </div>
                <div class="score-item ${getScoreClass(hateScore)}">
                    <span class="score-label">${currentLanguage === 'it' ? 'Odio' : 'Hate'}</span>
                    <span class="score-value">${hateScore}/10</span>
                </div>
            </div>
        `;

        return `
            <tr>
                <td>${rank}</td>
                <td>
                    <strong>${entry.Name}</strong>
                    ${scoreHTML}
                </td>
                <td><span class="badge badge-type">${entry[typeKey]}</span></td>
                <td><span class="badge badge-category">${entry[categoryKey]}</span></td>
                <td class="description-cell">${descriptionHTML}</td>
                <td>${socialButtonsHTML}</td>
            </tr>
        `;
    }).join('');
    updatePaginationControls();
}

// Update statistics
function updateStats() {
    const t = translations[currentLanguage];
    const total = filteredData.length;
    const pageTotal = getPageData().length;
    document.getElementById('totalCount').textContent =
        `${t.showing} ${total} ${t.of} ${pageTotal} ${t.entries}`;
}

// Update page title based on current page
function updatePageTitle() {
    const t = translations[currentLanguage];
    const pageTitle = document.getElementById('pageTitle');
    const misinfoBtn = document.getElementById('misinfoBtn');
    const factualBtn = document.getElementById('factualBtn');

    if (currentPage === 'misinformation') {
        pageTitle.textContent = t.misinfoTitle;
        misinfoBtn.innerHTML = `
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            ${t.misinfoBtn}
        `;
        misinfoBtn.classList.add('active');
        factualBtn.classList.remove('active');
    } else {
        pageTitle.textContent = t.factualTitle;
        factualBtn.innerHTML = `
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            ${t.factualBtn}
        `;
        factualBtn.classList.add('active');
        misinfoBtn.classList.remove('active');
    }

    // Also update the button text for the inactive button
    if (currentPage === 'misinformation') {
        factualBtn.innerHTML = `
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            ${t.factualBtn}
        `;
    } else {
        misinfoBtn.innerHTML = `
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            ${t.misinfoBtn}
        `;
    }
}

// Switch page
function switchPage(page) {
    currentPage = page;

    // Reset search and filters
    document.getElementById('search').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('categoryFilter').value = '';

    // Reset pagination
    currentPaginationPage = 1;

    // Update data and UI
    filteredData = getPageData();
    populateFilters();
    renderTable();
    renderCards();
    updateStats();
    updatePageTitle();
}

// Filter data
function filterData() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;

    // Use Italian columns if in Italian mode, otherwise English
    const typeKey = currentLanguage === 'it' ? 'Type_IT' : 'Type';
    const categoryKey = currentLanguage === 'it' ? 'Category_IT' : 'Category';

    const pageData = getPageData();

    filteredData = pageData.filter(entry => {
        const matchesSearch = entry.Name.toLowerCase().includes(searchTerm);
        const matchesType = !typeFilter || entry[typeKey] === typeFilter;
        const matchesCategory = !categoryFilter || entry[categoryKey] === categoryFilter;

        return matchesSearch && matchesType && matchesCategory;
    });

    // Reset to first page when filtering
    currentPaginationPage = 1;

    updateFilterBadge();
    renderTable();
    renderCards();
    updateStats();
}

// Event listeners
document.getElementById('search').addEventListener('input', filterData);
document.getElementById('typeFilter').addEventListener('change', filterData);
document.getElementById('categoryFilter').addEventListener('change', filterData);

// Reset filters button
document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);

// Reset filters
function resetFilters() {
    document.getElementById('search').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    filterData();
}

// Update filter badge
function updateFilterBadge() {
    const searchTerm = document.getElementById('search').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;

    let count = 0;
    if (searchTerm) count++;
    if (typeFilter) count++;
    if (categoryFilter) count++;

    const badge = document.getElementById('filterBadge');
    const resetBtn = document.getElementById('resetFiltersBtn');
    const filterCount = document.getElementById('filterCount');

    if (count > 0) {
        filterCount.textContent = count;
        badge.style.display = 'inline-flex';
        resetBtn.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
        resetBtn.style.display = 'none';
    }
}

// Sort table
function sortTable(column) {
    if (currentSort.column === column) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.column = column;
        currentSort.ascending = true;
    }

    // Use Italian columns if in Italian mode, otherwise English
    const typeKey = currentLanguage === 'it' ? 'Type_IT' : 'Type';

    filteredData.sort((a, b) => {
        let valA, valB;

        if (column === 'name') {
            valA = a.Name.toLowerCase();
            valB = b.Name.toLowerCase();
        } else if (column === 'type') {
            valA = a[typeKey].toLowerCase();
            valB = b[typeKey].toLowerCase();
        } else if (column === 'reliability') {
            // Sort by misinformation score (lower is better/more reliable)
            valA = parseInt(a.Misinformation_Score) || 0;
            valB = parseInt(b.Misinformation_Score) || 0;
        }

        if (valA < valB) return currentSort.ascending ? -1 : 1;
        if (valA > valB) return currentSort.ascending ? 1 : -1;
        return 0;
    });

    // Reset to first page after sorting
    currentPaginationPage = 1;

    // Update sort indicators
    document.querySelectorAll('thead th.sortable').forEach(th => {
        th.classList.remove('sorted');
    });

    const headerMap = {
        'name': 'nameHeader',
        'type': 'typeHeader',
        'reliability': 'socialHeader'
    };

    const header = document.getElementById(headerMap[column]);
    if (header) {
        header.classList.add('sorted');
    }

    renderTable();
    renderCards();
}

// Toggle dark mode
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);

    const darkIcon = document.querySelector('.dark-mode-icon');
    const lightIcon = document.querySelector('.light-mode-icon');

    if (darkMode) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';
        localStorage.setItem('darkMode', 'true');
    } else {
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';
        localStorage.setItem('darkMode', 'false');
    }
}

// Check for saved dark mode preference
function initDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        darkMode = true;
        document.body.classList.add('dark-mode');
        const darkIcon = document.querySelector('.dark-mode-icon');
        const lightIcon = document.querySelector('.light-mode-icon');
        if (darkIcon && lightIcon) {
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        }
    }
}

// Truncate long descriptions with "Show more" toggle
function truncateDescription(text, maxLength = 200) {
    if (!text || text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    const id = 'desc-' + Math.random().toString(36).substr(2, 9);

    return `
        <span id="${id}-short">${truncated}...
            <a href="#" onclick="toggleDescription('${id}'); return false;" class="show-more-link">Show more</a>
        </span>
        <span id="${id}-full" style="display: none;">${text}
            <a href="#" onclick="toggleDescription('${id}'); return false;" class="show-more-link">Show less</a>
        </span>
    `;
}

function toggleDescription(id) {
    const short = document.getElementById(id + '-short');
    const full = document.getElementById(id + '-full');

    if (short && full) {
        if (short.style.display === 'none') {
            short.style.display = 'inline';
            full.style.display = 'none';
        } else {
            short.style.display = 'none';
            full.style.display = 'inline';
        }
    }
}

// Toggle disclaimer visibility
function toggleDisclaimer() {
    const disclaimer = document.querySelector('.disclaimer');
    const toggleBtn = document.querySelector('.disclaimer-toggle');
    disclaimer.classList.toggle('collapsed');
    toggleBtn.textContent = disclaimer.classList.contains('collapsed') ? '▶' : '▼';
}

// Toggle CTA visibility
function toggleCTA() {
    const cta = document.querySelector('.cta-section');
    const toggleBtn = document.querySelector('.cta-toggle');
    cta.classList.toggle('collapsed');
    toggleBtn.textContent = cta.classList.contains('collapsed') ? '▶' : '▼';
}

// Load data when page loads
initDarkMode();
loadCSV();
