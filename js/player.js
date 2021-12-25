let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let curr_track = document.getElementById('Audio');
curr_track.load();

let track_index = 0;
let isPlaying = false;
let updateTimer;

let songs = [
    {
        name: "I Don't Like",
        artist: "Cheif Keef",
        image: "https://i.scdn.co/image/ab67616d00001e02dbc0cd3ec197afa498d9fecd",
        path: "assets/sound/Cheif Keef - I Don't Like (Remix).mp3",
    },
    {
        name: "Resonance",
        artist: "Home",
        image: "https://i.scdn.co/image/ab67616d00001e02f421e4ca838fe19d8cdf934a",
        path: "assets/sound/HOME - Resonance.mp3"
    },
    {
        name: "Suicide Year",
        artist: "Weedmane",
        image: "https://i.scdn.co/image/ab67616d00001e0216cb9f7da3faab76570ca3ff",
        path: "assets/sound/WEEDMANE - SUICIDE YEAR.mp3"
    },
    {
        name: "Hold",
        artist: "Home",
        image: "https://i.scdn.co/image/ab67616d00001e021a58e296ff48e9d5ef171953",
        path: "assets/sound/HOME - Hold.mp3",
    },
    {
        name: "The Runway",
        artist: "Bazanji",
        image: "https://i.scdn.co/image/ab67616d00001e0235f33e7ccd10a0b7f06907d7",
        path: "assets/sound/Bazanji - The Runway.mp3"
    },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.load();
  curr_track.src = songs[track_index].path;

  track_art.style.backgroundImage = "url(" + songs[track_index].image + ")";
  track_name.textContent = songs[track_index].name;
  track_artist.textContent = songs[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play().then(() => {
    // HTMLMediaElement.play() returns a Promise. The part where it says "Uncaught in promise" means that the promise has no way to handle the error and should add some promise logic with a catch() method to it.
  }).catch(error => {
    console.log(error);
  });
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';;
}

function secret() {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = "assets/sound/DigBarGayRaps - 3 Big Balls.mp3";
    track_art.style.backgroundImage = `url(https://i.scdn.co/image/ab67616d00001e021e4daf902bd23d9b1a045660)`;
    track_name.textContent = "3 Big Balls";
    track_artist.textContent = "DigBarGayRaps";
  
    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    playTrack();
}

function nextTrack() {
  if (track_index < songs.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = songs.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}