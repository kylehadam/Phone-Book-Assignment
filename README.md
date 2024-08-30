# Phone Book Assignment

## Overview

This project implements a simple Phone Book application using JavaScript. The Phone Book allows users to add, update, delete, sort, and search for phone book entries. The entries are stored in memory, and the application provides both a console-based interface and a web-based user interface.

### Features

- **Add New Entry**: Users can add a new contact with a first name, last name, phone number, and email.
- **Update Entry**: Users can update an existing contact's details.
- **Delete Entry**: Users can delete a contact from the phone book.
- **Sort Entries**: Entries can be sorted by last name using JavaScript’s native sort, which utilizes Timsort.
- **Search Entries**: Users can search for contacts by first name, last name, or phone number using efficient search techniques.
- **Display Entries**: Entries are displayed grouped by the initial letter of the last name.
- **Duplicate Detection**: The system detects and prevents the addition of duplicate entries.

## Technologies Used

- **JavaScript**: Core programming language used for logic and functionalities.
- **HTML/CSS**: Basic front-end development for the user interface.
- **Mocha & Chai**: Testing frameworks for unit testing.

## Getting Started

### Prerequisites

- Node.js (for running the JavaScript application and using npm)
- A web browser (for using the HTML interface)

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/kylehadam/Phone-Book-Assignment.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Phone-Book-Assignment
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

## Usage

### Running the Application

1. **Run the Phone Book Application**:

    To start the application, you can use the following command:

    ```bash
    npm start
    ```

    This command runs the `index.js` file, which demonstrates adding entries, sorting, and searching.

2. **Run in Development Mode**:

    If you want to run the application in development mode with automatic restarts on file changes, use:

    ```bash
    npm run dev
    ```

3. **Open the HTML Interface**:

    Open the `index.html` file in a web browser. Use the form to add new contacts, which will be displayed below the form. You can also use the search functionality to find specific contacts.

### Running Tests

To run the tests for the Phone Book application, use the following command:

```bash
npm test
```

This command will run the Mocha test suite with Chai assertions to verify the functionality of the `PhoneBook` class.

### PhoneBook Class Methods

- `addEntry(firstName, lastName, phoneNumber, details)`: Adds a new entry to the phone book. Returns `true` if the entry is added, or an alert message if a duplicate is detected.
- `updateEntry(firstName, lastName, phoneNumber, newDetails)`: Updates an existing entry's details based on the composite key.
- `deleteEntry(firstName, lastName, phoneNumber)`: Deletes an entry from the phone book using the composite key.
- `sortEntriesByLastName()`: Sorts entries by last name using Timsort (native JavaScript sort).
- `searchEntry(query, criteria)`: Searches for entries based on a query and criteria (e.g., first name, last name). Returns an array of matching entries.
- `getEntriesGroupedByInitial()`: Groups entries by the initial letter of the last name for display.

## File Structure

```
Phone Book Assignment/
├── node_modules/          # Dependencies
├── tests/                 # Test files
│   └── PhoneBook.test.js  # Unit tests for PhoneBook class
├── .gitignore             # Git ignore file
├── package.json           # Project configuration and scripts
├── PhoneBook.js           # Main PhoneBook class logic
├── index.js               # Main application file
├── index.html             # HTML interface for the phone book
├── script.js              # JavaScript for handling HTML interactions
├── styles.css             # CSS file for styling the HTML interface
└── README.md              # Project documentation (this file)
```

## License

This project is licensed under the MIT License.