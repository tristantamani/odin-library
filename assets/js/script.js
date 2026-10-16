const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = function() {
        return this.id.crypto.randomUUID();
    }

    this.info = function() {
        return !this.hasRead ?
        `${this.title} by ${this.author}, ${this.pages} pages, not read yet` :
        `${this.title} by ${this.author}, ${this.pages} pages, finished`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
const darkhold = new Book("Darkhold", "Morgan le Fay", 224, false);
const bookOfVishanti = new Book("Book of Vishanti", "Agamotto", 160, false);

addBookToLibrary(theHobbit);
addBookToLibrary(darkhold);
addBookToLibrary(bookOfVishanti)

console.table(myLibrary);
