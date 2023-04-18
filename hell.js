const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const  music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electiric Chill Machine', 
        artist: 'Saeed'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)', 
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

let SongIndex = 2;

let isPlaying = false;

//  Play and Pause Music
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

//  update the DOM according the music played
function updateDom (song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = `./img/${song.name}.jpg`;
    music.src = `./music/${song.name}.mp3`
}

// PrevBtn & nextBtn functionality
function prevSong () {
    SongIndex--;
    if (SongIndex < 0) {
        SongIndex = SongIndex.length - 1;
    }
    updateDom(songs[SongIndex]);
    playSong();
    console.log(SongIndex);
}

function nextSong () {
    SongIndex++;
    if (SongIndex > songs.length - 1) {
        SongIndex = 0;
    }
    updateDom(songs[SongIndex]);
    playSong();
    console.log(SongIndex);
}

//  onLoad
updateDom(songs[SongIndex]);

//  EventListners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);