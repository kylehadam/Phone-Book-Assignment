Certainly! Below is a comprehensive README file written in Markdown format for your `Phone Book Assignment`. This README will provide an overview of the project, installation instructions, usage guidelines, and details about the functionality implemented.

### Full README.md

```markdown
# Phone Book Assignment

## Overview

This project implements a simple Phone Book application using JavaScript. The Phone Book allows users to add, update, delete, sort, and search for phone book entries. The entries are stored in memory, and the application provides both a console-based interface and a web-based user interface.

### Features

- **Add New Entry**: Users can add a new contact with first name, last name, phone number, and email.
- **Update Entry**: Users can update an existing contact's details.
- **Delete Entry**: Users can delete a contact from the phone book.
- **Sort Entries**: Entries can be sorted by last name using the Quick Sort algorithm and Timsort (JavaScript's native sort).
- **Search Entries**: Users can search for contacts by first name, last name, or phone number.
- **Display Entries**: Entries are displayed grouped by the initial letter of the last name.

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

    Open the `index.html` file in a web browser. Use the form to add new contacts, which will be displayed below the form.

### Running Tests

To run the tests for the Phone Book application, use the following command:

```bash
npm test
```

This command will run the Mocha test suite with Chai assertions to verify the functionality of the `PhoneBook` class.

### PhoneBook Class Methods

- `addEntry(firstName, lastName, phoneNumber, details)`: Adds a new entry to the phone book.
- `updateEntry(firstName, lastName, newDetails)`: Updates an existing entry's details.
- `deleteEntry(firstName, lastName)`: Deletes an entry from the phone book.
- `sortEntriesByLastName()`: Sorts entries by last name using Timsort (native JavaScript sort).
- `quickSortEntries(low, high)`: Sorts entries by last name using the Quick Sort algorithm.
- `searchEntries(query, criteria)`: Searches for entries based on a query and criteria (e.g., first name, last name).
- `getEntriesGroupedByInitial()`: Groups entries by the initial letter of the last name.

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
└── README.md              # Project documentation (this file)
```

## License

This project is licensed under the MIT License.



