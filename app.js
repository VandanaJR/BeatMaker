class DrumKit{
    constructor(){
        this.pad=document.querySelectorAll(".pad");
        this.playButton= document.querySelector(".btn");
        this.kickAudio= document.querySelector(".kick-audio");
        this.snareAudio= document.querySelector(".snare-audio");
        this.hihatAudio= document.querySelector(".hihat-audio");
        this.currentKick="./sounds/kick-classic.wav";
        this.currentSnare="./sounds/snare-acoustic01.wav";
        this.currentHihat= "./sounds/hihat-acoustic01.wav";
        this.index= 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selected=document.querySelectorAll(".gooey-selected");
        this.option=document.querySelectorAll(".gooey-option");
        this.mute = document.querySelectorAll(".mute");
        this.tempoSlider=document.querySelector("#tempo");
    }
    activePad(){
        this.classList.toggle("active");
        //console.log(this.classList);
    }
    repeat(){
        let step = this.index % 8;
        this.index++;
        //console.log(`step = ${step} and  index = ${this.index}`);
        const activeBars = document.querySelectorAll(`.b${step}`);
        //console.log(activeBars);
        activeBars.forEach(bars => {
            bars.style.animation = `playTrack .3s alternate ease-in-out 2`;
            //Check bar active
            if(bars.classList.contains("active")){
                if(bars.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bars.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bars.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });

    }
    start(){
        const interval = (60/this.bpm)*1000;
        if(this.isPlaying){
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.playButton.innerText = "Play";
            
            this.playButton.classList.add("btn-2");
            this.playButton.classList.add("btn-2g");
            
            this.playButton.classList.remove("btn-2-stop");
            this.playButton.classList.remove("btn-2g-stop");
    }

        else{
            this.isPlaying=setInterval( () => {this.repeat();},interval);
            this.playButton.innerText = "Stop";
          
            this.playButton.classList.remove("btn-2");
            this.playButton.classList.remove("btn-2g");
           
            this.playButton.classList.add("btn-2-stop");
            this.playButton.classList.add("btn-2g-stop");

            //console.log(this.playButton);
        }
    }  
    
    changeSound(e){
        //console.log(e.target);
        const optionName= e.target.name;
        const optionValue= e.target.value;
        switch(optionName){
            case "kick-select":
                this.kickAudio.src= optionValue;
                break;
             case "snare-select":
                this.snareAudio.src= optionValue;
                 break;
            case "hihat-select":
                this.hihatAudio.src= optionValue;
                break;
            
        }

    }

    volume(e){
        //console.log(e.target);
        //console.log(e.target.nextElementSibling);
        const mutedPads=e.target.nextElementSibling;
        mutedPads.classList.toggle("volume-muted");
        const muteIndex= e.target.getAttribute("data-track");
        if(mutedPads.classList.contains("volume-muted")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume=0;
                        break;
                case "1":
                    this.snareAudio.volume=0;
                    break;
                case "2":
                    this.hihatAudio.volume=0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume=1;
                        break;
                case "1":
                    this.snareAudio.volume=1;
                    break;
                case "2":
                    this.hihatAudio.volume=1;
                    break;
            } 

        }
        }
    changeTempo(e){
        const tempoNr= document.querySelector(".tempo-nr");
        tempoNr.innerText= e.target.value;
        this.bpm= e.target.value;
    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying= null;
        if(this.playButton.classList.contains("btn-2-stop")){
            this.start();
        }
    }
    
}


const drumKit = new DrumKit();

//Event Listners

drumKit.playButton.addEventListener('click',(e) => {
    drumKit.start();
});

drumKit.pad.forEach(pads=>{
    pads.addEventListener('click',drumKit.activePad);
    pads.addEventListener('animationend',function(){
        //console.log(this);
        this.style.animation="";
    });
});

drumKit.option.forEach(o =>{
    o.addEventListener('change',function(e){
        drumKit.changeSound(e);  
    });
});

drumKit.mute.forEach(m=>{
    m.addEventListener('click',function(e){
        drumKit.volume(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
});



