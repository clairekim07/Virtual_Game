var database;
var ball;
var dog, happyDog, database, foodS, foodStock,dogIMG;
//var showError;
function preLoad(){
    dogIMG = loadImage("dog.png");
    happyDog = loadImage("happydog.png");
}
function setup(){
    database = firebase.database();
    //console.log(database);
    createCanvas(500,500);
    
    
    dog = createSprite(250,250,10,10);
    dog.addImage(dogIMG);
    dog.scale = .8;
    foodStock = database.ref('food');
    foodStock.on('value',readStock);
    


}

function draw(){
    background("green");
 
    if(keyDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(happyDog);
    }
    drawSprites();
    textSize(15);
    fill("blue");
    text("Note: Press UP_ARROW Key to Feed Drago Milk!",200,100);
    text("Food remaining : "+foodS,170,200);

}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
   if(x <= 0){
       x = 0;
   }else{
       x=x-1;
   }
    database.ref('/').update({
            food:x
})
}

function showError(){
    console.log("Error in writing to the database.");
}

