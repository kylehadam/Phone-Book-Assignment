const chai = require('chai');
const { expect } = chai;
const PhoneBook = require('../PhoneBook'); 

describe('PhoneBook Class', () => {
    let phoneBook;

    beforeEach(() => {
        phoneBook = new PhoneBook(); // Initialize a new instance of PhoneBook before each test
    });

    it('should add a new entry', () => {
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
        expect(phoneBook.entries).to.have.lengthOf(1);
        expect(phoneBook.entries[0].firstName).to.equal('Alice');
        expect(phoneBook.entries[0].lastName).to.equal('Smith');
    });

    it('should update an existing entry', () => {
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
        phoneBook.updateEntry('Alice', 'Smith', '123-456-7890', { phoneNumber: '111-222-3333' });
        expect(phoneBook.entries[0].phoneNumber).to.equal('111-222-3333');
    });

    it('should delete an entry', () => {
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
        phoneBook.deleteEntry('Alice', 'Smith', '123-456-7890');
        expect(phoneBook.entries).to.have.lengthOf(0);
    });

    it('should sort entries by last name', () => {
        phoneBook.addEntry('Charlie', 'Brown', '555-555-5555');
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890');
        phoneBook.sortEntriesByLastName();
        expect(phoneBook.entries[0].lastName).to.equal('Brown');
    });

    it('should search entries by name', () => {
        phoneBook.addEntry('Alice', 'Smith', '123-456-7890', { email: 'alice@example.com' });
        phoneBook.addEntry('Bob', 'Smith', '098-765-4321', { email: 'bob@example.com' });
        const results = phoneBook.searchEntry('Alice', 'firstName');
        expect(results).to.have.lengthOf(1); // Expecting 1 entry for Alice
        expect(results[0].firstName).to.equal('Alice');
    });
});
