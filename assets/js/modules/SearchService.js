import { BASE_API_URL } from '../config.js';
const backendEndpoint = BASE_API_URL;

export default class SearchService {
    static async searchWikipedia(term, language = 'es') {
        const endpoint = `https://${language}.wikipedia.org/w/api.php`;
        const params = new URLSearchParams({
            action: 'query',
            list: 'search',
            srsearch: term,
            format: 'json',
            origin: '*',
            srlimit: 10
        });

        const response = await fetch(`${endpoint}?${params}`);
        if (!response.ok) throw new Error(`Wikipedia API error: ${response.status} ${response.statusText}`);
        
        const data = await response.json();
        if (!data.query || !data.query.search) throw new Error('Unexpected response from Wikipedia API');
        
        return data.query.search;
    }

    static async saveToDB(term) {
        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'save', searchTerm: term })
            });
            const data = await response.json();
            if (!data.success) console.error('Error saving search history:', data.error);
        } catch (err) {
            console.error('Error saving search history:', err);
        }
    }

    static async log(message, error) {
        try {
            await fetch(backendEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'log', message, error: error?.toString() || '' })
            });
        } catch (err) {
            console.error('Error logging message:', err);
        }
    }
}
