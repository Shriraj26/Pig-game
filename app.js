/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

newGame();


document.querySelector('.dice').style.display='none';
//dice = Math.floor(Math.random() * 6) + 1;
/*Math.random generates a random number from 0 to 1, thus mutiplying it by 6 
gives a random float number from 0 to 5, thus we floor it and add 1 so that
we get a random number of dice from 1 to 6 */
//console.log(dice);

//document.querySelector('#current-'+activePlayer).textContent = dice;
/* Now, we use querySelector method to select particular CSS element and 
we use textContent to manipulate the text of it */
//With the textContext, we can manipulate only the plain text and not the HTML

//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>';
/*In this case, we canged the content of HTML by making it Italic and is 
only possible by using the innerHTML method */

//document.querySelector('.dice').style.display = 'none';
/*Now we can even manipulate the CSS by using the style method in which we set display
to none */

function rollDice(){
        if(gamePlaying){
            //1. generate a random number 
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the random number in the Current field and display the dice
        var diceDOM = document.querySelector('.dice'); 
        diceDOM.style.display='block';
        diceDOM.src = 'dice-' + dice + '.png';

        document.querySelector('#current-'+activePlayer).textContent = dice;
        


        //3. Update the round score if the dice number is not 1
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }else{
            //4.Pass the game to another player, toggle the activePlayer and add the active class
            nextPLayer();
        }
    }
    
}

function holdFunc(){
    if(gamePlaying){
            //Add the current score to the global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('#number').value;
        //console.log('Max Score is exists and is '+input);

        var winningScore;
        if(input){ //IF input input is true means it is not 0, null or ''
            winningScore = input;
        }else{
            winningScore=20;
        }
        //console.log('win score is '+winningScore);

        //Check if the player has won the game
        if(scores[activePlayer] >= winningScore){
            
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!!';
            document.querySelector('.dice').style.display='none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }else {
            
            nextPLayer();    
        }
    }
    
    
    
    
}

function nextPLayer(){
    (activePlayer === 0)?(activePlayer = 1):(activePlayer = 0);
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //Removing the active class from active player and giving it to the next player
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //Hiding the dice when the player changes
        document.querySelector('.dice').style.display='none';
}

function newGame(){
    
    scores = [0,0]; //index 0 for player1 and 1 for player2
    roundScore = 0;
    activePlayer = 0; // 0 for player1 an 1 for player2
    gamePlaying = true;

    /*Setting the player scores to 0 */
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');



}
function on() {
    document.getElementById("overlay").style.display = "block";
}
  
function off() {
document.getElementById("overlay").style.display = "none";
}



document.querySelector('.btn-roll').addEventListener('click',rollDice);

document.querySelector('.btn-hold').addEventListener('click',holdFunc);

document.querySelector('.btn-new').addEventListener('click',newGame);

document.querySelector('.btn-how').addEventListener('click',on);



