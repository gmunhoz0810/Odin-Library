let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.color = getRandomColor(); // Assign a random color to each book when it is created
}

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked ? "Yes" : "No";
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);

  displayBooks();
}

function displayBooks() {
  let grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    card.style.backgroundColor = myLibrary[i].color;

    let readStatus = myLibrary[i].read ? "Read" : "Not Read";
    let readButtonColor = myLibrary[i].read ? "read-btn" : "not-read-btn";

    let content = `
        <h2>${myLibrary[i].title}</h2>
        <h3>By ${myLibrary[i].author}</h3>
        <p>${myLibrary[i].pages} pages</p>
        <button class="${readButtonColor}" onclick="toggleRead(${i})">${readStatus}</button>
        <button class="delete-btn" onclick="deleteBook(${i})">Delete</button>
    `;
    card.innerHTML = content;
    grid.appendChild(card);
  }
}

document.getElementById("newBook").addEventListener("click", function () {
  document.getElementById("formContainer").style.display = "block";
});

document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Add book to library before clearing form fields
    addBookToLibrary();

    // Clear form fields and hide the form after adding book
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;

    document.getElementById("formContainer").style.display = "none";
  });

function deleteBook(index) {
  // Remove the book at the specific index
  myLibrary.splice(index, 1);

  // Re-display books
  displayBooks();
}

Book.prototype.toggleReadStatus = function () {
  this.read = this.read === "Yes" ? "No" : "Yes";
};

// Sample data
const titles = [
  "The Great Gatsby",
  "Moby Dick",
  "1984",
  "Pride and Prejudice",
  "To Kill a Mockingbird",
  "War and Peace",
  "The Odyssey",
  "Ulysses",
  "The Catcher in the Rye",
  "Crime and Punishment",
];
const authors = [
  "F. Scott Fitzgerald",
  "Herman Melville",
  "George Orwell",
  "Jane Austen",
  "Harper Lee",
  "Leo Tolstoy",
  "Homer",
  "James Joyce",
  "J.D. Salinger",
  "Fyodor Dostoevsky",
];
const pages = [180, 200, 250, 300, 350, 400, 450, 500, 550, 600];

// Random book generator
function randomBook(i) {
  let title = titles[i];
  let author = authors[i];
  let page = pages[i];
  let read = Math.random() > 0.5 ? "Yes" : "No";

  return new Book(title, author, page, read);
}

// Generate 20 random books
for (let i = 0; i < 10; i++) {
  myLibrary.push(randomBook(i));
}

// Display the books on page load
document.addEventListener("DOMContentLoaded", function () {
  displayBooks();
});

function toggleRead(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
