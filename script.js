const container = document.querySelector('.container');
let divs = [];
let maxSideSq = 16;

function createGrid() {
    for (i=0; i<maxSideSq; i++) {
        let row = document.createElement('div');
        container.appendChild(row)
        row.classList.add('row')
        for(j=0; j<maxSideSq; j++) {
            let col = document.createElement('div');
            row.appendChild(col)
            col.classList.add('col',`row${i+1}col${j+1}`)
            col.setAttribute('style',`height:${600/maxSideSq}px; width:${600/maxSideSq}px`)
            divs.push(col)
        }
    }
}

function deleteGrid() {
    for (i=0; i<maxSideSq; i++) {
        container.children[0].remove()
    }
}

function paint() {
    divs.forEach(div => {
        div.addEventListener('mouseenter', e => {
                e.target.style.backgroundColor = 'black';         
        })
    })
}

function paintWhite() {
    divs.forEach(div => {
        div.addEventListener('mouseenter', e => {
                e.target.style.backgroundColor = 'white';
        })
    })
}

function erase() {
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
    })
}

createGrid()
paint()

let body = document.querySelector('body');
let buttons = document.createElement('div');
body.insertBefore(buttons, body.children[0])
let resetBtn = document.createElement('button');
buttons.appendChild(resetBtn)
resetBtn.textContent = 'Set new canvas'
let eraseAllBtn = document.createElement('button');
buttons.appendChild(eraseAllBtn)
eraseAllBtn.textContent = 'Erase all'
let eraseBtn = document.createElement('button');
buttons.appendChild(eraseBtn)
eraseBtn.textContent = 'Eraser'
let pencilBtn = document.createElement('button');
buttons.appendChild(pencilBtn)
pencilBtn.textContent = 'Pencil'

resetBtn.addEventListener('click', resetGrid)
eraseAllBtn.addEventListener('click', erase)
eraseBtn.addEventListener('click', paintWhite)
pencilBtn.addEventListener('click', paint)

function resetGrid() {
    deleteGrid()
    userSideSqSelection = prompt('Set the numer of squares per side for the new grid (max 100 squares per side)', 16)
    if (userSideSqSelection>100) {
        maxSideSq = 100;
    } else {
        maxSideSq = userSideSqSelection;
    }
    createGrid()
    paint()
}








