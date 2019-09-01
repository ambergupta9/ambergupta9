const articlesSection = document.querySelector(".writing");

axios.get(`https://dev.to/api/articles?username=aspittel`).then(articles => {
  articles.data
    .sort((a, b) => a.positive_reactions_count - b.positive_reactions_count)
    .slice(20, 30)
    .reverse()
    .forEach(article => {
      const link = document.createElement("a")
      link.setAttribute("href", article.url)
      link.textContent = article.title
      articlesSection.appendChild(link)
    })
  const link = document.createElement("a")
  link.setAttribute("href", "https://dev.to/aspittel")
  link.setAttribute("style", "color:#ab47bc;")
  link.textContent = "View All"
  articlesSection.appendChild(link)
})


var vehicles = [];
var food = [];
var poison = [];

var debug;


function setup () {
  
  createCanvas(window.innerWidth, document.body.offsetHeight)
  noStroke()
  for (var i = 0; i < 50; i++) {
    var x = random(width);
    var y = random(height);
    vehicles[i] = new Vehicle(x, y);
  }

  for (var i = 0; i < 40; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  for (var i = 0; i < 20; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  debug = createCheckbox();


}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(0);

  if (random(1) < 0.1) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  if (random(1) < 0.01) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }


  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }

  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].display();

    var newVehicle = vehicles[i].clone();
    if (newVehicle != null) {
      vehicles.push(newVehicle);
    }

    if (vehicles[i].dead()) {
      var x = vehicles[i].position.x;
      var y = vehicles[i].position.y;
      food.push(createVector(x, y));
      vehicles.splice(i, 1);
    }

  }
}

window.onresize = () => {
  resizeCanvas(window.innerWidth, document.body.offsetHeight)
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} 
  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
