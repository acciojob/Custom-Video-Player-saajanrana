const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.player__button');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackSpeedSlider = player.querySelector('input[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');

// Play or pause the video when the play/pause button is clicked
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the play/pause button text based on the video's playback state
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Skip forward or backward by the specified amount of time
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update the volume of the video
function handleVolumeChange() {
  video.volume = this.value;
}

// Update the playback speed of the video
function handlePlaybackSpeedChange() {
  video.playbackRate = this.value;
}

// Update the progress bar to reflect the current video progress
function handleProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercent}%`;
}

// Set the video's current time based on the position of the progress bar clicked
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeedSlider.addEventListener('input', handlePlaybackSpeedChange);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);