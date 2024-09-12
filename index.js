const PhoneBook = require('./PhoneBook');

const phoneBook = new PhoneBook();

// Adding entries
phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
phoneBook.addEntry('Bob', 'Johnson', '098-765-4321', { email: 'bob@example.com' });
phoneBook.addEntry('Charlie', 'Brown', '555-555-5555', { email: 'charlie@example.com' });

// Sorting entries by last name
phoneBook.sortEntriesByLastName();

// Displaying grouped entries by initial
console.log(phoneBook.getEntriesGroupedByInitial());

// Searching for an entry
phoneBook.searchEntries('Alice', 'firstName'); // Search by first name
