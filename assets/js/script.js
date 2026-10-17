const myLibrary = [];
const darkhold = new Book("Darkhold", "Morgan le Fay", 224, false);
const bookOfVishanti = new Book("Book of Vishanti", "Agamotto", 160, false);

const bookList = document.querySelector(".books-list");
const addButton = document.querySelector(".add-button")
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

addButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = function () {
        return this.id.crypto.randomUUID();
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    for (books of myLibrary) {
        let book = document.createElement("div");
        let title = document.createElement("div");
        let author = document.createElement("div");
        let pages = document.createElement("div");
        let status = document.createElement("div");

        title.textContent = books.title;
        author.textContent = books.author;
        pages.textContent = books.pages;
        status.textContent = books.hasRead ? "Has read" : "Not read yet";

        book.classList.add("book");
        title.classList.add("title");
        author.classList.add("author");
        pages.classList.add("pages");
        status.classList.add("status");

        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(status);

        bookList.appendChild(book);
    }
}

addBookToLibrary(darkhold);
addBookToLibrary(bookOfVishanti)

displayBooks();
