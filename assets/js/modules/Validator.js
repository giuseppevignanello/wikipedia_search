export default class Validator {
    static validateSearchTerm(term) {
        if (!term) return 'Please enter a search term.';
        if (term.length < 2) return 'The search term must be at least 2 characters long.';
        if (term.length > 50) return 'The search term cannot be longer than 50 characters.';
        if (!/^[\w\sáéíóúüñçÀ-ÿ]+$/.test(term)) return 'The search term contains invalid characters.';
        return null; // valid
    }
}
