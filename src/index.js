import "./styles.css";

//Varabiles that hold's course review information
const MA122 = { reviews: [], birdiness: [], date: [] };
const CP104 = { reviews: [], birdiness: [], date: [] };
const ES110 = { reviews: [], birdiness: [], date: [] };
const OL140 = { reviews: [], birdiness: [], date: [] };
const UU150 = { reviews: [], birdiness: [], date: [] };

//Holds the Review of the user to input into the course
const UserReview = { reviews: "", birdiness: "", date: "" };
var course = "";

//Loads the website based on local storage
function load() {
  if (localStorage["class1" + Course] != null) {
    console.log("fire");
    course = document.getElementById("subTitle").innerHTML;
    console.log(count);

    for (
      var x = 1;
      x < count + 1 && localStorage["class" + x + Course].slice(0, 5) == course;
      x++
    ) {
      console.log("x");
      addToPage(
        localStorage["bird" + x + Course],
        localStorage["info" + x + Course]
      );
    }
  }
}

//gets user review of course
function getInput() {
  var getValue = document.getElementById("EnterInfo");
  //addText(getValue);
  addReview(getValue);
  clearInput("EnterInfo");
  count += 1;
}

//adds the review into the user review
function addReview(getValue) {
  UserReview.reviews = getValue.value;
}

//clears the input of course review
function clearInput(InputType) {
  console.log("clear");
  var getValue = document.getElementById(InputType);
  getValue.value = "";
}

//gets the course/class who's review will be added too
function getClass() {
  var object = "MA122";
  if (course == "MA122") {
    object = MA122;
  }
  if (course == "CP104") {
    object = CP104;
  }
  if (course == "ES110") {
    object = ES110;
  }
  if (course == "OL140") {
    object = OL140;
  }
  if (course == "UU150") {
    object = UU150;
  }
  return object;
}

//push's the review into the course object and adds it to the page and local storage
function pushReview() {
  var object = getClass();
  console.log(object);
  object.reviews.push(UserReview.reviews);
  object.birdiness.push(UserReview.birdiness);
  object.date.push(Date.now());
  addToPage(object.birdiness.slice(-1), object.reviews.slice(-1));
  addLocalStorage(
    course,
    object.birdiness.slice(-1),
    object.date.slice(-1),
    object.reviews.slice(-1)
  );
  calculation();
}

//resets the local storage
function resetdata() {
  localStorage.clear();
}

//adds the new review onto the page
function addToPage(birdiness, info) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  li.setAttribute("id", "text");
  li.style.overflowWrap = "break-word";
  li.style.border = "gray 2px solid";
  li.style.backgroundColor = "white";
  li.style.listStyle = "none";
  li.style.textAlign = "left";
  li.style.padding = "20px";
  let rev = document.getElementById("Review");
  li.textContent = info;
  a.textContent = birdiness;
  a.setAttribute("id", birdiness);

  rev.appendChild(li);
  rev.appendChild(a);
}

//adds the uses inputed bird level onto the user review
function addBirdiness(item) {
  UserReview.birdiness = item.innerHTML;
}

//adds the information of the review into local storage
function addLocalStorage(Class, birdiness, date, info) {
  window.localStorage.setItem("class" + count + Course, Class);
  window.localStorage.setItem("info" + count + Course, info);
  window.localStorage.setItem("bird" + count + Course, birdiness);
  window.localStorage.setItem("date" + count + Course, date);
  window.localStorage.setItem("count" + Class, count);
}

//clears the local strorage
function clearlocalStorage() {
  window.localStorage.clear();
}

//calucluates the bird level average
function calculation() {
  var list = [];
  var bird = 0;

  //adds all the reviews into a list
  for (
    var x = 1;
    x < count + 1 && localStorage["class" + x + Course].slice(0, 5) == course;
    x++
  ) {
    list.push(localStorage["bird" + x + Course]);
  }
  //adds a number based on the the letter ranking
  for (var x in list) {
    console.log(list[x]);
    if (list[x] == "A") {
      bird += 4;
    }
    if (list[x] == "B") {
      bird += 3;
    }
    if (list[x] == "C") {
      bird += 2;
    }
    if (list[x] == "D") {
      bird += 1;
    }
  }
  //gets the average of the rankging
  bird = bird / list.length;
  console.log(bird, "number");

  //based on the average assigns a new bird level
  if (bird >= 4) {
    bird = "A";
  } else if (bird < 4 && bird >= 3) {
    bird = "B";
  } else if (bird < 3 && bird >= 2) {
    bird = "C";
  } else {
    bird = "D";
  }
  console.log(bird, "bird");
  //sends the average bird level into the local storage
  window.localStorage.setItem("overallBird" + Course, bird);
}

//loads the main page based on the hard coded courses and the information based on local storage
function loadMain() {
  if (localStorage["overallBirdMA122"] != null) {
    document.querySelector(".MA122").innerHTML =
      localStorage["overallBirdMA122"];
    document.querySelector(".MA122").id = localStorage["overallBirdMA122"];
  }
  if (localStorage["overallBirdUU150"] != null) {
    document.querySelector(".UU150").innerHTML =
      localStorage["overallBirdUU150"];
    document.querySelector(".UU150").id = localStorage["overallBirdUU150"];
  }
  if (localStorage["overallBirdCP104"] != null) {
    document.querySelector(".CP104").innerHTML =
      localStorage["overallBirdCP104"];
    document.querySelector(".CP104").id = localStorage["overallBirdCP104"];
  }
  if (localStorage["overallBirdES110"] != null) {
    document.querySelector(".ES110").innerHTML =
      localStorage["overallBirdES110"];
    document.querySelector(".ES110").id = localStorage["overallBirdES110"];
  }
  if (localStorage["overallBirdOL140"] != null) {
    document.querySelector(".OL140").innerHTML =
      localStorage["overallBirdOL140"];
    document.querySelector(".OL140").id = localStorage["overallBirdOL140"];
  }
}
//START
//checks if user is on the main page or is on a course page
var newPage = true;
if (document.getElementById("course") == null) {
  newPage = true;
} else {
  newPage = false;
}

//if user is on a course page, loads that cources infotmation
if (newPage === true) {
  var Course = document.getElementById("subTitle").innerHTML;
  if (localStorage["count" + Course] > 0) {
    var count = parseInt(localStorage["count" + Course]);
    console.log(count, "heyyy");
  } else {
    var count = 0;
  }

  load();
  course = document.getElementById("subTitle").textContent;
  document
    .getElementById("InfoEnter")
    .addEventListener("click", getInput, false);
  document.querySelectorAll(".BIRD").forEach((item) => {
    item.addEventListener("click", (event) => {
      addBirdiness(item);
    });
  });
  document
    .getElementById("Submit")
    .addEventListener("click", pushReview, false);
  //else loads the main page
} else {
  loadMain();
  document
    .getElementById("clearStorage")
    .addEventListener("click", clearlocalStorage, false);
  document
    .getElementById("CourseEnter")
    .addEventListener("click", resetdata, false);
}
