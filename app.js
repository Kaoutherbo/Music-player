
const container = document.querySelector('.container');
const musicImg = document.querySelector('.img-area img');
const musicName = document.querySelector('.song-details .name');
const musicArtist = document.querySelector('.song-details .artist');
const mainAudio = document.querySelector('#main-audio');
const playPauseBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const progressBar = document.querySelector('.progress-bar');
const repeatBtn = document.getElementById('repeat-playlist');
const moreMusicBtn = document.getElementById('more-music');
const musicLists = document.querySelector('.music-list');
const closeListBtn = document.getElementById('close');
const musicListUl = document.querySelector('.music-list ul');
const musicListItems = document.querySelectorAll('.music-list ul li');



let musicIndex = 0;
let isRepeat = false;

window.addEventListener('load', () => {
    loadMusic(musicIndex);
});

// Load music function
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb].name;
    musicArtist.innerText = allMusic[indexNumb].artist;
    musicImg.src = allMusic[indexNumb].img;
    mainAudio.src = allMusic[indexNumb].src;
}

// Play music function
function playMusic() {
    container.classList.add('paused');
    playPauseBtn.querySelector('i').innerHTML = 'pause';
    mainAudio.play();
}

// Pause music function
function pauseMusic() {
    container.classList.remove('paused');
    playPauseBtn.querySelector('i').innerHTML = 'play_arrow';
    mainAudio.pause();
}

// Next music function
function nextMusic() {
    musicIndex++;
    if (musicIndex >= allMusic.length) {
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
}

// Previous music function
function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = allMusic.length - 1;
    }
    loadMusic(musicIndex);
    playMusic();
}

// Play/pause music button event
playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = container.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
});

// Next music button event
nextBtn.addEventListener('click', () => {
    nextMusic();
});

// Previous music button event
prevBtn.addEventListener('click', () => {
    prevMusic();
});








// Click on progress bar to change current time
progressBar.parentElement.addEventListener('click', (e) => {
    const clickPositionX = e.offsetX;
    const progressBarWidth = progressBar.parentElement.clientWidth;
    const duration = mainAudio.duration;

    const clickPercentage = (clickPositionX / progressBarWidth) * 100;
    const currentTime = (clickPercentage / 100) * duration;

    mainAudio.currentTime = currentTime;
});

// Click on music list to change the song
const musicList = document.querySelector('.music-list ul');
musicList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const newIndex = Array.from(musicList.children).indexOf(e.target);
        musicIndex = newIndex;
        loadMusic(musicIndex);
        playMusic();
    }
});

// Update progress bar on music ended
mainAudio.addEventListener('ended', () => {
    if (isRepeat) {
        // If repeat is active, play the same music again
        mainAudio.currentTime = 0;
        playMusic();
    } else {
        // Otherwise, play the next music
        nextMusic();
    }
});

// Update progress bar and timer
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // Update current time and duration display
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    document.querySelector('.current-progress').innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    document.querySelector('.max-progress').innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});







// Click on progress bar to change current time
progressBar.parentElement.addEventListener('click', (e) => {
    const clickPositionX = e.offsetX;
    const progressBarWidth = progressBar.parentElement.clientWidth;
    const duration = mainAudio.duration;

    const clickPercentage = (clickPositionX / progressBarWidth) * 100;
    const currentTime = (clickPercentage / 100) * duration;

    mainAudio.currentTime = currentTime;
});

// Function to toggle repeat button
function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.style.backgroundColor = isRepeat ? '#2196F3' : '#fff';
}

// Function to show music list
function showMusicList() {
    musicLists.classList.add('show');
}

// Function to hide music list
function hideMusicList() {
    musicLists.classList.remove('show');
}

// Function to play selected music from the music list
function playSelectedMusic(index) {
    musicIndex = index;
    loadMusic(musicIndex);

    if (container.classList.contains('paused')) {
        playPauseBtn.querySelector('i').innerHTML = 'pause';
        mainAudio.play();
    } else {
        playPauseBtn.querySelector('i').innerHTML = 'play_arrow';
        mainAudio.pause();
    }

    hideMusicList();
}

// Add event listeners
repeatBtn.addEventListener('click', toggleRepeat);
moreMusicBtn.addEventListener('click', showMusicList);
closeListBtn.addEventListener('click', hideMusicList);

// Use event delegation for music list items
musicListUl.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const index = Array.from(musicListItems).indexOf(e.target);
        playSelectedMusic(index);
    }
});


const favorite = document.getElementById('favorite');

let isFavorite = false; 

favorite.addEventListener('click', () => {
  isFavorite = !isFavorite; // Toggle the favorite state

  // Update the favorite icon based on the favorite state
  if (isFavorite) {
    favorite.innerText = 'favorite'; // Replace 'favorite_border' with 'favorite' to show the filled icon
    favorite.style.color = 'red'; // Set the color to red
  } else {
    favorite.innerText = 'favorite_border'; // Restore the icon to the outline version
    favorite.style.color = 'white'; // Set the color back to white
  }
});
