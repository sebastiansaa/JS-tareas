/* TO DO
let URL_POST = "https://jsonplaceholder.typicode.com/todos";

fetch(URL_POST, { // Usamos el método POST para crear un nuevo recurso
    method: "POST", // GET, POST , PUT, DELETE
    headers: { // Cabeceras de la petición, indicando que el contenido es JSON
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ // El nuevo recurso que crearemos. Formato JSON
        userId: 1,
        title: "Esta es mi nueva tarea"
    })
})
    .then((response) => response.json()) // Convertimos la respuesta a un objeto JSON
    .then((json) => {
        console.log(json); // Imprimimos el JSON en la consola
        fetch(`${URL_POST}/10`) // Otra petición fetch para obtener el recurso con id 10
            .then((response) => response.json())
            .then((todo) => console.log(todo));
    })   
    .catch((error) => console.log(error)); // Manejo de error
*/



let URL_TODOS = "https://jsonplaceholder.typicode.com/todos";

let form = document.getElementById("createTodo"); // Seleccionamos el formulario #createTodo

form.addEventListener("submit", (event) => { // Listener para el envío del formulario
    event.preventDefault(); // Prevenir el envío del formulario
    let  todoUser = document.getElementById("userTodo");
    let todoName = document.getElementById("todoName"); 
    let todoCompleted = document.getElementById("todoCompleted").checked; // Verificar si está marcado
    let saveTodo = document.getElementById("saveTodo"); // El botón

    fetch(URL_TODOS, { // Usamos el método POST para crear un nuevo recurso
        method: "POST", // GET, POST, PUT, DELETE
        headers: { // Cabeceras de la petición, indicando que el contenido es JSON
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ // El nuevo recurso que crearemos. Formato JSON
            userId: todoUser.value,
            title: todoName.value,
            completed: todoCompleted
        }),
    })
        .then((response) => response.json()) // Convertimos la respuesta a JSON
        .then((todo) => {
            console.log(todo); // Imprimimos el JSON en la consola
            document.getElementById("todoName").value = ""; // Resetea el valor del input
            document.getElementById("todoCompleted").checked = false; // Resetea el estado del checkbox
            saveTodo.disabled = false;
            saveTodo.textContent= "Guardar";
            todoUser.value = "";

        }) 
        .catch((error) => console.log(error)); // Manejo de errores
});

let getUsers = async () => {
    let users = await fetch("https://jsonplaceholder.typicode.com/users/")
        .then((response) => response.json())
        .then((users) => users);

    let userTodo = document.getElementById("userTodo");

    // userTodo es un select, así que usaremos forEach en lugar de map
    users.forEach((user) => {
        let newOption = document.createElement("option");
        newOption.value = user.id;
        newOption.textContent = user.name;
        userTodo.appendChild(newOption);
    });
};

getUsers();


   //// otra forma de hacerlo

   let URL_TODOS = "https://jsonplaceholder.typicode.com/todos";

let form = document.getElementById("createTodo"); // Seleccionamos el formulario #createTodo

form.addEventListener("submit", async (event) => { // Hacemos la función del listener asíncrona
    event.preventDefault(); // Prevenir el envío del formulario
    let todoName = document.getElementById("todoName");
    let todoCompleted = document.getElementById("todoCompleted").checked; // Verificar si está marcado
    let todoUser = document.getElementById("userTodo"); // Corrección
    let saveTodo = document.getElementById("saveTodo"); // El botón

    try {
        let response = await fetch(URL_TODOS, { // Usamos el método POST para crear un nuevo recurso
            method: "POST", // GET, POST, PUT, DELETE
            headers: { // Cabeceras de la petición, indicando que el contenido es JSON
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ // El nuevo recurso que crearemos. Formato JSON
                userId: todoUser.value,
                title: todoName.value,
                completed: todoCompleted
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Error en HTTP status: ${response.status}`);
        }
        
        let todo = await response.json(); // Convertimos la respuesta a JSON
        console.log(todo); // Imprimimos el JSON en la consola
        document.getElementById("todoName").value = ""; // Resetea el valor del input
        document.getElementById("todoCompleted").checked = false; // Resetea el estado del checkbox
        saveTodo.disabled = false;
        saveTodo.textContent = "Guardar";
        todoUser.value = "";
    } catch (error) {
        console.error("Hubo un error:", error); // Manejo de errores
    }
});

let getUsers = async () => {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users/");
        
        if (!response.ok) {
            throw new Error(`Error en HTTP status: ${response.status}`);
        }
        
        let users = await response.json();
        let userTodo = document.getElementById("userTodo");
        
        // userTodo es un select, así que usaremos forEach en lugar de map
        users.forEach((user) => {
            let newOption = document.createElement("option");//elem k sta dentro de elem<select>
            newOption.value = user.id;
            newOption.textContent = user.name;
            userTodo.appendChild(newOption);
        });
    } catch (error) {
        console.error("Hubo un error:", error); // Manejo de errores
    }
};

getUsers();
