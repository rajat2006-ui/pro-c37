class Food{
    constructor(){

    }

    getLastFed(){
        var getlastFed=database.ref('lastfed')
        getlastFed.on("value",(data)=>{
        lastFed=data.val()
  })
    }

    getState(){
        var getState=database.ref('gamestate')
        getState.on("value",(data)=>{
            gameState=data.val()
        })
    }

    updateState(state){
        database.ref('/').update({
            gamestate:state
        })
    }

    garden(){
        if(gameState==="playing"){
            imageMode(CENTER)
            image(gardenImg,500,250,1000,500)
            button1.hide()
            button2.hide()
            button3.hide()
            input.hide()
        }
    }

    bedroom(){
        if(gameState==="sleep"){
            imageMode(CENTER)
            image(bedroomImg,500,250,1000,500)
            button1.hide()
            button2.hide()
            button3.hide()
            input.hide()
        }
    }
}