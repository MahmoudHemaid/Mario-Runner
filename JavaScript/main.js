var screenWidth = document.getElementById("platform1").offsetWidth;
var platform1 = document.getElementById("platform1");
var platform2 = document.getElementById("platform2");
var mountains = document.getElementById("mountains");
var bump = document.getElementById("bump");
var player = document.getElementById("player");
console.log();
(function () {
    platform1.style.left = - screenWidth + "px";
    platform2.style.left = "0px";
    mountains.style.left = - screenWidth + "px";
    bump.style.left = - screenWidth + "px";
    player.style.bottom = "0vh";
})();

var platformMove = 15, mountainsMove = 6, jumpMove = 7, bumpMove = 30;

console.log();
var platform1Left = parseInt(platform1.style.left.slice(0, -2));
var platform2Left = parseInt(platform2.style.left.slice(0, -2));
function platform () {
    if (platform1Left >= screenWidth){
        platform1Left = - screenWidth + platform2Left;
    }else if (platform2Left >= screenWidth){
        platform2Left = - screenWidth + platform1Left;
    }else{
        if(platform1Left + platformMove >= screenWidth || platform2Left + platformMove >= screenWidth){
            platform1Left += screenWidth - platform1Left;
            platform2Left = screenWidth - platform1Left;
        }else{
            platform1Left += platformMove;
            platform2Left += platformMove;
        }
        
    }
    platform1.style.left = platform1Left + "px";
    platform2.style.left = platform2Left + "px";
    //console.log(platform1Left + "\n" + platform2Left);
};

var characterCase = 1, characterCases = 3, characterName = "Mario";
function playerRunning (){
    characterCase++;
    if (isJumping){
        characterCase = 3;
    }
    player.src = "image/" + characterName + characterCase +".png";
    if (characterCase == characterCases){
        characterCase = 0;
    }
}
playerRunning();
var mountainsLeft = parseInt(mountains.style.left.slice(0, -2));
var bumpLeft = parseInt(bump.style.left.slice(0, -2));
function mountainsFanc() {
    if(mountainsLeft >= screenWidth * 3){
        mountainsLeft = -screenWidth;
    }else{
        mountainsLeft +=  mountainsMove;
    }
    mountains.style.left = mountainsLeft + "px";
}
function bumpFanc() {
    if(bumpLeft >= screenWidth * 3){
        bumpLeft = -screenWidth;
    }else{
        bumpLeft +=  bumpMove;
    }
    bump.style.left = bumpLeft + "px";
}
var playerBottom = parseInt(player.style.bottom.slice(0, -2));
var isJumping = false;
var jumpCount = 1;
function jump(){
    if (isJumping == false){
        isJumping = true;
    }
}


window.setInterval(function(){
    platform();
    playerRunning();
    mountainsFanc();
    bumpFanc();
    if (isJumping){
        if(jumpCount <= 6){
            playerBottom += jumpMove;
        }else if (jumpCount <= 12) {
            playerBottom -= jumpMove;
        }else{
            jumpCount = 0;
            isJumping = false;
        }
        jumpCount++;
        player.style.bottom = playerBottom + "vh";
    }
    console.log( "Player left" + player.offsetLeft + " bump left " + bump.offsetLeft);
}, 60 );
