let myLibrary = [];
let selectedBookId = null;

class Book {
    id = crypto.randomUUID();

    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    changeStatus(newStatus) {
        this.status = newStatus;
    }
}

const darkhold = new Book("Darkhold", "Morgan le Fay", 224, "unread");
const bookOfVishanti = new Book("Book of Vishanti", "Agamotto", 160, "unread");

const bookList = document.querySelector(".books-list");
const addButton = document.querySelector(".add-button")
const bookForm = document.querySelector(".book-dialog form");
const statusForm = document.querySelector(".status-dialog form");
const bookDialog = document.querySelector(".book-dialog");
const statusDialog = document.querySelector(".status-dialog");
const closeButton = document.querySelector(".cancel");
const submitButton = document.querySelector(".submit")
const dialogTitle = document.querySelector("#title");
const dialogAuthor = document.querySelector("#author");
const dialogPages = document.querySelector("#pages");

addButton.addEventListener("click", () => bookDialog.showModal());

closeButton.addEventListener("click", () => {
    bookForm.reset();
    bookDialog.close();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewBook();
    bookForm.reset();
    bookDialog.close();
});

statusForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const dialogStatus = statusForm.querySelector("input[name='status']:checked");
    const book = myLibrary.find((item) => item.id === selectedBookId);

    if (book && dialogStatus) {
        book.changeStatus(dialogStatus.value);
    }

    statusForm.reset();
    statusDialog.close();
    selectedBookId = null;

    displayBooks();
});

addBookToLibrary(darkhold);
addBookToLibrary(bookOfVishanti)

displayBooks();

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    let child = bookList.lastElementChild;
    while (child) {
        bookList.removeChild(child);
        child = bookList.lastElementChild;
    }

    for (const books of myLibrary) {
        let book = document.createElement("div");
        let title = document.createElement("div");
        let author = document.createElement("div");
        let pages = document.createElement("div");
        let status = document.createElement("div");
        let actions = document.createElement("div");
        let removeButton = document.createElement("button");
        let editButton = document.createElement("button");

        const cancelButton = document.querySelector(".status-dialog .cancel");

        cancelButton.addEventListener("click", () => {
            statusForm.reset();
            statusDialog.close();
        });

        book.setAttribute("data-id", books.id);

        removeButton.addEventListener("click", () => {
            let bookId = book.getAttribute("data-id");
            myLibrary = myLibrary.filter(item => item.id != bookId);
            displayBooks();
        });

        editButton.addEventListener("click", () => {
            selectedBookId = books.id;

            const currentStatus = statusForm.querySelector(`input[name="status"][value="${books.status}"]`);

            if (currentStatus) {
                currentStatus.checked = true;
            }

            statusDialog.showModal();
        });

        title.textContent = books.title;
        author.textContent = books.author;
        pages.textContent = books.pages;
        removeButton.textContent = "Remove Book";
        editButton.textContent = "Edit";

        switch (books.status) {
            case "unread":
                status.textContent = "Not read yet";
                break;
            case "reading":
                status.textContent = "Currently reading";
                break;
            case "finished":
                status.textContent = "Finished";
                break;
        }

        book.classList.add("book");
        title.classList.add("title");
        author.classList.add("author");
        pages.classList.add("pages");
        status.classList.add("status");
        actions.classList.add("actions");
        removeButton.classList.add("remove-button");
        editButton.classList.add("edit-button");

        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        status.appendChild(editButton);
        book.appendChild(status);
        actions.appendChild(removeButton);
        book.appendChild(actions);

        bookList.appendChild(book);
    }
}

function createNewBook() {
    const dialogStatus = document.querySelector("input[name='status']:checked");

    let title = dialogTitle.value;
    let author = dialogAuthor.value;
    let pages = dialogPages.value;
    let status = dialogStatus.value;
    let newBook = new Book(title, author, pages, status);

    addBookToLibrary(newBook);
    displayBooks();
}