const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const  music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//  Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electiric Chill Machine', 
        artist: 'Saeed'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army ', 
        artist: 'Saeed'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen', 
        artist: 'Saeed'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)', 
        artist: 'Saeed'
    },
    
]

//  Check if  Playing
let isPlaying = false;

//  Play
function playSong () {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

//  Play
function pauseSong () {
    isPlaying = false;
    playBtn.classList.replace ('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

//  Play or Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//  Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}
//  Current Song
let SongIndex = 0;

//  Previous Song
function prevSong() {
    SongIndex--;
    if  (SongIndex < 0) {
        SongIndex = songs.length - 1;
    }
    console.log(SongIndex);
    loadSong(songs[SongIndex]);
    playSong();
}

// Next Song
function nextSong() {
    SongIndex++;
    if  (SongIndex > songs.length - 1) {
        SongIndex = 0;
    }
    loadSong(songs[SongIndex]);
    playSong();
 
}

//  On Load - Select First Song
loadSong(songs[SongIndex]);

//  Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement; 
        // Update Progress bar width
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`
        //  Calculate display for duration
        const durationMinutes = Math.floor( duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        //  Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent  = `${durationMinutes}:${durationSeconds}`;
        }
        //  Calculate display for current
        const currentMinutes = Math.floor( currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}


// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar)