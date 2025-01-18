let presionarTecla= (event)=>{
    let letter= event.key;// la letra que se preciono en el teclado
    let box = document.querySelector(`[data-letter = ${letter}]`);
    if (box){
        let width= box.offsetWidth;
        width+= 5;
        box.style.width = `${width}px`

        if(width>= 100){
            if(box.classList.contains("green")){// si es la verde que llega a 100px
                document.getElementById("result").textContent="Ha ganado el verde";
            }else{
                document.getElementById("result").textContent="Ha ganado el rojo";
            }
            document.body.removeEventListener("keydown", presionarTecla);
            //rmEvenLIS... solo works con funciones nombradas no ()=>{}
        }
    }
}


document.body.addEventListener("keydown", presionarTecla);
    