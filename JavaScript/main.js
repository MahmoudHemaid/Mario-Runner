var screenWidth = document.getElementById("platform1").offsetWidth;
var platform1 = document.getElementById("platform1");
var platform2 = document.getElementById("platform2");
var mountains = document.getElementById("mountains");
var bullet = document.getElementById("bullet");
var player = document.getElementById("player");
var VhToPx = document.getElementById("body").offsetHeight / 100;
console.log();
(function () {
    platform1.style.left = - screenWidth + "px";
    platform2.style.left = "0px";
    mountains.style.left = - screenWidth + "px";
    bullet.style.left = - screenWidth + "px";
    player.style.bottom = "0vh";
    bullet.style.bottom = "0vh";
    mountains.style.bottom = "0vh";
})();

var platformMove = 15, mountainsMove = 6, jumpMove = 7, bulletMove = 25;

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
var bulletLeft = parseInt(bullet.style.left.slice(0, -2));
function mountainsFanc() {
    if(mountainsLeft >= screenWidth * 3){
        mountainsLeft = -screenWidth;
    }else{
        mountainsLeft +=  mountainsMove;
    }
    mountains.style.left = mountainsLeft + "px";
}
var bulletRun = false;
function bulletFanc() {
    if(bulletLeft >= screenWidth){
        bulletLeft = -screenWidth;
        bulletRun = false;
    }else{
        bulletLeft +=  bulletMove;
    }
    bullet.style.left = bulletLeft + "px";
}
var playerBottom = parseInt(player.style.bottom.slice(0, -2));
var isJumping = false;
var jumpCount = 1;
function jump(){
    if (isJumping == false){
        isJumping = true;
    }
}
var i = 1;
jump();
function touched (op1, op2){
    //player.style.bottom.slice(0, -2) * VhToPx <= parseInt(bullet.style.bottom.slice(0, -2)) + bullet.offsetHeight &&( player.offsetLeft <= bullet.offsetLeft + bullet.offsetWidth && bullet.offsetLeft <= player.offsetLeft + player.offsetWidth)
    return op1.style.bottom.slice(0, -2) * VhToPx <= parseInt(op2.style.bottom.slice(0, -2)) + op2.offsetHeight &&( op1.offsetLeft <= op2.offsetLeft + op2.offsetWidth && op2.offsetLeft <= op1.offsetLeft + op1.offsetWidth);
}
var timer = window.setInterval(function(){
    if(touched(player, bullet)){ // Game Over
        clearInterval(timer);
        alert("Game Over!");
    }else{
        platform();
        playerRunning();
        mountainsFanc();
        if(i % 50 == 0){
            bulletRun = true;
        }
        if (bulletRun){
            bulletFanc();
        }
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
        
        i++;
    }
    
    //console.log( "Player left" + player.offsetLeft + " bullet left " + bullet.offsetLeft);
    
    //console.log("First "+ (player.offsetLeft <= bullet.offsetLeft + bullet.offsetWidth));
    console.log();
    
}, 60 );
