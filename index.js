const PhoneBook = require('./PhoneBook');

const phoneBook = new PhoneBook();

// Add entries
phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
phoneBook.addEntry('Bob', 'Johnson', '098-765-4321', { email: 'bob@example.com' });
phoneBook.addEntry('Charlie', 'Brown', '555-555-5555', { email: 'charlie@example.com' });

// Demonstrate sorting
phoneBook.sortEntriesByLastName();
console.log(phoneBook.getEntriesGroupedByInitial());

// Search entries
phoneBook.searchEntries('Alice', 'firstName'); // Search by first name
phoneBook.searchEntries('555', 'phoneNumber'); // Search by phone number
