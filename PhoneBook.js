class PhoneBook {
    constructor() {
        this.entries = [];
    }

    addEntry(firstName, lastName, phoneNumber, details = {}) {
        const entry = { firstName, lastName, phoneNumber, ...details };
        this.entries.push(entry);
        console.log(`Added entry: ${firstName} ${lastName}`);
    }

    updateEntry(firstName, lastName, newDetails) {
        const index = this.entries.findIndex(entry => entry.firstName === firstName && entry.lastName === lastName);
        if (index !== -1) {
            this.entries[index] = { ...this.entries[index], ...newDetails };
            console.log(`Updated entry for: ${firstName} ${lastName}`);
        } else {
            console.log(`Entry not found for: ${firstName} ${lastName}`);
        }
    }

    deleteEntry(firstName, lastName) {
        const initialLength = this.entries.length;
        this.entries = this.entries.filter(entry => !(entry.firstName === firstName && entry.lastName === lastName));
        if (this.entries.length < initialLength) {
            console.log(`Deleted entry for: ${firstName} ${lastName}`);
        } else {
            console.log(`Entry not found for: ${firstName} ${lastName}`);
        }
    }

    // Quick Sort implementation for sorting by last name
    quickSortEntries(low = 0, high = this.entries.length - 1) {
        if (low < high) {
            const pi = this.partition(low, high);
            this.quickSortEntries(low, pi - 1);
            this.quickSortEntries(pi + 1, high);
        }
    }

    partition(low, high) {
        const pivot = this.entries[high].lastName;
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (this.entries[j].lastName.localeCompare(this.entries[high].lastName) < 0) {
                i++;
                [this.entries[i], this.entries[j]] = [this.entries[j], this.entries[i]];
            }
        }
        [this.entries[i + 1], this.entries[high]] = [this.entries[high], this.entries[i + 1]];
        return i + 1;
    }

    // Sort entries by last name using Timsort
    sortEntriesByLastName() {
        this.entries.sort((a, b) => a.lastName.localeCompare(b.lastName));
        console.log("Entries sorted by last name using Timsort");
    }

    searchEntries(query, criteria = 'firstName') {
        const results = this.entries.filter(entry => {
            if (entry[criteria] && typeof entry[criteria] === 'string') {
                return entry[criteria].includes(query);
            }
            return false;
        });
        console.log(`Search results for ${query} by ${criteria}:`, results);
        return results;
    }

    getEntriesGroupedByInitial() {
        this.sortEntriesByLastName();  // Choose Timsort for sorting by last name
        const grouped = {};
        this.entries.forEach(entry => {
            const initial = entry.lastName[0].toUpperCase();
            if (!grouped[initial]) {
                grouped[initial] = [];
            }
            grouped[initial].push(entry);
        });
        return grouped;
    }
}

// Attach the PhoneBook class to the window object for browser use
if (typeof window !== 'undefined') {
    window.PhoneBook = PhoneBook;
}

module.exports = PhoneBook;
