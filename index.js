const draggableList = document.getElementById('draggable_list');
const checkBtn = document.getElementById('check');
const richestPeopleList = ['Elon Musk','Billigates', 'Jeff Bezos', 'Warren Buffett', 'Bernard Arnault','Carlos Slim Helu'];
//to store listitems
const listItems = [];
let dragStartIndex;
createList();

//insert list items into DOM
function createList(){
    //person is each person in the list and index is count
    [...richestPeopleList] //copied the personlist
    .map(a=>({value: a, sort: Math.random()})) //to changed the value into a string and a is each person in the list
    .sort((a,b)=> a.sort - b.sort) //sorted by the random value
    .map(a => a.value)// turned into string again
    .forEach((person, index)=>{// to shuffle the list we go through into the loop
        console.log(person);
        const listItem = document.createElement('li')
        listItem.setAttribute('data-index', index);
        listItem.innerHTML=`<span class="number"> ${index + 1}</span>
        <div class="dragNameList" draggable= "true">
        <p class= "person-name"> ${person}</p>
        </div>`;
        listItems.push(listItem);
        draggableList.appendChild(listItem);
        });
        addEventListeners();
    }
        function dragStart(){
            dragStartIndex= Number(this.closest('li').getAttribute('data-index'));
           

        }
        
        function dragOver(e){
            e.preventDefault();
        }
        function dragDrop(){
            const dragEndIndex = +this.getAttribute('data-index');
            swapItems(dragStartIndex, dragEndIndex);  //to swap the list
            this.classList.remove('over');
        }
        function dragEnter(){
            this.classList.add('over');// to add the effect while over it
            
        }
        
        function dragLeave(){
            this.classList.remove('over');
            
        }
        //to swap the names
        function swapItems(fromIndex, toIndex){
           const itemOne = listItems[fromIndex].querySelector('.dragNameList');
           const itemTwo = listItems[toIndex].querySelector('.dragNameList');
           listItems[fromIndex].appendChild(itemTwo);
           listItems[toIndex].appendChild(itemOne);


        }
        function addEventListeners(){
            const draggableItems = document.querySelectorAll('.dragNameList');
            const dragList = document.querySelectorAll('.draggable_list li');
            draggableItems.forEach(draggableItem =>{
                draggableItem.addEventListener('dragstart', dragStart)});
            dragList.forEach(dragedItem =>{
                    dragedItem.addEventListener('dragover', dragOver);
                    dragedItem.addEventListener('drop', dragDrop);
                    dragedItem.addEventListener('dragenter', dragEnter);
                    dragedItem.addEventListener('dragleave', dragLeave);
            });
        }
        checkBtn.addEventListener('click',checkOrder);
    


