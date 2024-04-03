let cardsContainer = document.querySelector(".cards");

function createCards() {
    let images_path_array = ["images/apple.jpg","images/avocado.jpg","images/banane.jpg","images/lemon.jpg","images/orange.jpg","images/strawberry.jpg"];
    images_path_array = shuffle(images_path_array);

    for (let i = 0; i < 12; i++) {
        let card = document.createElement("div");
        card.className = "card";

        let images= document.createElement("img")
        images.src = `${images_path_array[i % images_path_array.length]}`
        images.style.height ="100%"
        images.style.width ="100%"
        let faceFront = document.createElement("div");
        faceFront.classList.add("face", "front");

        let faceBack = document.createElement("div");
        faceBack.classList.add("face", "back");

        faceBack.appendChild(images)
        card.appendChild(faceFront);
        card.appendChild(faceBack);

        cardsContainer.appendChild(card);

        faceBack.style.width = "100px";
        faceBack.style.height = "100px";
        faceFront.style.width = "100px";
        faceFront.style.height = "100px";
        faceBack.style.backgroundColor = "red";
        faceFront.style.backgroundColor ="blue"
    }
    let allback  = document.querySelectorAll(".back")
    let allcard = document.querySelectorAll(".card")
    allcard.forEach(element => {
        element.addEventListener("click",function(){
            if(element.classList.contains("transition")){
            }else{

                element.classList.add("transition")
            }
            allback.forEach(back => {
                back.classList.add("rotate")
            });
        })
    });
    let twins = []
    let testCards= []
    allcard.forEach(card => {
        card.addEventListener("click",function(){
            if(card.classList.contains("transition")){
                console.log(card.innerHTML);
                testCards.push(card)
                console.log(testCards);
                if(testCards[0].innerHTML === testCards[1].innerHTML){
                    console.log("nice");
                }
                else{
                    testCards = ""
                }
            }
        })
    })
    
}
function shuffle(array){
    let shuffled_array =[]
    let usedNumbers = []
    let i = 0
    while (i<array.length){
        let index = Math.floor(Math.random() * array.length)
        if(!usedNumbers.includes(index)){
            usedNumbers.push(index)
            shuffled_array.push(array[index])
            i++
        }
    }
    return shuffled_array
}
createCards();

function compareCards(){

}

