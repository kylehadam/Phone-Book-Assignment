const PhoneBook = require('./PhoneBook');

const phoneBook = new PhoneBook();

// Add entries
phoneBook.addEntry('Alice', '123-456-7890', { email: 'alice@example.com' });
phoneBook.addEntry('Bob', '098-765-4321', { email: 'bob@example.com' });
phoneBook.addEntry('Charlie', '555-555-5555', { email: 'charlie@example.com' });

// Update an entry
phoneBook.updateEntry('Alice', { phoneNumber: '111-222-3333' });

// Delete an entry
phoneBook.deleteEntry('Bob');

// Sort entries by name
phoneBook.sortEntries('name');
console.log(phoneBook.entries);

// Sort entries by phone number
phoneBook.sortEntries('phoneNumber');
console.log(phoneBook.entries);
