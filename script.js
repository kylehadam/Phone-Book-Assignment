class PhoneBook {
    constructor() {
        this.entries = [];
        this.entryMap = new Map();
        this.idCounter = 0; // Unique ID counter for each entry
    }

    generateId() {
        return ++this.idCounter;
    }

    addEntry(firstName, lastName, phoneNumber, details = {}) {
        const id = this.generateId();
        const key = `${firstName} ${lastName} ${phoneNumber}`;
        if (this.entryMap.has(key)) {
            console.log('Duplicate entry detected. Entry not added.');
            return false;
        }

        const entry = { id, firstName, lastName, phoneNumber, ...details };
        this.entries.push(entry);
        this.entryMap.set(id, entry);
        console.log(`Added entry: ${firstName} ${lastName}`);
        return true;
    }

    updateEntry(id, newDetails) {
        if (!this.entryMap.has(id)) {
            console.log(`Entry not found with ID: ${id}`);
            return false;
        }

        const updatedEntry = { ...this.entryMap.get(id), ...newDetails };
        const index = this.entries.findIndex(entry => entry.id === id);
        if (index !== -1) {
            this.entries[index] = updatedEntry;
            this.entryMap.set(id, updatedEntry);
            console.log(`Updated entry for ID: ${id}`);
            return true;
        }
        return false;
    }

    deleteEntry(id) {
        if (!this.entryMap.has(id)) {
            console.log(`Entry not found with ID: ${id}`);
            return false;
        }

        this.entries = this.entries.filter(entry => entry.id !== id);
        this.entryMap.delete(id);
        console.log(`Deleted entry with ID: ${id}`);
        return true;
    }

    searchEntries(query, criteria = 'firstName') {
        const results = this.entries.filter(entry => entry[criteria].toLowerCase().includes(query.toLowerCase()));
        console.log(`Search results for ${query} by ${criteria}:`, results);
        return results;
    }

    // Extend sorting function in PhoneBook class to handle different criteria
    sortEntries(criteria) {
        this.entries.sort((a, b) => a[criteria].localeCompare(b[criteria]));
        console.log(`Entries sorted by ${criteria} using Timsort`);
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

document.addEventListener('DOMContentLoaded', function () {
    const phoneBook = new PhoneBook();
    let currentEntryId = null; // Store the ID of the entry being edited

    // Modal logic
    const modal = document.getElementById('updateModal');
    const closeModalBtn = document.getElementById('closeModal');

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Handle add entry form submission
    document.getElementById('phoneBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;

        phoneBook.addEntry(firstName, lastName, phoneNumber, { email });
        document.getElementById('phoneBookForm').reset();
        displayEntries(phoneBook.getEntriesGroupedByInitial());
    });

    // Handle sort form submission
    document.getElementById('sortForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const criteria = document.getElementById('sortCriteria').value;
        phoneBook.sortEntries(criteria);
        displayEntries(phoneBook.getEntriesGroupedByInitial());
    });

    // Handle search form submission
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('searchQuery').value;
        const criteria = document.getElementById('searchCriteria').value;
        const results = phoneBook.searchEntries(query, criteria);
        displayEntries({ SearchResults: results });
    });

    // Handle "Show All" button click
    document.getElementById('showAllButton').addEventListener('click', function() {
        displayEntries(phoneBook.getEntriesGroupedByInitial());
    });

    // Display entries in the table grouped by initials
    function displayEntries(groupedEntries) {
        const tbody = document.getElementById('entries');
        tbody.innerHTML = ''; // Clear previous entries

        Object.keys(groupedEntries).forEach(initial => {
            // Add header for each initial
            const headerRow = document.createElement('tr');
            const headerCell = document.createElement('td');
            headerCell.setAttribute('colspan', '5');
            headerCell.className = 'initial-header';
            headerCell.textContent = initial;
            headerRow.appendChild(headerCell);
            tbody.appendChild(headerRow);

            groupedEntries[initial].forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.lastName}</td>
                    <td>${entry.firstName}</td>
                    <td>${formatPhoneNumber(entry.phoneNumber)}</td>
                    <td><a href="mailto:${entry.email}">${entry.email || 'No email'}</a></td>
                    <td>
                        <button class="update-btn">Update</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;

                // Add event listeners for update and delete buttons
                row.querySelector('.update-btn').addEventListener('click', () => {
                    // Set current entry ID and pre-fill modal form fields
                    currentEntryId = entry.id;
                    document.getElementById('updateFirstName').value = entry.firstName;
                    document.getElementById('updateLastName').value = entry.lastName;
                    document.getElementById('updatePhoneNumber').value = entry.phoneNumber;
                    document.getElementById('updateEmail').value = entry.email;

                    modal.style.display = 'block'; // Show the modal
                });

                row.querySelector('.delete-btn').addEventListener('click', () => {
                    phoneBook.deleteEntry(entry.id);
                    displayEntries(phoneBook.getEntriesGroupedByInitial());
                });

                tbody.appendChild(row);
            });
        });
    }

    // Handle update form submission in the modal
    document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedFirstName = document.getElementById('updateFirstName').value;
        const updatedLastName = document.getElementById('updateLastName').value;
        const updatedPhoneNumber = document.getElementById('updatePhoneNumber').value;
        const updatedEmail = document.getElementById('updateEmail').value;

        phoneBook.updateEntry(currentEntryId, {
            firstName: updatedFirstName,
            lastName: updatedLastName,
            phoneNumber: updatedPhoneNumber,
            email: updatedEmail
        });

        modal.style.display = 'none'; // Hide the modal
        displayEntries(phoneBook.getEntriesGroupedByInitial());
    });

    function formatPhoneNumber(phoneNumber) {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    displayEntries(phoneBook.getEntriesGroupedByInitial()); // Initial display
});
