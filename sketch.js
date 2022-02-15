var dog, sadDog, happyDog, garden, washroom, milk, livingRoom;
var database;
var foodS, foodStock;
var fedTime, lastFed, currentTime;
var feed, addFood;
var foodObj;
var gameState, readState;

function preload() {
  sadDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happyDog.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/washRoom.png");
  bedroom = loadImage("images/bedRoom.png");
  livingRoom = loadImage("images/livingRoom.png");
  milk = loadImage("images/milk.png");
}

function setup() {
  createCanvas(600, 500);
  foodObj = new Food();

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  //read game state from database
  readState = database.ref('gameState');
  readState.on("value", function (data) {
    gameState = data.val();
  });

  dog = createSprite(200, 400, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background("green");
  
  currentTime = hour();

  if (gameState == 1) {
    dog.addImage(happyDog);
    dog.scale = 0.175;
    dog.y = 250;
  }

  if(gameState == 2){
    dog.addImage(sadDog);
    dog.scale = 0.175;
    dog.y = 250;
    milk.visible = false;
  }

  var Bath = createButton("I want to take bath");
  Bath.position(580,125)
  if(Bath.mousePressed(function(){
     gameState = 3;
     database.ref('/').update({
      'gameState': gameState
    })
  }));

  if(gameState == 3){
    dog.addImage(washroom);
    dog.scale = 1;
    milk.visible = false;
  }

  var Sleep = createButton("I am very Sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState = 4;
    database.ref('/').update({
      'gameState': gameState
   })
 }));

 if(gameState == 4){
   dog.addImage(bedroom);
   dog.scale = 1;
   milk.visible = false;
 }

 var Play = createButton("Let's Play!");
 Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState = 5;
    database.ref('/').update({
      'gameState': gameState
   })
 }));

 if(gameState == 5){
   dog.addImage(livingRoom);
   dog.scale = 1;
   milk.visible = false;
 }

 var PlayInGarden = createButton("Let's play in park");
 PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({
     'gameState': gameState
   })
 }));

 if(gameState == 6){
   dog.addImage(garden);
   dog.scale = 1;
   dog.y = 175;
   milk.visible = false;
 }

  drawSprites();
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(){
  database.ref('/').update({
    Food: x
  })
}

function feedDog() {
  var button = createButton("Feed the Dog");
  button.position(400,125);
  if(button.mousePressed(function(){
      foodS = foodS-1;
      gameState = 1;
      database.ref('/').update({
          'gameState': gameState
      })
  }));

  var addFood = createButton("Add Food");
  addFood.position(500,125);
  if(addFood.mousePressed(function(){
      foodS = foodS+1;
      gameState = 2;
      database.ref('/').update({
          'gameState': gameState
      })
  }));
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(gameState) {
  database.ref('/').update({
    'gameState': gameState
  })
}