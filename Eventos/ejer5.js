let box = document.getElementById("box");

box.addEventListener("mouseover", (event)=>{
    let maxWidth = window.innerWidth - 200;
    let maxHeight = window.innerHeight - 200;
    let randomLeft = Math.floor(Math.random()*maxWidth);
    let randomTop = Math.floor(Math.random()*maxHeight);
    box.style.top= `${randomTop}px`;
    box.style.left = `${randomLeft}px`;
});