console.log("js attached");


let image = document.querySelector("img");
let input = document.querySelector("input");

input.addEventListener("change", () => {
    image.src = URL.createObjectURL(input.files[0]);
});