const game = {
    players: {
        first: {
            score: 0,
            class: 'player_1',
            symbol: 'X',
            css: '--color-player-1',
        },
        second: {
            score: 0,
            class: 'player_2',
            symbol: 'O',
            css: '--color-player-2',
        }
    },
    is_first_player: false,
    moves: 0,
    finish: false,
}

const root = document.documentElement;

$(document).ready(function() {
    restart();
    $(".square").on('click', function(event){
        executeMove(event.currentTarget);
    });
});

function restart() {
    $(".square").each(function(i, square) {
        square.firstChild.textContent = '-'
        square.classList.remove(game.players.first.class);
        square.classList.remove(game.players.second.class);
        square.classList.remove('winner');
    });
    changePlayer();
    $(".banner").text('Your Turn!');
    game.finish = false;
    game.moves = 0;
}

function surrender() {
    restart();
    const player = getCurrentPlayer();
    player.score +=1;
    $(`.${player.class}.score`).text(player.score);
}

function getCurrentPlayer() {
    if(game.is_first_player) {
        return game.players.first;
    }
    return game.players.second;
}

function changePlayer() {
    game.is_first_player = !game.is_first_player;
    const player = getCurrentPlayer();
    $(".banner").hide();
    $(`.banner.${player.class}`).show();
}

function executeMove(square) {
    if( game.finish === true ||
        square.classList.contains(game.players.first.class) ||
        square.classList.contains(game.players.second.class)) {
            return;
    }
    game.moves += 1;
    square.classList.add(getCurrentPlayer().class);
    square.firstChild.textContent = getCurrentPlayer().symbol;
    
    const player = getCurrentPlayer();
    if (!checkIfWins(player)) {
        changePlayer();
        if ( game.moves == 9) {
            $(".banner").text('DRAW!');
            $(".banner").show();
            $(".square").each(function(i, square) {
                square.classList.add(`winner`);
            });
        }
        return;
    }

    player.score +=1;
    game.finish = true;
    
    $(`.${player.class}.score`).text(player.score);
    $(`.${player.class}.banner`).text('WINNER!');
    changeWinnerColor(player);
}

function getWinnerPossibilities(player) {
    const possibilities = ['diagonal_1', 'diagonal_2', 'up', 'middle', 'bottom', 'left', 'center', 'right']; 
    let winner = null 
    possibilities.forEach(possibility => {
        if ($(`.${possibility}.${player.class}`).length === 3) {
            winner = possibility;
        }
    });
    return winner;
}

function checkIfWins (player) {
    return getWinnerPossibilities(player) != null;
}

function changeWinnerColor(player) {
    const winnerClass = getWinnerPossibilities(player);
    $(`.${winnerClass}`).each(function(i, square) {
        square.classList.add(`winner`);
    });
}