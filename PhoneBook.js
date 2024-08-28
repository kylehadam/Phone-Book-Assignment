class PhoneBook {
    constructor() {
        this.entries = [];
    }

    addEntry(name, phoneNumber, details = {}) {
        const entry = { name, phoneNumber, ...details };
        this.entries.push(entry);
        console.log(`Added entry: ${name}`);
    }

    updateEntry(name, newDetails) {
        const index = this.entries.findIndex(entry => entry.name === name);
        if (index !== -1) {
            this.entries[index] = { ...this.entries[index], ...newDetails };
            console.log(`Updated entry for: ${name}`);
        } else {
            console.log(`Entry not found for: ${name}`);
        }
    }

    deleteEntry(name) {
        const initialLength = this.entries.length;
        this.entries = this.entries.filter(entry => entry.name !== name);
        if (this.entries.length < initialLength) {
            console.log(`Deleted entry for: ${name}`);
        } else {
            console.log(`Entry not found for: ${name}`);
        }
    }

    sortEntries(criteria) {
        if (criteria === 'name') {
            this.entries.sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === 'phoneNumber') {
            this.entries.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
        } else {
            console.log(`Unsupported sorting criteria: ${criteria}`);
        }
        console.log(`Entries sorted by ${criteria}`);
    }
}

module.exports = PhoneBook;
