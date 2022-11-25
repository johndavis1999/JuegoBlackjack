

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');


//funcion para crear baraja metodo simplificado 
//con cliclos for
const crearDeck = () => {
    //cliclo for crea las cartas numericas
    for(let i= 2; i<=10; i++) {
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    //cliclo for crea las cartas con letras
    // J - Q - K - A
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    //barajar deck con suffle utilizando libreria
    //underscore
    deck = _.shuffle(deck);
    //console.log(deck);
    return deck;
}
crearDeck();

//funcion tomar carta
const pedirCarta = () => {  
    //validacion para que al llegar a 0 cartas no se pueda 
    //seguir ejecuntado esta funcion
    if(deck.length ===0){
        throw 'No hay cartas en la baraja';
    }
    //Se utiliza el pop para eliminar el ultimo elemento del 
    //array, considerando que los elementos se reordenan 
    //aleatroiamente. Con Shuffle, en teoria estamos tomando el 
    //ultumo valor aleatoriamente
    let carta = deck.pop();
    //Aqui se retoma el nuevo array
    //console.log(deck);
    //Carta eliminada que se retorna como carta seleccionada
    //console.log(carta);
    return carta;
}
pedirCarta();

//Funcion asignar puntaje a cada carta
const valorCarta = (carta) => {
    //Se toma la carta recibida y se omite el ultimo caracter
    //ya que este ultimo caracter es el tipo de carta
    const valor = carta.substring(0, carta.length -1);
    //let puntos = 0;
    /*
    2=2pts
    3=3pts
    4=4pts
    5=5pts
    6=6pts
    7=7pts
    8=8pts
    9=9pts
    10=10pts
    */
    return (isNaN(valor))? 
            ( valor === 'A') ? 11 : 10
            :valor *1;
    /* 
    if( isNaN(valor)) {
        puntos =    ( valor === 'A') ? 11 : 
    }
    else{
        //Se usa el *1 para cambiar el dato a int
        puntos = valor *1;
    }*/
}

//turno de la cpu
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        //tomar puntos del jugador y añadir a la puntuacion 
        //el valor de la nueva carta
        puntosComputadora += valorCarta(carta);
        //Reflejar en el html la puntuacion actual
        puntosHTML[1].innerText = puntosComputadora;
        //Insertar en html la carta seleccionada
        //tomando como referencia las clases correspondientes
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        //Asigna la clase a la carta obtenida
        imgCarta.classList.add('carta');
        //añade carta tomando referencia html previamente 
        //ya declarada divCartasComputadora
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

    } while((puntosComputadora < puntosMinimos) &&(puntosMinimos <= 21));
    
    setTimeout(() =>{
        if( puntosComputadora === puntosMinimos){
            alert('Nadie gano :(');
        }
        else if (puntosMinimos > 21){
            alert('Has perdido, computadora gana :(');
        }
        else if (puntosComputadora > 21){
            alert('Has Ganado :DDD');
        }
        else {
            alert('Has perdido, computadora gana :(');
        }
    }, 10);
}

//Eventos de botones
btnPedir.addEventListener('click', function(){
    const carta = pedirCarta();
    //tomar puntos del jugador y añadir a la puntuacion 
    //el valor de la nueva carta
    puntosJugador += valorCarta(carta);
    //Reflejar en el html la puntuacion actual
    puntosHTML[0].innerText = puntosJugador;
    //Insertar en html la carta seleccionada
    //tomando como referencia las clases correspondientes
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    //Asigna la clase a la carta obtenida
    imgCarta.classList.add('carta');
    //añade carta tomando referencia html previamente 
    //ya declarada divCartasJugador
    divCartasJugador.append(imgCarta);
    //Condiciones para ganar y perder
    if(puntosJugador > 21){
        console.warn('Has perdido') 
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }
    else if (puntosJugador === 21){
        console.warn('21!, has ganado!') 
        btnPedir.disabled=true;
        turnoComputadora(puntosJugador);
    }
    console.log(carta);
})

btnDetener.addEventListener('click', () => {   
    btnPedir.disabled=true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

//Iniciar un nuevo juego con funcion de recargar pagina
/*btnNuevo.addEventListener('click', () => {   
    location. reload()
});
*/
btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0,
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    btnPedir.disabled= false;
    btnDetener.disabled = false;
});








