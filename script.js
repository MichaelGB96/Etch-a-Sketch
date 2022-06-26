const container = document.querySelector('.container');
let divs = [];
let maxSideSq = 2;
let mode = '';

function createGrid() {
    for (i=0; i<maxSideSq; i++) {
        let row = document.createElement('div');
        container.appendChild(row)
        row.classList.add('row')
        for(j=0; j<maxSideSq; j++) {
            let col = document.createElement('div');
            row.appendChild(col)
            col.classList.add(`row${i+1}col${j+1}`)
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

// PAIN FUNCTION #1
// function paint() {
//     if (eraseBtn.classList[0]) {
//         eraseBtn.classList.remove('selectedBtn');
//     } else if (pencilMixBtn.classList[0]) {
//         pencilMixBtn.classList.remove('selectedBtn');
//     }
//     pencilBtn.classList.add('selectedBtn');
//     divs.forEach(div => {
//         div.addEventListener('mouseenter', e => {
//                 e.target.style.backgroundColor = 'black';         
//         })
//     })
// }

// PAINT FUNCTION #2 FOR DARKENING FEATURE
function paint() {
    mode = 'black';
    if(mode!='black') return;
    if (eraseBtn.classList[0]) {
        eraseBtn.classList.remove('selectedBtn');
    } else if (pencilMixBtn.classList[0]) {
        pencilMixBtn.classList.remove('selectedBtn');
    }
    pencilBtn.classList.add('selectedBtn');
    divs.forEach(div => {
        div.addEventListener('mouseenter', e => {
                e.target.style.backgroundColor = 'black';
                if (e.target.classList[1]) {
                    let color = e.target.classList[1];
                    e.target.classList.remove(color);
                    e.target.classList.remove('colored');
                }         
        })
    })   
}

// PAINTING WITH RANDOM COLORS BUT WITHOUT GETTING DARKER
// function paintRandom() {
//     if (eraseBtn.classList[0]) {
//         eraseBtn.classList.remove('selectedBtn');
//     } else if (pencilBtn.classList[0]) {
//         pencilBtn.classList.remove('selectedBtn');
//     }
//     pencilMixBtn.classList.add('selectedBtn');
//     divs.forEach(div => {
//         div.addEventListener('mouseenter', e => {
//             console.log(e.target.style.backgroundColor)
//             e.target.style.backgroundColor = randomizeRGB();         
//             console.log(e.target.style.backgroundColor)
//         })
//     })
// }

// PAINTING WITH RANDOM COLOR GETTING DARKER, BY THE THENTH PASS IT BECOMES BLACK
function paintRandom() {
    mode = 'color';
    if(mode!='color') return;
    if (eraseBtn.classList[0]) {
        eraseBtn.classList.remove('selectedBtn');
    } else if (pencilBtn.classList[0]) {
        pencilBtn.classList.remove('selectedBtn');
    }
    pencilMixBtn.classList.add('selectedBtn');
    divs.forEach(div => {
        div.addEventListener('mouseenter', e => {
            if(!e.target.classList[1]) {
                let color = e.target.style.backgroundColor = randomizeRGB();
                e.target.classList.add(color)
                e.target.classList.add('colored') 
            } else {
                let lastBGC = e.target.style.backgroundColor;
                let end = lastBGC.indexOf(')');
                let RGBdigits = lastBGC.slice(4,end);
                RGBdigits = RGBdigits.split(',');
                let reducedDigits = RGBdigits.map(reduce10per);
                let reducedR = reducedDigits[0];
                let reducedG = reducedDigits[1];
                let reducedB = reducedDigits[2];
                e.target.style.backgroundColor = `rgb(${reducedR}, ${reducedG}, ${reducedB})`;     
            }                        
        })
    })
}

// PAINTING WHITE FUNCTION FOR PAINTING RANDOM WITHOUT DARKENING
// function paintWhite() {
//     if (pencilBtn.classList[0]) {
//         pencilBtn.classList.remove('selectedBtn');
//     } else if (pencilMixBtn.classList[0]) {
//         pencilMixBtn.classList.remove('selectedBtn');
//     }
//     eraseBtn.classList.add('selectedBtn');
//     divs.forEach(div => {
//         div.addEventListener('mouseenter', e => {
//                 e.target.style.backgroundColor = 'white';
//         })
//     })
// }

// PAINTING WHITE FUNCTION FOR PAINTING RANDOM WITH DARKENING FEATURE
function paintWhite() {
    mode = 'white';
    if(mode!='white') return;
    if (pencilBtn.classList[0]) {
        pencilBtn.classList.remove('selectedBtn');
    } else if (pencilMixBtn.classList[0]) {
        pencilMixBtn.classList.remove('selectedBtn');
    }
    eraseBtn.classList.add('selectedBtn');
    divs.forEach(div => {
        div.addEventListener('mouseenter', e => {
                e.target.style.backgroundColor = 'white';
                if (e.target.classList[1]) {
                    let color = e.target.classList[1];
                    e.target.classList.remove(color);
                    e.target.classList.remove('colored');
                }
        })
    })
}

// ERASE FUNCTION #1
// function erase() {
//     divs.forEach(div => {
//         div.style.backgroundColor = 'white';
//     })
// }

// ERASE FUNCTION #2 DARKENING FEATURE
function erase() {
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
        let color = div.classList[1]
        div.classList.remove(color)
        div.classList.remove('colored')
    })
}

function randomizeRGB() {  
    let randomR = Math.floor(Math.random()*255)
    let randomG = Math.floor(Math.random()*255)
    let randomB = Math.floor(Math.random()*255)
    let rgbString = `rgb(${randomR},${randomG},${randomB})`;
    return rgbString;
}


let main = document.querySelector('.main');
let buttons = document.createElement('div');
main.insertBefore(buttons, main.children[0])
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
    userSideSqSelection = prompt('Set the number of squares per side for the new grid (max 100 squares per side)', 16)
    if (userSideSqSelection>100) {
        maxSideSq = 100;
    } else {
        maxSideSq = userSideSqSelection;
    }
    createGrid()
    paintRandom()
}

// hovering effect for the buttons
buttonsList = [resetBtn, eraseAllBtn, eraseBtn, pencilBtn, pencilMixBtn];

buttonsList.forEach(button => {
    button.addEventListener('mouseenter', e=> {
        e.target.classList.add('hoveredBtn')
    })
})

buttonsList.forEach(button => {
    button.addEventListener('mouseleave', e=> {
        e.target.classList.remove('hoveredBtn')
    })
})

createGrid()
paintRandom()

// Darkening effect ratio reduction function
function reduce10per(n) {
    let per = n/10
    n -= per;
    if(n<0) {
        return 0;
    } else {
        return n;
    }
}

// Darkening feature has the issue of multiple event listeners
// listening at the same time and messing with the darkening effect
// 
// If used only the Random Color button, it works as intended
// but as soon as using the Eraser or the Black buttons, then the
// darkening effect of the Random color won't work anymore.



