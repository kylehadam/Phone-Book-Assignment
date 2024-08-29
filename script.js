// Define the PhoneBook class
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

    bubbleSortByLastName() {
        let n = this.entries.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (this.entries[i].lastName.localeCompare(this.entries[i + 1].lastName) > 0) {
                    [this.entries[i], this.entries[i + 1]] = [this.entries[i + 1], this.entries[i]];
                    swapped = true;
                }
            }
            n--;
        } while (swapped);
        console.log("Entries sorted by last name using bubble sort");
    }

    searchEntries(query, criteria = 'firstName') {
        // Check if criteria is valid and the entry has this property
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
        this.bubbleSortByLastName();
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
window.PhoneBook = PhoneBook;

// Code to handle form submission and display entries
document.addEventListener('DOMContentLoaded', function () {
    const phoneBook = new PhoneBook();

    document.getElementById('phoneBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;

        phoneBook.addEntry(firstName, lastName, phoneNumber, { email });
        displayEntries(phoneBook.getEntriesGroupedByInitial());
    });

    function displayEntries(groupedEntries) {
        const entriesList = document.getElementById('entries');
        entriesList.innerHTML = ''; // Clear existing entries

        Object.keys(groupedEntries).forEach(initial => {
            const initialHeader = document.createElement('h3');
            initialHeader.textContent = initial;
            entriesList.appendChild(initialHeader);

            groupedEntries[initial].forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.firstName} ${entry.lastName}: ${entry.phoneNumber} (${entry.email || 'No email'})`;
                entriesList.appendChild(li);
            });
        });
    }
});
