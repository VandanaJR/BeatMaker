//mob sel
const gooeySelected = document.querySelectorAll(".gooey-selected");
const gooeyOption = document.querySelectorAll(".gooey-option");


gooeySelected.forEach( g => {
    g.addEventListener('click',()=>{
        //console.log(g.parentElement.children[1].children.length);
        for(let i=0; i<g.parentElement.children[1].children.length;i++ ){
            g.parentElement.children[1].children[i].classList.toggle("gooey-active");
        }
      
    })
});

gooeyOption.forEach(o => {
    o.addEventListener('click',()=>{
        o.parentElement.parentElement.children[0].children[0].innerHTML=o.querySelector("label").innerText;
        for(let i=0; i<o.parentElement.children.length; i++){
            o.parentElement.children[i].classList.remove("gooey-active");
        }
    })
    
});

//MUTE BUTTON
const mute= document.querySelectorAll('.mute');

mute.forEach(m=>{
    m.addEventListener('click', ()=>{
        if(m.children[0].classList.contains("fa-volume-up")){
            m.innerHTML=`<i class="fas fa-volume-off"></i>`;
        }
       else{
        m.innerHTML=`<i class="fas fa-volume-up"></i>`;
       }
       })
});













