const game = {
    players: {
        first: {
            score: 0,
            class: 'player_1',
            symbol: 'X',
        },
        second: {
            score: 0,
            class: 'player_2',
            symbol: 'O',
        }
    },
    is_first_player: false,
    moves: 0,
    finish: false,
}

$(document).ready(function() {
    restart();
    $(".square").on('click', function(event){
        executeMove(event.currentTarget);
    });
});

function restart() {
    $(".square").each(function(i, square) {
        square.firstChild.textContent = '-'
    });
    changePlayer();
    $(".banner").text('Your Turn!');
    game.finish = false;
    game.moves = 0;
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
        square.firstChild.classList.contains(game.players.first.class) ||
        square.firstChild.classList.contains(game.players.second.class)) {
            return;
    }
    square.firstChild.classList.add(getCurrentPlayer().class);
    square.firstChild.textContent = getCurrentPlayer().symbol;
    
    const player = getCurrentPlayer();
    const wins = checkIfWins(player);
    if (!wins) {
        changePlayer();
        return;
    }

    player.score +=1;
    game.finish = true;
    
    $(`.${player.class}.score`).text(player.score);
    $(`.${player.class}.banner`).text('WINNER!');
}

function checkIfWins (player) {
    const possibilities = ['diagonal_1', 'diagonal_2', 'up', 'middle', 'bottom', 'left', 'center', 'right']; 
    let wins = false;   
    possibilities.forEach(possibility => {
        if ($(`.${possibility} .${player.class}`).length === 3) {
            wins = true;
        }
    });
    return wins;
}