const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
console.log(skipButtons)
function togglePlay(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
    updateButton();
}

// console.log(ranges)
function updateButton(){
    if(toggle.textContent==='►'){
        toggle.textContent='❚❚'
    }else{
        toggle.textContent='►'
    }
}

function skip(value){
    let skipValue= parseFloat(value);
    // console.log(skipValue)
    video.currentTime += skipValue;
}

function volumeChange(){
    video.volume= this.value
}
function playBackRateChange(){
    video.playbackRate = this.value;
}
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}



toggle.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
skipButtons.forEach((button)=>{
    button.addEventListener('click',(e)=>{
        let value = button.getAttribute('data-skip');
        // console.log(value)
        skip(value)
    })
})
ranges[0].addEventListener('input',volumeChange)
ranges[1].addEventListener('input',playBackRateChange)
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);