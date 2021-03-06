const celulas = document.querySelectorAll(".celula");
let endgame = false

const jogador_x = "X";
const jogador_o = "O"
const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

document.addEventListener("click", (event) => {
    if(event.target.matches(".celula")) {

        Play(event.target.id, jogador_x)
        //console.log(event.target.id)
        setTimeout(() => bot(), 500)
    }
})

function bot() {
    const posicionsavaliable = []
    for(index in celulas) {
        if(!isNaN(index)) {
            if(!celulas[index].classList.contains("X") && !celulas[index].classList.contains("O")) {
                posicionsavaliable.push(index)
            }
        }
    }

    //Verificar onde tem x para poder ser mais eficiente
    let prevision = []
    let posicionx = 0
    
    for(index in celulas) {
        if(!isNaN(index)) {
            if(celulas[index].classList.contains("X")) {
                prevision.push(parseInt(index))
                posicionx = index
            }
        }
    }
    
    let posicionrandom =  Math.floor(
        Math.random() * posicionsavaliable.length
    )

    if (posicionrandom == 0) {
        posicionrandom = 1
    }

    let numrandom = Math.floor(Math.random() * (5 + 1));
    let numrandom2 = Math.floor(Math.random() * (5 + 1));

    console.log(posicionrandom)
    console.log(numrandom)
    console.log(numrandom2)




    //combarar se o array de da previsão de x é igual ao array de combinações possiveis
    //combinations.forEach((nome) => {
    //    console.log(nome)
    //})

    if(!endgame) {
        console.log(posicionsavaliable)
        Play(posicionsavaliable[(posicionrandom - 1)], jogador_o)
        prevision= []
    }
}

function Play(id, turn) {
    const celula = document.getElementById(id);
    celula.textContent = turn
    celula.classList.add(turn)
    checkWinner(turn)
}

function checkWinner(turn) {
    const winner = combinations.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turn)
        })
        
    })

    if(winner) {
        finishGame(turn)
    }else if(checkDraw()) {
        finishGame()

    }
}

function checkDraw() {
    let x = 0
    let o = 0

    for(index in celulas) {
        if(!isNaN(index)){
            if(celulas[index].classList.contains(jogador_x)) {
                x++
            }
            if(celulas[index].classList.contains(jogador_o)) {
                o++
            }

        }
    }

    return x + o === 9 ? true : false 
}

function finishGame(winner = null) {

    endgame = true
    const darkscreen = document.getElementById("dark-screen")
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let message = null

    darkscreen.style.display = "block"
    darkscreen.appendChild(h2)
    darkscreen.appendChild(h3)
    

    if(winner) {
        h2.innerHTML = `O Player <span>${winner}</span> venceu!`

    }else {
        h2.innerHTML = "Empatou"
    }

    let timer = 3
    setInterval(() => {
        h3.innerHTML = `Reiniciando Jogo em ${timer--}`
    }, 1000)

    setTimeout(() => location.reload(), 4000)
}

function reloadGame() {
    location.reload()
}