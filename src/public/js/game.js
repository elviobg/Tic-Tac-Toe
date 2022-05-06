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
}

function getCurrentPlayer() {
    if(game.is_first_player) {
        return game.players.first;
    }
    return game.players.second;
}

function changePlayer() {
    game.is_first_player = !game.is_first_player;
}

function executeMove(square) {
    if( square.firstChild.classList.contains(game.players.first.class) ||
        square.firstChild.classList.contains(game.players.second.class)) {
            return;
    }
    square.firstChild.classList.add(getCurrentPlayer().class);
    square.firstChild.textContent = getCurrentPlayer().symbol;
    changePlayer();
}
