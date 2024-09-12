class PhoneBook {
    constructor() {
        this.entries = [];
        this.entryMap = new Map();
    }

    addEntry(firstName, lastName, phoneNumber, details = {}) {
        const key = `${firstName} ${lastName} ${phoneNumber}`;
        if (this.entryMap.has(key)) {
            console.log('Duplicate entry detected. Entry not added.');
            return false;
        }

        const entry = { firstName, lastName, phoneNumber, ...details };
        this.entries.push(entry);
        this.entryMap.set(key, entry);
        console.log(`Added entry: ${firstName} ${lastName}`);
        return true;
    }

    updateEntry(firstName, lastName, phoneNumber, newDetails) {
        const key = `${firstName} ${lastName} ${phoneNumber}`;
        if (!this.entryMap.has(key)) {
            console.log(`Entry not found for: ${firstName} ${lastName}`);
            return false;
        }

        const updatedEntry = { ...this.entryMap.get(key), ...newDetails };
        const index = this.entries.findIndex(entry => entry.phoneNumber === phoneNumber);
        if (index !== -1) {
            this.entries[index] = updatedEntry;
            this.entryMap.set(key, updatedEntry);
            console.log(`Updated entry for: ${firstName} ${lastName}`);
            return true;
        }
        return false;
    }

    deleteEntry(firstName, lastName, phoneNumber) {
        const key = `${firstName} ${lastName} ${phoneNumber}`;
        if (!this.entryMap.has(key)) {
            console.log(`Entry not found for: ${firstName} ${lastName}`);
            return false;
        }

        this.entries = this.entries.filter(entry => entry.phoneNumber !== phoneNumber);
        this.entryMap.delete(key);
        console.log(`Deleted entry for: ${firstName} ${lastName}`);
        return true;
    }

    searchEntries(query, criteria = 'firstName') {
        const results = this.entries.filter(entry => entry[criteria].toLowerCase().includes(query.toLowerCase()));
        console.log(`Search results for ${query} by ${criteria}:`, results);
        return results;
    }

    sortEntriesByLastName() {
        this.entries.sort((a, b) => a.lastName.localeCompare(b.lastName));
        console.log('Entries sorted by last name using Timsort');
    }

    getEntriesGroupedByInitial() {
        return this.entries.reduce((groups, entry) => {
            const initial = entry.lastName.charAt(0).toUpperCase();
            if (!groups[initial]) {
                groups[initial] = [];
            }
            groups[initial].push(entry);
            return groups;
        }, {});
    }
}

module.exports = PhoneBook;
