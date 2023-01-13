/* The export and import were giving me trouble. It throws an error in the console but still works
so I left it as I am not sure why?*/ 
import {
    bookData
} from './js/book-data.js';

const wrapper = document.querySelector(".wrapper");


  /* In the class of Book, I set up a constructor function in the following way. */ 
  class Book {
    constructor (author, language, subject, title) {
      this.author = author;
      this.language = language;
      this.subject = subject;
      this.title = title;
    }

    /* Here I set up createBook to create a new div element and set the innerHTML to display the title,
    author, language, and subject.*/ 
    createBook() {
      const newBook = document.createElement("div");
      newBook.innerHTML = `
        <div class="book-title">${this.title}</div>
        <div class="book-author">${this.author}</div>
        <div class="book-language">${this.language}</div>
        <div class="book-subject">${this.subject}</div>
      `;
      /* Here I create the comment button. */ 
      const commentButton = document.createElement("button");
      commentButton.innerHTML = "Comment";
      newBook.appendChild(commentButton);
      newBook.classList.add("book");
      
      /* Here I am creating a new div called commentDiv that will contain the comment section for the user to input comments.
      I then set it to display style none so that the comment section is hidden initially until a user clicks on the comment button. I
      then create another elemnt named commentTextArea for the user to actually type their comments. Then I set the id attribute to commentTextArea and this.title 
      because this allows for each book to have it's own comment area using the title as an identifier. Then, I set the attribute of maxlength to 280.
      Setting the maxlength to 280 will not allow input beyond this character length characters per rubric instructions. Finally, I implemented an
      event listener that reveals the comment section when the user clicks on the comment button. This section was initially set to a display of none for this reason.
      After clicking the comment button, the comment section is revealed.  */ 
      this.commentDiv = document.createElement("div");
      this.commentDiv.style.display = "none";
      this.commentTextArea = document.createElement("textarea");
      this.commentTextArea.setAttribute("id",`commentTextArea-${this.title}`);
      this.commentTextArea.setAttribute("maxlength", "280");
      this.commentDiv.appendChild(this.commentTextArea);
      this.remainingCharLabel = document.createElement("label");
      this.remainingCharLabel.innerHTML = "280 characters remaining";
      this.commentDiv.appendChild(this.remainingCharLabel);
      
      commentButton.addEventListener("click", () => {
        
        this.commentDiv.style.display = "block";
      });
      
      /* Here I am adding an event listener to the commentTextArea that is listening for the input of when a user starts typing. 
      Once the user starts typing, it begins subtracting the character count from 280 and then manipulates the remainingCharLabel's innerHtml 
      to display how many characters are left as the user is typing. */ 
      this.commentTextArea.addEventListener("input", () => {
        const remaining = 280 - this.commentTextArea.value.length;
        this.remainingCharLabel.innerHTML = `${remaining} characters remaining`;
      });
      
      /* Appenging everything here. */ 
      newBook.appendChild(this.commentDiv);
      wrapper.appendChild(newBook);
      wrapper.appendChild(document.createElement("br"));
    }


  }

  /* In the class of bookshelf I am initializing this.libro to an empty array.*/ 
  class BookShelf {
    constructor () {
      this.libro = []
    }

    /* I then use getBooks to retrieve the data from bookData an create a new instace
     of the Book class for each book.*/ 
    getBooks() {
      const data = bookData;
      for (let i = 0; i < data.length; i++) {
        const book = new Book(data[i].author, data[i].language, data[i].subject, data[i].title);
        this.libro.push(book);
      }
      return this.libro;
    }
    
    /* Then I used renderLibros to render the books. */ 
    renderLibros() {
        wrapper.innerHTML="";

        for(let i=0; i<this.libro.length; i++){
            this.libro[i].createBook();
        }
    }
  }
  
  /* getBooks is being called on newbs and the bookData is passed as an argument. renderLibros
  is then called on newbs to render the books onto the bookshelf. */ 
  
  const newbs = new BookShelf(); 
  console.log(newbs);
  newbs.getBooks(bookData);
  console.log(newbs.libro);
  newbs.renderLibros();
  
  /* Here I am adding an event listener for when the user clicks on the submit button. */ 
  const addBookForm = document.querySelector(".add-book-form");
  addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  /* Here I am getting the values of the input that the user inputs into the form. */ 
  const title = e.target.elements.title.value;
  const author = e.target.elements.author.value;
  const language = e.target.elements.language.value;
  const subject = e.target.elements.subject.value;
  
  
  const newBook = new Book(author, language, subject, title);
  

  newbs.libro.push(newBook);
  
  
  newbs.renderLibros();
});

