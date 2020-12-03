//Create variables here
var pet,petImg,happyPet,happyPetImg;
var foodStock,food,foodObj;
var database
var button1,button2;
var milkImg
var milk=[]
var lastFed;
var input,button3,petName;
var getPetName;
var gameState;
var gardenImg,bedroomImg,washroomImg;
function preload()
{
  //load images here
  petImg=loadImage("images/Dog.png");
  happyPetImg=loadImage("images/happydog.png");
  milkImg=loadImage("Milk.png")
  gardenImg=loadImage("images/Garden.png")
  bedroomImg=loadImage("images/Bed Room.png")
  washroomImg=loadImage("images/Wash Room.png")
}

function setup() {
  
  createCanvas(1000, 500);

  pet=petImg

  button1=createButton("add food")
  button2=createButton("feed food")
  input=createInput("pet name")
  button3=createButton("continue")

  database=firebase.database()
  foodStock=database.ref('food')
  foodStock.on("value",readNum)  

  foodObj=new Food()

}


function draw() { 
  background(46,139,87) 
  
  //add styles here

  if(food!==undefined && gameState==="hungry"){
    for(var i=200;i<=270;i+=70){
      for(var j=1;j<=food/2;j++){
        milk.push( image(milkImg,j*30,i,50,70))
      }
    }
    
  }
  
  
  if(food!==undefined && gameState==="hungry"){
  fill("red")
  textSize(25)
  text("food left  "+food,150,100)

  fill("red")
  textSize(25)
  text("last fed  "+lastFed,150,200)

  fill("red")
  textSize(25)
  text(petName,800,300)

  if(food===0){
    fill("red")
    textSize(30)
    text("food is over",100,50);
    }
    
    imageMode(CENTER)
    translate(850,400)
    image(pet,0,0,160,200)

  }

      button1.position(450,100)
      button2.position(50,100)
      input.position(650,100)
      button3.position(700,150)
      

      if(food===undefined){
          fill("red")
          textSize(25)
          text("loading",150,100)
      }
      
      button1.mousePressed(()=>{addFood(food)})
    
      if(food!==undefined && food>0){
          button2.mousePressed(()=>{reducefood(food)})
      }
      
      button3.mousePressed(()=>{
      getPetName=input.value()

      button3.hide()
      input.hide()
      
      database.ref('/').update({
        petname:getPetName
      })

      })

      var getName=database.ref('petname')
      getName.on("value",(data)=>{
        petName=data.val()
      })
    

  changeState()

  foodObj.getLastFed()
  foodObj.getState()
  foodObj.garden()
  foodObj.bedroom()

}

function readNum(data){
  food=data.val()
  //food=foodStock;
}

function reducefood(obj){

  if(food>0){
    getTime()
    food--;
    console.log("pressed")
    database.ref('/').update({
      food:obj
    })

    pet=happyPetImg
  }
    
}

function addFood(obj){
  food++;

  database.ref('/').update({
    food:obj
  })
  pet=petImg
}

async function getTime(){
  var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  var responseJSON=await response.json()
  var dateTime=responseJSON.datetime
  var hour=dateTime.slice(11,16)
  
  database.ref('/').update({
    lastfed:hour
  })

}

function changeState(){
    if(keyDown("g")){
      foodObj.updateState("playing");
    }

    if(keyDown("h")){
      foodObj.updateState("hungry")
    }

    if(keyDown("b")){
      foodObj.updateState("sleep");
    }
}