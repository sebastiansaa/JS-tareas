let buttons= document.querySelectorAll(".buttons button")//select all buttons
let pParaEliminar= document.getElementById("pParaEliminar");

for (let b of buttons){// iteramos cada uno de los botones dentro de buttons
    b.addEventListener("click", (event)=>{
        let letter= event.target.dataset.letter;//a,e,i,o,u de los botones
        let actualText=pParaEliminar.textContent;//content de actualText= al <p>
        actualText= actualText.replaceAll(letter, "");
        pParaEliminar.textContent= actualText;
        event.target.disabled =true;
    });

}

