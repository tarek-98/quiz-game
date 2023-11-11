//array of words
const words = 
[
    "Hello",
    "Code",
    "Programming",
    "Tarek",
    "Javascript",
    "Cairo",
    "Country",
    "Testing",
    "Assem",
    "Linkedin",
    "Twitter",
    "Facebook",
    "Github",
    "Internet",
    "Good",
    "Destructuring",
    "Scala",
    "Styling",
    "Series",
    "Spiderman",
    "Playing",
    "Runner",
    "Task",
    "Funny",
    "Roles",
    "Intertainment",
    "Documentation",
    "Plan",
    "Mohammed",
    "Working",
];

//setting lvls
let lvls = {
    "Easy": 6,
    "Normal": 4,
    "Hard": 2,
}

let gameLvl = document.querySelector(".game-lvl")
let gameLvlType = document.querySelectorAll(".game-lvl div span")
//gnerat game lvl
gameLvlType.forEach(span => {
    span.onclick = function(e)
    {
        //remove active class from all span
        e.target.parentElement.querySelectorAll(".active").forEach(element=> {
        element.classList.remove("active")})
        //add active class to span clicked
        e.target.classList.add("active")
        //handle game lvl
        let gameLevel = this.innerHTML;
        let defaultLevelSeconds = lvls[gameLevel];
        //catch selector
        let startButton = document.querySelector(".start");
        let lvlNameSpan = document.querySelector(".message .lvl");
        let secondSpan = document.querySelector(".message .seconds");
        let theWord = document.querySelector(".the-word");
        let upcomingWords = document.querySelector(".upcoming-word");
        let input = document.querySelector(".input");
        let timeLeftSpan = document.querySelector(".time span");
        let scoreGot = document.querySelector(".score .got");
        let scoreTotal = document.querySelector(".score .total");
        let finish = document.querySelector(".finish");

        //setting lvl name , score
        lvlNameSpan.innerHTML = gameLevel;
        secondSpan.innerHTML = defaultLevelSeconds;
        timeLeftSpan.innerHTML = defaultLevelSeconds;
        scoreTotal.innerHTML= words.length;

        //disbaled paste event
        {
            input.onpaste = function(){
                return false;
            }
        }
        //start game
        startButton.onclick = function()
        {
            this.remove();
            input.focus();
            //generate fun word
            genWords()
        }

        function genWords()
        {
            //get random word
            let randomWord = words[Math.floor(Math.random() * words.length)];
            //get word index
            let wordIndex = words.indexOf(randomWord)
            //remove word froom array
            words.splice(wordIndex, 1);
            //empty upcoming word
            upcomingWords.innerHTML = '';
            //generat upcoming words
            words.forEach(word => {
                let div = document.createElement("div");
                let divText = document.createTextNode(word);
                div.appendChild(divText)
                upcomingWords.appendChild(div)
            });
            //word
            theWord.innerHTML = randomWord;
            // call start paly fun
            startPlay();
        }

        function startPlay()
        {
            timeLeftSpan.innerHTML = defaultLevelSeconds;
            let start = setInterval(() => {
                timeLeftSpan.innerHTML--;
                if(timeLeftSpan.innerHTML === "0")
                {
                    //stop timer
                    clearInterval(start)
                    //compare words
                    if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                        //empty input 
                        input.value = '';
                        //increase score
                        scoreGot.innerHTML++;
                        if(words.length > 0){
                            //call gen word fun
                            genWords();
                        }
                        else
                        {
                            let span = document.createElement("span");
                        span.className = "good";
                        let spanText = document.createTextNode("Congratz");
                        span.appendChild(spanText);
                        finish.appendChild(span);
                        //remove upcoming box
                        upcomingWords.remove();
                        }
                    }
                    else
                    {
                        let span = document.createElement("span");
                        span.className = "bad";
                        let spanText = document.createTextNode("Game Over");
                        span.appendChild(spanText);
                        finish.appendChild(span);
                    }
                }
            }, 1000)
        }
            }
})