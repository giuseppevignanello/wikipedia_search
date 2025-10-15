export default class UIHandler {
    constructor(searchFromHistoryCallback) {
        this.searchInput = document.getElementById('search-input');
        this.resultsBox = document.getElementById('results-box');
        this.errorsBox = document.getElementById('errors-box');
        this.myHistoryList = document.getElementById('my-history-list');
        this.generalHistoryList = document.getElementById('general-history-list');
        this.loader = document.getElementById('loading-spinner');
        this.searchFromHistoryCallback = searchFromHistoryCallback;
    }

    showLoader() { this.loader.style.display = 'block'; }
    hideLoader() { this.loader.style.display = 'none'; }

    showError(message) { this.errorsBox.innerText = message; }
    clearError() { this.errorsBox.innerText = ''; }
    clearResults() { this.resultsBox.innerHTML = ''; }

    renderResults(results, searchTerm) {
        if (!results || results.length === 0) {
            this.resultsBox.innerHTML = `
                <div class="no-results">
                    <h3>No results</h3>
                    <p>No results found for "<strong>${searchTerm}</strong>"</p>
                </div>
            `;
            return;
        }

        this.resultsBox.innerHTML = results.map(r => `
            <div class="result-item">
                <h3>${r.title}</h3>
                <p>${r.snippet.replace(/<[^>]+>/g, '')}...</p>
                <a href="https://en.wikipedia.org/?curid=${r.pageid}" target="_blank">
                    Read more on Wikipedia →
                </a>
            </div>
        `).join('');
    }

      renderMyHistory(history) {
            this.myHistoryList.innerHTML = '';
            if (!history.length) {
                this.myHistoryList.innerHTML = `<div class="no-history"><p>No saved searches</p></div>`;
                return;
            }

            history.forEach(term => {
                const div = document.createElement('div');
                div.classList.add('history-item');
                div.textContent = `🔍 ${term}`;
                div.addEventListener('click', () => this.searchFromHistoryCallback(term));
                this.myHistoryList.appendChild(div);
            });
        }

        renderGeneralHistory(data) {
            this.generalHistoryList.innerHTML = ''; 
            if (!data || !data.length) {
                this.generalHistoryList.innerHTML = `<div class="no-history"><p>No search history</p></div>`;
                return;
            }

            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('history-item');
                
                const termDiv = document.createElement('div');
                termDiv.classList.add('search-term');
                termDiv.textContent = `🔍 ${item.search_term}`;
                div.appendChild(termDiv);
                
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('search-date');
                dateDiv.textContent = new Date(item.search_date).toLocaleString();
                div.appendChild(dateDiv);

                div.addEventListener('click', () => this.searchFromHistoryCallback(item.search_term));

                this.generalHistoryList.appendChild(div);
            });
        }
}
