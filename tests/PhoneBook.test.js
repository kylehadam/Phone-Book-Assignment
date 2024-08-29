const chai = require('chai');
const { expect } = chai;
const PhoneBook = require('../PhoneBook'); // Adjust the path as necessary

describe('PhoneBook Class', () => {
    let phoneBook;

    beforeEach(() => {
        phoneBook = new PhoneBook();
    });

    it('should add a new entry', () => {
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
        expect(phoneBook.entries).to.have.lengthOf(1);
        expect(phoneBook.entries[0].firstName).to.equal('Alice');
    });

    it('should update an existing entry', () => {
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
        phoneBook.updateEntry('Alice', 'Smith', { phoneNumber: '111-222-3333' });
        expect(phoneBook.entries[0].phoneNumber).to.equal('111-222-3333');
    });

    it('should delete an entry', () => {
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
        phoneBook.deleteEntry('Alice', 'Smith');
        expect(phoneBook.entries).to.have.lengthOf(0);
    });

    it('should sort entries by last name', () => {
        phoneBook.addEntry('Charlie', 'Brown', '555-555-5555');
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890');
        phoneBook.bubbleSortByLastName();
        expect(phoneBook.entries[0].lastName).to.equal('Brown');
    });

    it('should search entries by first name', () => {
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
        phoneBook.addEntry('Alice', 'Johnson', '123-456-7890'); // Adding a duplicate Alice for the test
        phoneBook.addEntry('Bob', 'Brown', '098-765-4321', { email: 'bob@example.com' });
        const results = phoneBook.searchEntries('Alice', 'firstName');
        expect(results).to.have.lengthOf(2); // Expecting 2 entries for Alice
        expect(results[0].firstName).to.equal('Alice');
        expect(results[1].firstName).to.equal('Alice');
    });
});
