const ul = document.querySelector('ul');
const input = document.querySelector('#input');
const button = document.querySelector('#btn');
button.addEventListener('click',addtask);
input.addEventListener('keypress',(e)=>{
    if(e.keyCode == 13){
        addtask()
    }
})
function addtask(){
    const taskname = input.value;
    if(taskname === ""){
        alert('enter some value');
        return;
    }
    const list = document.createElement('li');
    const div1 = document.createElement('div');
    div1.className = 'task';
    const checkbox = document.createElement('input');
    checkbox.className = 'checkbox';
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change',check);
    div1.append(checkbox);
    const para = document.createElement('p');
    para.innerText = taskname;
    div1.append(para);
    //create div2
    const div2 = document.createElement('div');
    div2.className = 'icons';
    const upArrow = document.createElement('up');
    upArrow.className = "fa-solid fa-up-long";
    upArrow.addEventListener('click',moveUp);   
    div2.append(upArrow);
    const del = document.createElement('i');
    del.className = "fa-solid fa-trash";
    del.addEventListener('click',deleteItem);
    div2.append(del);
    const downArrow = document.createElement('i');
    downArrow.className = "fa-solid fa-down-long";
    downArrow.addEventListener('click',moveDown);
    div2.append(downArrow);
    list.style.backgroundColor = getRandomColor();
    list.append(div1);
    list.append(div2);
    ul.append(list);
    input.value="";
    const listItems = document.querySelectorAll('li');
    listItems.forEach((li, index) => {
        const upArrow = li.querySelector('.fa-up-long');
        const downArrow = li.querySelector('.fa-down-long');

        // Show or hide up arrow
        if (index === 0) {
            upArrow.style.display = 'none';
        } else {
            upArrow.style.display = 'block';
        }

        // Show or hide down arrow
        if (index === listItems.length - 1) {
            downArrow.style.display = 'none';
        } else {
            downArrow.style.display = 'block';
        }
    });
}
function moveUp(event){
    const li = event.target.closest('li');
    const prevli = li.previousElementSibling;
    if(prevli)
    li.parentNode.insertBefore(li,prevli);
    updateArrowVisibility(li);
    updateArrowVisibility(prevli);
}
function moveDown(event){
    const li = event.target.closest('li');
    const nextli = li.nextElementSibling;
    if(nextli){
        nextli.parentNode.insertBefore(nextli,li);
    }
    updateArrowVisibility(li);
    updateArrowVisibility(nextli);
}
function updateArrowVisibility(li) {
    const firstLi = li.parentNode.firstElementChild;
    const upArrow = li.querySelector('.fa-up-long');
    const downArrow = li.querySelector('.fa-down-long');
    if (li === firstLi) {
        upArrow.style.display = 'none';
    } else {
        upArrow.style.display = 'block';
    }
    if (li.nextElementSibling === null) {
        downArrow.style.display = 'none';
    } else {
        downArrow.style.display = 'block';
    }
}


function deleteItem(event){
    const li = event.target.closest('li');
    li.style.backgroundColor='red';
    const para = li.children[0].children[1];
    para.innerText = "Deleted"
    setTimeout(()=>{
        li.remove();
    },500);
}
function check(event){
    const checkbox = event.target;
    const li = event.target.closest('li');
        li.style.backgroundColor='lightGreen';
        const para = li.children[0].children[1];
    if(checkbox.checked){
        para.classList.add('checked');
    }
    else{
        para.classList.remove('checked');
        li.style.backgroundColor = getRandomColor();
    }
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// function addlistHtml(taskname,list){
//     list.innerHTML=`
//     <div class="task">
//         <input type="checkbox" class="checkbox">
//         <p>${taskname}</p>
//     </div>
//     <div class="icons">
//         <i class="fa-solid fa-up-long"></i>
//         <i class="fa-solid fa-trash"></i>
//         <i class="fa-solid fa-down-long"></i>
//     </div>`;
// }