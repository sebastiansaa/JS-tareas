// Ejercicios con fetch

let URL = "https://jsonplaceholder.typicode.com/users"//base de datos

fetch(URL)// fetch devuelve SIEMPRE una promesa RESUELTA desde la basedatos
    .then((response) => response.json())//transform promesa a JSON (da otra promesa)
    .then((user)=> console.log(user[0]))//print info del 1° usuario
    .catch((error)=> console.log(error))// catch es para manejar los errores

//COMO fetch devuelve una promesa resuelta hay que manejar los errores asi

let URL = "https://jsonplaceholder.typicode.com/users/a"//user "a" no existe

fetch(URL)// fetch devuelve SIEMPRE una promesa RESUELTA desde la basedatos
    .then((response) => {
        if (response.ok){// si la response es ok
            console.log(response);
            return response.json();// transfor la respuesta en un JSON
            }
        else{
            return Promise.reject("No existe ese usuario")
        };
        })
    .then((user)=> console.log(user))//print info de user
    .catch((error)=> console.log(error))// catch es para manejar los errores

    //EJERCICIO 2
    //key:"id","car","car_model","car_color","car_model_year","car_vin","price","availability"

    let URLCars= " https://myfakeapi.com/api/cars/";
    let URLUniqueCar = "https://myfakeapi.com/api/cars/5";

    let getCars = async (year=2010)=>{ // fx nos da todos los coches.  async para usar await
        let cars = await fetch(URLCars)// fetch da promesa resuelva => continuar
            .then((response)=> response.json())//solve promesa se trans json(es promesa igual)
            .then((cars)=> cars["cars"].filter((car)=> car.car_model_year == year));// accede a la propie "cars" de obj JSON (es []) y luego filtra por car_model_year = year(2010)
        console.log(cars)
    };
    getCars(2011);// busca autos año 2011

    //obtener el 1° car y luego filtrar todos los autos del mismo año que el 1°
    let getCarsFromFirtCarYear = async() =>{
        let firstCarYear = await fetch(URLCars)
            .then((response)=> response.json())// promesa la json y es otra promesa
            .then((data) => data["cars"][0].car_model_year);// selec el año del 1° coche

        let allCarsFilterByYear = await fetch(URLCars)
            .then((response) => response.json())
            .then((data)=>["data"].filter(car=> car.car_model_year == firstCarYear);

        console.log(allCarsFilterByYear);
    };

    /* 
    let URLCars= " https://myfakeapi.com/api/cars/";
let getCars= async (year) =>{
    try{
        response= await fetch(URLCars);
        let data = await response.json();
        cars= data["cars"].filter((car)=>car.car_model_year == year);
        console.log(cars)
    }catch(error){
        console.error("hubo un erro", error)
    } 

 */
/*  sacar los autos con el mismo año que el 1° auto
let getCars = async ()=>{
    try{
        let response = await fetch(URLCars);
        let data = await response.json();
        firstCarYear= data["cars"][0].car_model_year;
        let cars= data["cars"].filter((car)=> car.car_model_year == firstCarYear);
        console.log(cars);
    }catch (error){
        console.error("hubo un error", error)
    }
}
getCars()  */

 // obtener los data de un usuario cualquiera
let URLUser = "https://jsonplaceholder.typicode.com/users";//base de datos

getUser = async(userNum)=>{
    try{
        let response= await fetch(URLUser);
        if(! response.ok){
            throw new Error (`HTTP error! status:${response.status}`)
        }
        let data = await response.json();
        let dataUser= data[userNum];
        console.log(dataUser);
    }catch (error){
        console.error("Hubo un error", error)
    } 
}
getUser(2)


// todos los usuarios que empiezan con una letra 
let URLUser = "https://jsonplaceholder.typicode.com/users";//base de datos

getUserByLetter= async(LetterName)=>{
    try{
        let response= await fetch(URLUser);
        let data = await response.json();
        let names= data.filter(user=> user.name.startsWith(LetterName)).map(user=> user.name);
        console.log(names)
    }catch(error){
        console.error("Hubo un error", error)
    }
}
getUserByLetter("C")

getUserByLetterLastName= async(letter)=>{
    try{
        let response= await fetch(URLUser);
        if(!response.ok){
            throw new Error (`Error en HTTP status: ${response.status}`)
        }
        let data= await response.json();
//let lastName = data.filter(user => user.name.split(" ").slice(-1)[0].startsWith(letter)).map(user => user.name);
        let lastNameByletter = data.filter(user=>{
            let nameDivided = user.name.split(" ");
            let lastName= nameDivided[nameDivided.length-1];
            return lastName.startsWith(letter);
        }).map(user=> user.name);
        console.log(lastNameByletter)

    }catch(error){
        console.error("hubo un error", error)
    }
}
getUserByLetterLastName("H");
