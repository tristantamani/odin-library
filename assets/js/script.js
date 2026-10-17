let myLibrary = [];
const darkhold = new Book("Darkhold", "Morgan le Fay", 224, "unread");
const bookOfVishanti = new Book("Book of Vishanti", "Agamotto", 160, "unread");

const bookList = document.querySelector(".books-list");
const addButton = document.querySelector(".add-button")
const form = document.querySelector("form");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".cancel");
const submitButton = document.querySelector(".submit")
const dialogTitle = document.querySelector("#title");
const dialogAuthor = document.querySelector("#author");
const dialogPages = document.querySelector("#pages");

addButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => {
    form.reset()
    dialog.close()
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewBook();
    form.reset();
    dialog.close();
});
dialog.addEventListener("cancel", () => dialog.returnValue = "cancelEvent");

addBookToLibrary(darkhold);
addBookToLibrary(bookOfVishanti)

displayBooks();

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    let child = bookList.lastElementChild;
    while (child) {
        bookList.removeChild(child);
        child = bookList.lastElementChild;
    }

    for (books of myLibrary) {
        let book = document.createElement("div");
        let title = document.createElement("div");
        let author = document.createElement("div");
        let pages = document.createElement("div");
        let status = document.createElement("div");
        let actions = document.createElement("div");
        let removeButton = document.createElement("button");

        book.setAttribute("data-id", books.id)

        removeButton.addEventListener("click", () => {
            let bookId = book.getAttribute("data-id");
            myLibrary = myLibrary.filter(item => item.id != bookId);
            displayBooks();
        });

        title.textContent = books.title;
        author.textContent = books.author;
        pages.textContent = books.pages;
        removeButton.textContent = "Remove Book";

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
        removeButton.classList.add("remove-button")

        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
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