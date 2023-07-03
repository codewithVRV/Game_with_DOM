console.log("I am good enough to understand logic");

let mainParent = document.getElementById("new_todo_for_removing");
let saveButton = document.getElementById("save-todo");
let inputBar = document.getElementById("todo-input-bar");
let pending = document.getElementById("get-todos");
let todo_arr = [];




inputBar.addEventListener("keyup", function saveToggling () {
    let inputText = inputBar.value;
    if(inputText.length == 0) {
        if (saveButton.classList.contains("not")) return;
        saveButton.classList.add("not");
    }
    else {
        if(saveButton.classList.contains("not")){
            saveButton.classList.remove("not");
        }
    }
})
saveButton.addEventListener("click", function getInputText () {
    let inputText = inputBar.value;
    if(inputText.length == 0) return;
    let todo = {text:inputText, status:"In progress", finishButtonText: "Finished"};
    todo_arr.push(todo)
    run(todo, todo_arr.length);
    inputBar.value = "";
})

function reRender () {
    mainParent.innerHTML = "";
    todo_arr.forEach((element, idx) =>{
        run(element, idx+1);
    });
}

function removeTodo (event) {
    // console.log("Delete Button pressed", event.target);
    // event.target.parentElement.parentElement.parentElement.remove()
    let deleteButtonPressed = event.target;
    let index_of_delete_btn = Number(deleteButtonPressed.getAttribute("idx"));
    todo_arr.splice(index_of_delete_btn, 1);
    reRender();
}

function finishTodo (event) {
    let finishButtonPressed = event.target;
    let finishIndex = Number(finishButtonPressed.getAttribute("idx"));
    if(todo_arr[finishIndex].status == "Finished") {
        todo_arr[finishIndex].status = "In progress";
        todo_arr[finishIndex].finishButtonText = "Finished";
    }
    else{
        todo_arr[finishIndex].status = "Finished";
        todo_arr[finishIndex].finishButtonText = "Undo";

    }
    todo_arr.sort((a, b) => {
        if(a.status == "Finished"){
            return 1;
        }
        else{
            return -1;
        }
    })
    reRender();
}

function editTodo (event) {
    // console.log("edit clicket")
    let editButtonPressed = event.target;
    let editIndex = Number(editButtonPressed.getAttribute("idx"));
    let target_div = document.querySelector(`div[idx="${editIndex}"]`);
    let target_inp = document.querySelector(`input[idx="${editIndex}"]`);
    target_div.style.display = "none";
    // target_inp.type = "text";
    target_inp.type = "text";
    target_inp.value = target_div.textContent;
    

}
pending.addEventListener("click", () => {
    todo_arr = todo_arr.filter((todo) => todo.status != "Finished");
    reRender();
})

function saveInput (event) {
    // console.log(event.keyCode)
    let target_inp = event.target;
    let index_to_edit = Number(target_inp.getAttribute("idx"))
    let target_div = document.querySelector(`div[idx="${index_to_edit}"]`);
    if(event.keyCode == 13){
        target_div.textContent = target_inp.value;
        target_div.style.display = "block";
        target_inp = "";
        target_inp.type = "hidden";
    }
}

function run (todoData, counting) {

    // creating all div and button here;
    let one = document.createElement("div")               //  row;
    let two = document.createElement("div")               // todo-item
    let three = document.createElement("dive")            // todo- number
    let four = document.createElement("div")              // todo- detail
    let five = document.createElement("div")              // todo status
    let six = document.createElement ("div")              // todo  action
    let seven = document.createElement("button")          // delete button
    let eight = document.createElement("button");         // finish button;
    let editButton = document.createElement("button");
    let nine = document.createElement("hr");
    let hiddenInput = document.createElement("input");



    // adding classes;
    one.classList.add("row");
    two.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center")
    three.classList.add("todo-no");
    four.classList.add("todo-detail",  "text-muted");
    five.classList.add("todo-status", "text-muted");
    six.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    seven.classList.add("btn", "btn-danger", "delete-todo");
    eight.classList.add("btn", "btn-success", "finish-todo");
    editButton.classList.add("btn", "btn-warning", "edit-todo");
    hiddenInput.classList.add("form-control", "todo-detail")


    four.setAttribute("idx", counting-1);
    hiddenInput.setAttribute("idx", counting-1);
    editButton.setAttribute("idx", counting-1)
    eight.setAttribute("idx", counting-1);
    seven.setAttribute("idx", counting-1);
    seven.onclick = removeTodo;
    eight.onclick = finishTodo;
    editButton.onclick = editTodo;
    hiddenInput.onkeypress = saveInput;


    three.textContent = `${counting}`;
    four.textContent = todoData.text;  // sets the todo text sent from the input element;
    five.textContent = todoData.status;
    seven.textContent = "Delete";
    eight.textContent = todoData.finishButtonText;
    editButton.textContent = "Edit";
    hiddenInput.type = "hidden";
    

    // apending all divs here

    six.appendChild(seven);      // becase six div is the parent of both divs (seven nd eight);
    six.appendChild(eight);
    six.appendChild(editButton);
    
    two.appendChild(hiddenInput);

    two.appendChild(three);      // two is the parent of all four divs;
    two.appendChild(four);
    two.appendChild(five);
    two.appendChild(six);

    one.appendChild(two);        // one is the parent of two div
    one.appendChild(nine);

    mainParent.appendChild(one); // mainParent is the final parent of all divs;

}