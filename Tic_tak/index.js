document.addEventListener("DOMContentLoaded", () => {

    let cell;
    let outer = document.getElementById("outer");
    let restart = document.getElementById("reset");
    let arr = Array(9).fill(undefined);
    let boxes = Array.from(document.getElementsByClassName("same"));

    let chance = false;
    outer.addEventListener("click", (event) => {
        cell = event.target;
        let cellNumber = cell.getAttribute("id")
        if(cell.getAttribute("data-clicked")){
            return;
        }
        cell.setAttribute("data-clicked", "true");
        if(chance == false) {
            cell.textContent = "X";
            arr[cellNumber] = "X";
            wininingCombos("X");
        }
        else{
            cell.textContent = "0";
            arr[cellNumber] = "0";
            wininingCombos("0");
        }
        chance = !chance;
    })

    function wininingCombos (char) {
        let result = document.getElementById("result");
        if(arr[0] == char && arr[1] == char && arr[2] == char){
            result.textContent = ` ${char} wins`;
        }
        else if(arr[3] == char && arr[4] == char && arr[5] == char){
            result.textContent = ` ${char} wins`;
        }
        else if(arr[6] == char && arr[7] == char && arr[8] == char){
            result.textContent = ` ${char} wins`;
        }
        else if(arr[0] == char && arr[3] == char && arr[6] == char){
            result.textContent = ` ${char} wins`;
        }
        else if(arr[1] == char && arr[4] == char && arr[7] == char){
            result.textContent = ` ${char} wins`;
        }
        else if(arr[2] == char && arr[5] == char && arr[8] == char){
            result.textContent = ` ${char} wins`;
        }

        else if(arr[0] == char && arr[4] == char && arr[8] == char){
            result.textContent = ` ${char} wins`;
        }
        else if(arr[2] == char && arr[4] == char && arr[6] == char){
            result.textContent = ` ${char} wins`;
        }
        
    
    }
    
    






    restart.addEventListener("click", () => {
        arr.fill(undefined);
        boxes.forEach(box => {
            box.textContent = "";
        });
        window.location.reload();
        chance = false;
        result.textContent = "Tic Tac Toe";

    });



})