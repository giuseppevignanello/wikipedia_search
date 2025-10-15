import Validator from './modules/Validator.js';
import SearchService from './modules/SearchService.js';
import HistoryService from './modules/HistoryService.js';
import UIHandler from './modules/UIHandler.js';
import { BASE_API_URL } from './config.js';


const ui = new UIHandler(searchFromHistory);
const historyService = new HistoryService();

const searchForm = document.getElementById('search-form');
const languageSelect = document.getElementById('language-select');

const backendEndpoint = BASE_API_URL;

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    ui.clearError();
    ui.clearResults();

    // For the moment the requirement ask to use just one word
    // A future feature could be to allow a short sentence as search input
    const term = ui.searchInput.value.trim();
    const validationError = Validator.validateSearchTerm(term);
    if (validationError) {
        ui.showError(validationError);
        return;
    }

    ui.showLoader();

    try {
        const lang = languageSelect.value || 'es';
        const results = await SearchService.searchWikipedia(term, lang);
        await SearchService.saveToDB(term);

        historyService.saveMyHistory(term);
        ui.renderResults(results, term);

        const myHistory = historyService.getMyHistory();
        ui.renderMyHistory(myHistory, searchFromHistory);

        const generalData = await fetch(`${backendEndpoint}?action=getHistory`).then(r => r.json());
        if (generalData.success) ui.renderGeneralHistory(generalData.history, searchFromHistory);
    } catch (err) {
        ui.showError(err.message || 'An unexpected error occurred while searching.');
        SearchService.log('Error in search()', err);
    } finally {
        ui.hideLoader();
    }
});

function searchFromHistory(term) {
    ui.searchInput.value = term;
    searchForm.dispatchEvent(new Event('submit'));
}

document.addEventListener('DOMContentLoaded', async () => {
    const myHistory = historyService.getMyHistory();
    ui.renderMyHistory(myHistory, searchFromHistory);

    try {
        const generalData = await fetch(`${backendEndpoint}?action=getHistory`).then(r => r.json());
        if (generalData.success) ui.renderGeneralHistory(generalData.history, searchFromHistory);
    } catch (err) {
        console.error('Error loading history:', err);
    }
});
