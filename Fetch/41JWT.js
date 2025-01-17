let URL_TODOS = "https://jsonplaceholder.typicode.com/todos";
let form = document.getElementById("createTodo");

form.addEventListener("submit", async (event)=>{
    event.preventDefault();// prevenir error al enviar form
    let todoUser= document.getElementById("userTodo");
    let todoName = document.getElementById("todoName");
    let todoCompleted= document.getElementById("todoCompleted").checked;
    let saveTodo= document.getElementById("saveTodo");

    try{
      let response = await fetch(URL_TODOS, {
        method: "POST",// post crea nuevo recurso
        headers: {// cabecera de la peticion
            "Content-Type": "application/json"
        },
        body: JSON.stringify({// cuerpo de la peticion en format json
            userId: todoUser.value,// userId, titlee, completed es los key de la BD
            title: todoName.value,
            completed: todoCompleted
            }),
        });
        if (!response.ok){
            throw new Error (`Error en HTTP status ${response.status}`)
        }
        let data = await response.json();
        console.log(data);
        document.getElementById("todoName").value = "";
        document.getElementById("todoCompleted").checked =false;
        saveTodo.disabled = false;
        saveTodo.textContent = "Guardar";
        todoUser.value = "";

    }catch(error){
        console.error("Hubo un error:", error);
    }
});
    let getUsers = async ()=>{ //obtener todos los user de la bs en nuestra página
        try{
            let response = await fetch("https://jsonplaceholder.typicode.com/users/");
            if (!response.ok){
                throw new Error (`Hubo un error en el HTTP status: ${response.status}`);
            }
            let users= await response.json();// es la data que necesitamos
            let userTodo = document.getElementById("userTodo");// seleccion el <select>

            users.forEach(user =>{
                let newOption = document.createElement("option");
                newOption.value = user.id;
                newOption.textContent = user.name;
                userTodo.appendChild(newOption);
            });
        }catch(error){
            console.error("Hubo un error:", error); // Manejo de errores 
        }
     }
     getUsers();
