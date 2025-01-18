let lista = document.getElementById("items");
    let items = lista.querySelectorAll("li");
    let itemsText = [];

    // Recopilar el texto de los elementos `li`
    for (let item of items) {
        itemsText.push(item.childNodes[0].textContent);//childNodes[0] los nombres
    }

    //botón para eliminar
    for (let item of items){
        let newButton = document.createElement("button");
        newButton.textContent="X"
        item.appendChild(newButton);

    newButton.addEventListener("click", (event)=>{
        event.target.parentNode.remove();// event=click, target=boton 
    })
    }

    // Ordenar
    let sortButton = document.getElementById("sortButton");// select .sortbutton
    sortButton.addEventListener("click", () => {
        itemsText= [];
        let items = lista.querySelectorAll("li");
        for (let item of items) {
        itemsText.push(item.childNodes[0].textContent);
    }
        itemsText.sort();
        lista.innerHTML = ""; // Vaciamos la lista
        itemsText.map(item => { // new elem `li` para cada ítem ordenado
        let newLi = document.createElement("li");
        newLi.textContent = item;
    
        //añadimos el boton de elim
    let newButton = document.createElement("button");
    newButton.textContent="X";
    newButton.addEventListener("click", (event)=>{
        event.target.parentNode.remove();
    })
    newLi.appendChild(newButton);

    //añadimos la lista
    lista.appendChild(newLi);
        });
    });
    // añadir new element
    let newElement= document.getElementById("newElement");

    newElement.addEventListener("click", ()=>{
        let texto= prompt("Nombre del nuevo elemento")
        let newLi= document.createElement("li");
        newLi.textContent= texto;
    // add boton de elim
        let newButton= document.createElement("button");
        newButton.textContent= "X";
        newButton.addEventListener("click", (event)=>{
            event.target.parentNode.remove(); //event>click target>boton
        });
        newLi.appendChild(newButton);
        lista.appendChild(newLi)//add a la lista
    });

    