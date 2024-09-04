// Define the PhoneBook class
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

// Document ready function
document.addEventListener('DOMContentLoaded', function () {
    const phoneBook = new PhoneBook();

    // Handle adding a new entry
    document.getElementById('phoneBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = formatPhoneNumber(document.getElementById('phoneNumber').value);
        const email = document.getElementById('email').value;

        if (!phoneNumber) {
            alert("Please enter a valid phone number in the format: 1234567890");
            return;
        }

        const isAdded = phoneBook.addEntry(firstName, lastName, phoneNumber, { email });
        if (isAdded) {
            displayEntries(phoneBook.getEntriesGroupedByInitial());
            clearForm(); // Clear the form fields after adding an entry
        }
    });

    // Handle search functionality
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('searchQuery').value;
        const criteria = document.getElementById('searchCriteria').value;

        const results = phoneBook.searchEntry(query, criteria); // Perform search
        displayEntriesByResults(results);
    });

    // Handle showing all entries (Reset functionality)
    document.getElementById('showAllButton').addEventListener('click', function() {
        displayEntries(phoneBook.getEntriesGroupedByInitial()); // Show all stored entries
    });

    // Function to display entries grouped by initials
    function displayEntries(groupedEntries) {
        const entriesList = document.getElementById('entries');
        entriesList.innerHTML = ''; // Clear existing entries

        Object.keys(groupedEntries).forEach(initial => {
            const initialHeader = document.createElement('tr');
            const headerCell = document.createElement('td');
            headerCell.colSpan = 4;
            headerCell.className = 'initial-header';
            headerCell.textContent = initial;
            initialHeader.appendChild(headerCell);
            entriesList.appendChild(initialHeader);

            groupedEntries[initial].forEach(entry => {
                const row = document.createElement('tr');

                const lastNameCell = document.createElement('td');
                lastNameCell.textContent = entry.lastName;
                row.appendChild(lastNameCell);

                const firstNameCell = document.createElement('td');
                firstNameCell.textContent = entry.firstName;
                row.appendChild(firstNameCell);

                const phoneNumberCell = document.createElement('td');
                phoneNumberCell.textContent = entry.phoneNumber;
                row.appendChild(phoneNumberCell);

                const emailCell = document.createElement('td');
                if (entry.email) {
                    const emailLink = document.createElement('a');
                    emailLink.href = `mailto:${entry.email}`;
                    emailLink.textContent = entry.email;
                    emailCell.appendChild(emailLink);
                } else {
                    emailCell.textContent = 'No email';
                }
                row.appendChild(emailCell);

                entriesList.appendChild(row);
            });
        });
    }

    // Function to display search results
    function displayEntriesByResults(results) {
        const entriesList = document.getElementById('entries');
        entriesList.innerHTML = ''; // Clear existing entries

        if (results.length === 0) {
            alert('No entry found');
            return;
        }

        results.forEach(entry => {
            const row = document.createElement('tr');

            const lastNameCell = document.createElement('td');
            lastNameCell.textContent = entry.lastName;
            row.appendChild(lastNameCell);

            const firstNameCell = document.createElement('td');
            firstNameCell.textContent = entry.firstName;
            row.appendChild(firstNameCell);

            const phoneNumberCell = document.createElement('td');
            phoneNumberCell.textContent = entry.phoneNumber;
            row.appendChild(phoneNumberCell);

            const emailCell = document.createElement('td');
            if (entry.email) {
                const emailLink = document.createElement('a');
                emailLink.href = `mailto:${entry.email}`;
                emailLink.textContent = entry.email;
                emailCell.appendChild(emailLink);
            } else {
                emailCell.textContent = 'No email';
            }
            row.appendChild(emailCell);

            entriesList.appendChild(row);
        });
    }

    // Function to clear the form after adding an entry
    function clearForm() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('email').value = '';
    }

    // Helper function to format phone numbers
    function formatPhoneNumber(phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return null;
    }
});
