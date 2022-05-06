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
    starter_is_first_player: false, 
    moves: 0,
    finish: false,
}

const root = document.documentElement;
let currentStyle =0;

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
    game.starter_is_first_player = !game.starter_is_first_player;
    game.is_first_player = game.starter_is_first_player;
    $("#restartButton").hide();
    $("#surrenderButton").show();
}

function surrender() {
    changePlayer();
    const player = getCurrentPlayer();
    player.score +=1;
    $(`.${player.class}.score`).text(player.score);
    restart();
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
    $('button').css("background-color", `var(${player.css})`);
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
            $("#restartButton").show();
            $("#surrenderButton").hide();
        }
        return;
    }

    player.score +=1;
    game.finish = true;
    
    $(`.${player.class}.score`).text(player.score);
    $(`.${player.class}.banner`).text('WINNER!');
    changeWinnerColor(player);
    $("#restartButton").show();
    $("#surrenderButton").hide();
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

function changeStyle() {
    const styles = ['default', 'theme1', 'theme2'];
    currentStyle += 1;
    if (currentStyle >= styles.length) {
        currentStyle = 0;
    }
    handleThemeUpdate(styles[currentStyle]);
}

function handleThemeUpdate(theme) {  
    switch(theme) {    
        case 'theme1':       
            root.style.setProperty('--color-player-1', '#d9ed92');
            root.style.setProperty('--color-player-2', '#184e77');
            root.style.setProperty('--color-square', '#52b69a');
            root.style.setProperty('--color-bg', '#34a0a4');
            break;
        case 'theme2':        
            root.style.setProperty('--color-player-1', '#540d6e');
            root.style.setProperty('--color-player-2', '#0ead69');
            root.style.setProperty('--color-square', '#9bb1ff');
            root.style.setProperty('--color-bg', '#e2fdff');
            break;
        case 'default': 
        default:      
            root.style.setProperty('--color-player-1', '#086788');
            root.style.setProperty('--color-player-2', '#dd1c1a');
            root.style.setProperty('--color-square', '#f0c808');
            root.style.setProperty('--color-bg', '#fff1d0');
            break;
    }
}
