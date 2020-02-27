let bookGenre = "No genre selected.";
let userArray = [];
let bookArray = [
  {
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    publishdate: "2011"
  },
  {
    title: "Words of Radiance",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    publishdate: "2014"
  },
  {
    title: "Oathbringer",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    publishdate: "2015"
  },
  {
    title: "Timegods World",
    author: "LE Modesite Jr",
    genre: "SciFi",
    publishdate: "1985"
  },
  {
    title: "The Forever Hero",
    author: "LE Modesitt Jr.",
    genre: "SciFi",
    publishdate: "1990"
  },
  {
    title: "The Black Company",
    author: "Glen Cook",
    genre: "Fantasy",
    publishdate: "1984"
  },
  {
    title: "Angels & Demons",
    author: "Dan Brown",
    genre: "Fiction",
    publishdate: "2000"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Fiction",
    publishdate: "2002"
  },
  {
    title: "The Lost Symbol",
    author: "Dan Brown",
    genre: "Fiction",
    publishdate: "2009"
  },
  {
    title: "Inferno",
    author: "Dan Brown",
    genre: "Fiction",
    publishdate: "2012"
  }
];

// define a constructor to create player objects
let UserObject = function(pFirstName, pLastName, pEmail) {
  this.FirstName = pFirstName;
  this.LastName = pLastName;
  this.Email = pEmail;
};

// defining a constructor to create book objects
let BookObject = function(pTitle, pAuthor, pGenre, pPublishDate) {
  this.Title = pTitle;
  this.Author = pAuthor;
  this.Genre = pGenre;
  this.PublishDate = pPublishDate;
};

document.addEventListener("DOMContentLoaded", function() {
  document
    .getElementById("btnCreateUser")
    .addEventListener("click", function() {
      userArray.push(
        new UserObject(
          document.getElementById("firstName").value,
          document.getElementById("lastName").value,
          document.getElementById("email").value
        )
      );
    });

  document.getElementById("btnAddBook").addEventListener("click", function() {
    bookArray.push(
      new BookObject(
        document.getElementById("title").value,
        document.getElementById("author").value,
        bookGenre,
        document.getElementById("publishDate").value
      )
    );
  });

  $(document).bind("change", "#ddlGenre", function(event, ui) {
    bookGenre = $("#ddlGenre").val();
  });

  $(document).on("pagebeforeshow", "#users", function(event) {
    // have to use jQuery
    // document.getElementById("IDparmHere").innerHTML = "";
    createUserList();
  });

  $(document).on("pagebeforeshow", "#inventory", function(event) {
    createBookList();
  });
});

function createUserList() {
  //Just for now to have this work
  // clear prior data
  var divUsers = document.getElementById("divUsers");
  while (divUsers.firstChild) {
    // remove any old data so don't get duplicates
    divUsers.removeChild(divUsers.firstChild);
  }
  var ul = document.createElement("ul");
  userArray.forEach(function(element) {
    // use handy array forEach method
    var li = document.createElement("li");
    li.innerHTML =
      element.firstName + " " + element.LastName + " " + element.email;
    ul.appendChild(li);
  });
  divUsers.appendChild(ul);
}

function createBookList() {
  var divBooks = document.getElementById("divBooks");
  while (divBooks.firstChild) {
    divBooks.removeChild(divBooks.firstChild);
  }
  let ul = document.createElement("ul");
  bookArray.forEach(function(element) {
    let li = document.createElement("li");
    li.innerHTML =
      element.title +
      " " +
      element.author +
      " " +
      element.genre +
      " " +
      element.publishdate;
    ul.appendChild(ul);
  });
  divBooks.appendChild(ul);
}

function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function(a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
}
