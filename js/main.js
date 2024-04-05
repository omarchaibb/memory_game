let cardsContainer = document.querySelector(".cards");
let score = document.querySelector(".score-and-trays .score p span")
let trys = document.querySelector(".trys p span")

function shuffle(array){
    let shuffled_array =[]
    let usedNumbers = []
    let i = 0
    while (i<array.length){
        let index = Math.floor(Math.random() * array.length)
        // === if the indox not in the usedNumbers we will use it and push it to usedNumbers ===
        if(!usedNumbers.includes(index)){
            usedNumbers.push(index)
            shuffled_array.push(array[index])
            i++
        }
    }
    return shuffled_array
}

function createElements() {
    let images_path_array = ["images/cherries.png","images/chili.png","images/lemon.png","images/orange.png","images/pineapple.png","images/strawberry.png","images/cherries.png","images/chili.png","images/lemon.png","images/orange.png","images/pineapple.png","images/strawberry.png"];
        images_path_array = shuffle(images_path_array);
        
    for (let i = 0; i < 12; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = `card_${i}`

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

        images.style.height = "52%"
        images.style.width = "55%"
        images.style.marginLeft = "30px"
        faceBack.style.width = "100%";
        faceBack.style.height = "100%";
        faceFront.style.width = "100%";
        faceFront.style.height = "100%";
        faceFront.style.backgroundImage = "url('data:image/svg+xml,<svg id=\"patternId\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><defs><pattern id=\"a\" patternUnits=\"userSpaceOnUse\" width=\"25\" height=\"25\" patternTransform=\"scale(2) rotate(0)\"><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"hsla(0,0%,100%,1)\"/><path d=\"M25 30a5 5 0 110-10 5 5 0 010 10zm0-25a5 5 0 110-10 5 5 0 010 10zM0 30a5 5 0 110-10 5 5 0 010 10zM0 5A5 5 0 110-5 5 5 0 010 5zm12.5 12.5a5 5 0 110-10 5 5 0 010 10z\"  stroke-width=\"1\" stroke=\"none\" fill=\"hsla(172, 48%, 41%, 1)\"/><path d=\"M0 15a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm25 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM12.5 2.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0 25a2.5 2.5 0 110-5 2.5 2.5 0 010 5z\"  stroke-width=\"1\" stroke=\"none\" fill=\"hsla(186, 88%, 43%, 1)\"/></pattern></defs><rect width=\"800%\" height=\"800%\" transform=\"translate(0,0)\" fill=\"url(%23a)\"/></svg>')";
        faceFront.style.borderRadius = "10px";
    }

    handleCardClicks()           
}



function handleCardClicks(){
    let allback  = document.querySelectorAll(".back")
    let allcard = document.querySelectorAll(".card")
    let selected_array = []
    allcard.forEach(card => {
        card.addEventListener("click",function(){

            // ===== add transition after the click on the card =====
                card.classList.add("transition")
            // ===== add selected after the click on the card =====
                card.classList.add("selected")
             // ===== add rotate to the all backs after the click on the card =====
            allback.forEach(back => {
                back.classList.add("rotate")
            });
            // ==== push the card that contains selected class to selected array because we well compaire them letter ====
            if(card.classList.contains("selected")){
                selected_array.push(card)
            }
            
            if(selected_array.length == 2){
                // ==== if two element selected have the same id we will remove one of them because we dont want the same element at the selected array ====
                if(selected_array[0].id == selected_array[1].id){
                    selected_array.splice(1, 1);
        
                }
                // ==== the card that not selected and not in the selected array we will add to them class of not clickable and we will removet after 1.2 second and that to avoid click on to meny card at the same time so after the transitions we are able to click =====
                allcard.forEach(card =>{
                    if(!selected_array.includes(card)){
                        setTimeout(()=>{
                        // ==== make the other carder not clickable ===
                            card.classList.add("not-clickable")
                        },0)
                        setTimeout(()=>{
                        // ==== we will remove the class clickable =====
                            card.classList.remove("not-clickable")
                        },1300)
                    }
                })
                // ==== call checkWinOrLose fucntio  ====
                checkwin(trys,score,allcard)
                // ==== check the first element and second element of selected_array ar they the same and they id deff ====
                if(selected_array[0].innerHTML == selected_array[1].innerHTML && selected_array[0].id !== selected_array[1].id){
                    // === add the score ===
                    let audio = new Audio("audio/click2.mp3")
                    audio.play();
                    score.innerHTML = parseInt(score.innerHTML) + 1
                    // ==== add not clickable because we don't want to clickc to them again and the score will increase ===
                    selected_array[0].classList.add("not-clickable")
                    selected_array[1].classList.add("not-clickable")
                    selected_array = []
                }else{
                    
                    setTimeout(() => {
                        // ==== check if the two card not the same ====
                        if(selected_array[0].innerHTML !== selected_array[1].innerHTML){
                            //==== decrease  the trys =====
                            trys.innerHTML = parseInt(trys.innerHTML)-1

                            //==== remove the transition of the two card on the selected_array ====
                            selected_array[0].classList.remove("transition","selected")
                            selected_array[0].classList.add("front-transition")
                            selected_array[1].classList.remove("transition","selected")
                            selected_array[1].classList.add("front-transition")
                            selected_array =[]
                        }
                    }, 1300);
                }
                


            }
        })
        //==== befor the start ======
        cardsContainer.classList.add("blur","not-clickable")
        let start_button = document.querySelector(".start-and-shuffle .start")
        //==== remove the start button after the click =====
        start_button.addEventListener("click",function(){
            start_button.remove("start")
            cardsContainer.classList.remove("blur","not-clickable")
            //==== make the cards flip 1s ====
            card.classList.add("transition")
            setTimeout(() => {
                card.classList.remove("transition")
                card.classList.add("front-transition")
            }, 1000);
        })

});
}

function checkwin(trys, score, allcard) {
    let star_and_shuffle = document.querySelector(".start-and-shuffle");
    //==== check the inner html of trys and score ====
    if (parseInt(trys.innerHTML) == 1 && parseInt(score.innerHTML) !== 6) {
        let audio = new Audio("audio/fail.mp3")
        audio.play();
        //==== create a button of lose ====
        cardsContainer.classList.add("not-clickable");
        let lose = document.createElement("div");
        lose.className = "lose";
        let lose_button = document.createElement("button");
        lose_button.textContent = "You Lose";
        //==== 1.1s ofter the lose the button will appear  and we will make the card container blur===
        setTimeout(() => {
            lose.appendChild(lose_button);
            cardsContainer.classList.add("blur","not-clickable")
            star_and_shuffle.appendChild(lose);
        }, 1100);

        lose_button.addEventListener("click", function() {
            window.location.reload();
        });
    }

    if (parseInt(trys.innerHTML) !== 0 && parseInt(score.innerHTML) == 5) {
        let audio = new Audio("audio/win.mp3")
        audio.play();
        console.log("you win");
        cardsContainer.classList.add("not-clickable");
        let win = document.createElement("div");
        win.className = "win";
        let button_win = document.createElement("button");
        button_win.textContent = "YOU WIN";

        setTimeout(() => {
            win.appendChild(button_win);
            cardsContainer.classList.add("blur","not-clickable")
            star_and_shuffle.appendChild(win);
        }, 500);

        allcard.forEach(card => {
            card.classList.remove("transition");
        });
        
        
    }
}



createElements();