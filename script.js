let songIndex = 1;
let audioElement = new Audio('song/song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'))



let songs = [
    {songName: "Let Me Love You", filePath: "song/song1.mp3", coverPath: "cover/1.jpeg.jpeg"},
    {songName: "Shape Of You", filePath: "song/song2.mp3", coverPath: "cover/2.jpeg.jpg"},
    {songName: "The Book Of You And I", filePath: "song/song3.mp3", coverPath: "cover/3.jpg.jpg"},
    {songName: "Until I Found You", filePath: "song/song4.mp3", coverPath: "cover/4.jpg.jpeg"},
    {songName: "Lover", filePath: "song/song5.mp3", coverPath: "cover/5.jpeg"},
    {songName: "California Love", filePath: "song/song6.mp3", coverPath: "cover/6.jpg"},
    {songName: "Softly", filePath: "song/song7.mp3", coverPath: "cover/7.jpeg"},
    {songName: "Tu hai kahan", filePath: "song/song8.mp3", coverPath: "cover/8.jpeg"},
    {songName: "Choo Lo", filePath: "song/song9.mp3", coverPath: "cover/9.jpeg"},
    {songName: "Jiyein Kyun", filePath: "song/song10.mp3", coverPath: "cover/10.jpeg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/song${songIndex}.mp3`; 
        masterSongName.innerText = songs[songIndex-1].songName;  
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=10){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `song/song${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1;
    makeAllPlays();
    playPause(songIndex);
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex=10;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `song/song${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1;
    makeAllPlays();
    playPause(songIndex);
})

function playPause(songIndex){
    const PlayIcon = document.getElementById(songIndex);
    PlayIcon.classList.remove('fa-circle-play');
    PlayIcon.classList.add('fa-circle-pause');
}


