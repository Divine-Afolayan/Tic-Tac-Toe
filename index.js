const state = {
    gameElement: document.querySelector('.game'),
    // cells: [null, null, null, null, null, null, null, null, null]
    cells: Array(9).fill(null), /* does the same thing as the above, it makes an array with the Array() function which takes the amount of things you want in the array and fills it using the fill() function which takes what you want to fill the array with */
    symbols: ['o', 'x'],
    winningCombinations: [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row

        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column

        [0, 4, 8], // left diagonal
        [2, 4, 6] // right diagonal 
    ],
    gameFinished: false
}

function drawBoard() {
    const gameElement = document.querySelector('.game');
    state.gameElement.innerHTML = ''

    for (let i = 0; i < 9; i++) {

        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (state.cells[i]) { // does the cell have an 'x' or an 'o'? if so, this code runs

            const cellSymbol = document.createElement('p');
            cellSymbol.textContent = state.cells[i]
            cellSymbol.classList.add('symbol')
            cell.append(cellSymbol);
        } else {
            cell.addEventListener('click', function () {
                if (state.gameFinished) {
                    return
                }

                state.symbols.reverse()
                state.cells[i] = state.symbols[0]

                drawBoard();

                if (checkForWinner()) {
                    state.gameFinished = true
                    drawMessage('Congratulations! You Won!')
                }

                if (checkForDraw()) {
                    state.gameFinished = true
                    drawMessage("It's a Draw!")
                }
            })
        }

        state.gameElement.append(cell);
    }
}

function drawMessage(message) {
    const banner = document.createElement('div');
    banner.classList.add('banner');

    const h1 = document.createElement('h1');
    h1.textContent = message

    banner.append(h1)
    state.gameElement.append(banner)
}

function checkForDraw() {
    return state.cells.every(function (cell) {
        return cell !== null
    })
}

function checkForWinner() {
    return state.winningCombinations.some(function (combo) {
        const cells = combo.map(function (index) {
            return state.cells[index]
        })

        return !(cells.includes(null)) && new Set(cells).size === 1
    })
}

drawBoard();