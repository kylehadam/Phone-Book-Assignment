class PhoneBook {
    constructor() {
        this.entries = [];
        this.entryMap = new Map(); // Hash map for quick lookup
    }

    addEntry(firstName, lastName, phoneNumber, details = {}) {
        const key = `${firstName}-${lastName}-${phoneNumber}`.toLowerCase(); // Create a unique key
        if (this.entryMap.has(key)) {
            alert(`An entry with the same details already exists for ${firstName} ${lastName}.`);
            return false; // Indicate that the entry was not added
        }

        const entry = { firstName, lastName, phoneNumber, ...details };
        this.entries.push(entry);
        this.entryMap.set(key, entry); // Store in Map for quick access
        console.log(`Added entry: ${firstName} ${lastName}`);
        return true; // Indicate that the entry was added successfully
    }

    deleteEntry(firstName, lastName, phoneNumber) {
        const key = `${firstName}-${lastName}-${phoneNumber}`.toLowerCase();
        const initialLength = this.entries.length;

        this.entries = this.entries.filter(entry => {
            const entryKey = `${entry.firstName}-${entry.lastName}-${entry.phoneNumber}`.toLowerCase();
            return entryKey !== key;
        });

        if (this.entries.length < initialLength) {
            this.entryMap.delete(key); // Remove from Map
            console.log(`Deleted entry for: ${firstName} ${lastName}`);
        } else {
            console.log(`Entry not found for: ${firstName} ${lastName}`);
        }
    }

    updateEntry(firstName, lastName, phoneNumber, newDetails) {
        const key = `${firstName}-${lastName}-${phoneNumber}`.toLowerCase();
        if (this.entryMap.has(key)) {
            const entry = this.entryMap.get(key);
            Object.assign(entry, newDetails);
            console.log(`Updated entry for: ${firstName} ${lastName}`);
        } else {
            console.log(`Entry not found for: ${firstName} ${lastName}`);
        }
    }

    searchEntry(query, criteria = 'firstName') {
        const results = [];
        const queryLower = query.toLowerCase();
        
        for (let entry of this.entryMap.values()) {
            if (entry[criteria].toLowerCase().includes(queryLower)) {
                results.push(entry);
            }
        }

        if (results.length === 0) {
            alert('No entry found');
        }
        console.log(`Search results for ${query} by ${criteria}:`, results);
        return results;
    }

    sortEntriesByLastName() {
        this.entries.sort((a, b) => a.lastName.localeCompare(b.lastName));
        console.log("Entries sorted by last name using Timsort");
    }

    getEntriesGroupedByInitial() {
        this.sortEntriesByLastName();  // Sort entries by last name
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

module.exports = PhoneBook; // Export the PhoneBook class for use in tests
