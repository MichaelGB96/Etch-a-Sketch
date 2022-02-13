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
    if (eraseBtn.classList[0]) {
        eraseBtn.classList.remove('selectedBtn');
    } else if (pencilMixBtn.classList[0]) {
        pencilMixBtn.classList.remove('selectedBtn');
    }

    pencilBtn.classList.add('selectedBtn');
    divs.forEach(div => {
        div.addEventListener('mouseenter', e => {
                e.target.style.backgroundColor = 'black';         
        })
    })
}

function paintRandom() {
    if (eraseBtn.classList[0]) {
        eraseBtn.classList.remove('selectedBtn');
    } else if (pencilBtn.classList[0]) {
        pencilBtn.classList.remove('selectedBtn');
    }
    pencilMixBtn.classList.add('selectedBtn');
    divs.forEach(div => {
        div.addEventListener('mouseenter', e => {
                e.target.style.backgroundColor = randomizeRGB();         
        })
    })
}

function paintWhite() {
    if (pencilBtn.classList[0]) {
        pencilBtn.classList.remove('selectedBtn');
    } else if (pencilMixBtn.classList[0]) {
        pencilMixBtn.classList.remove('selectedBtn');
    }
    eraseBtn.classList.add('selectedBtn');
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

function randomizeRGB() {  
    let randomR = Math.floor(Math.random()*255)
    let randomG = Math.floor(Math.random()*255)
    let randomB = Math.floor(Math.random()*255)
    let rgbString = `rgb(${randomR},${randomG},${randomB})`;
    return rgbString;
}


let body = document.querySelector('body');
let buttons = document.createElement('div');
body.insertBefore(buttons, body.children[0])
let resetBtn = document.createElement('button');
buttons.appendChild(resetBtn)
resetBtn.textContent = 'New canvas'
let eraseAllBtn = document.createElement('button');
buttons.appendChild(eraseAllBtn)
eraseAllBtn.textContent = 'Erase all'
let eraseBtn = document.createElement('button');
buttons.appendChild(eraseBtn)
eraseBtn.textContent = 'Eraser'
let pencilBtn = document.createElement('button');
buttons.appendChild(pencilBtn)
pencilBtn.textContent = 'Black'
let pencilMixBtn = document.createElement('button');
buttons.appendChild(pencilMixBtn)
pencilMixBtn.textContent = 'Random color'

resetBtn.addEventListener('click', resetGrid)
eraseAllBtn.addEventListener('click', erase)
eraseBtn.addEventListener('click', paintWhite)
pencilBtn.addEventListener('click', paint)
pencilMixBtn.addEventListener('click', paintRandom)

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

// hovering effect for the buttons
buttonsList = [resetBtn, eraseAllBtn, eraseBtn, pencilBtn];

buttonsList.forEach(button => {
    button.addEventListener('mouseenter', e=> {
        e.target.style.backgroundColor = '#ccc'
    })
})

buttonsList.forEach(button => {
    button.addEventListener('mouseleave', e=> {
        e.target.style.backgroundColor = 'white'
    })
})

createGrid()
paint()






