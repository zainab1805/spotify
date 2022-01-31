console.log('Welcome to Spotify');

//Initailize the variables
let songindex=0;
let audioele=new Audio('song1.mp3');

let masterPlay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('progressbar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songitem'));
let mastersongname=document.getElementById('mastersongname');


let songs=[
    {songname:"Raatan-lambiya",songpath:"song1.mp3",coverpath:"rlposter.jpg"},
    {songname:"Barish-ban",songpath:"song2.mp3",coverpath:"song2im.jpg"},
    {songname:"Ranjha",songpath:"song3.mp3",coverpath:"song3im.jpg"},
    {songname:"Kabhi-tumhe",songpath:"song4.mp3",coverpath:"song4im.jpg"},
    {songname:"Khuda-Hafiz",songpath:"song5.mp3",coverpath:"song5im.jpg"},
    
];

songItems.forEach((ele,i)=>{
    //console.log(ele,i);
    ele.getElementsByTagName('img')[0].src=songs[i].coverpath;
    ele.getElementsByClassName('songname')[0].innerHTML=songs[i].songname;
});



//handle play/pause
masterPlay.addEventListener('click',()=>{
    if(audioele.paused || audioele.currentTime<=0){
        audioele.play();
        //change play button to pause button
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioele.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
});

audioele.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    // below formula will give kitna percent gaana chal chuka
    progress=parseInt((audioele.currentTime/audioele.duration)*100);
    console.log(progress);
    myprogressbar.value=progress;
});

myprogressbar.addEventListener('change',()=>{
    audioele.currentTime=(myprogressbar.value * audioele.duration)/100;
    console.log('progress');
    console.log(audioele.currentTime);
});

const makeAllPlays=()=>{
Array.from(document.getElementsByClassName('songitemplay')).forEach((ele)=>{
    ele.classList.remove('fa-pause-circle');
    ele.classList.add('fa-play-circle');
})
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        makeAllPlays();
        songindex=parseInt(e.target.id);
        console.log(e.target);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioele.src=`song${songindex}.mp3`;
        audioele.currentTime=0;
        mastersongname.innerHTML=songs[songindex-1].songname;
        audioele.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=5){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioele.src=`song${songindex}.mp3`;
    audioele.currentTime=0;
    mastersongname.innerHTML=songs[songindex-1].songname;
        audioele.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=9;
    }
    else{
        songindex-=1;
    }
    audioele.src=`song${songindex}.mp3`;
    audioele.currentTime=0;
    mastersongname.innerHTML=songs[songindex-1].songname;
        audioele.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})