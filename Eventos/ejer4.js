let dinamicP= document.getElementById("dinamicP");//select <p>

                        // crear boton
let deleteButton= document.createElement("button");
deleteButton.textContent="borrar contenido";// texto del boton
dinamicP.appendChild(deleteButton);//add al <p> el boton

deleteButton.addEventListener("click", (event)=>{
    if(dinamicP.childNodes.length === 1) return false;// dinamicP tiene 1 hijo=>  return false  para evitar que el código continúe
    dinamicP.childNodes[0].remove();//Si más de un hijo, elim el 1° hijo dinamicP.
});

document.body.addEventListener("keydown", (event)=>{//add funcionalidad al boton
    if (dinamicP.childNodes.length === 1){// n° hijos = 1 debemos crear un text
        let newTextNode = document.createTextNode(event.key);//event.key =tecla user
        dinamicP.prepend(newTextNode);// lo angregamos al principio
    }else{// si  "dinamicP.childNodes.length =! 1" tiene  texto previo
        dinamicP.childNodes[0].textContent += event.key;
    }
});