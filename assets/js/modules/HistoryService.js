export default class HistoryService {
    constructor(localStorageKey = 'myHistory') {
        this.key = localStorageKey;
    }

    getMyHistory() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    saveMyHistory(term) {
        if (!term) return;
        let history = this.getMyHistory();
        if (!history.includes(term)) {
            history.unshift(term);
            if (history.length > 10) history = history.slice(0, 10);
            localStorage.setItem(this.key, JSON.stringify(history));
        }
    }
}
