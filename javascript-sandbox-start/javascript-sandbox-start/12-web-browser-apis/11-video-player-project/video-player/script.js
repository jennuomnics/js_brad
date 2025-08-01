const play = document.getElementById('play')
const stop = document.getElementById('stop')
const video = document.getElementById('video')
const progress = document.getElementById('progress')

const time = document.getElementById('timestamp')

function PlayVideo() {
    video.play()
}

function PauseVideo() {
    video.pause()
    video.currentTime = 0
}

function updateTime(e) {
    progress.value = (video.currentTime / video.duration) * 100;

    // Get minutes
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }

    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    }

    time.innerHTML = `${minutes}:${seconds}`;
}

play.addEventListener('click', PlayVideo)
stop.addEventListener('click', PauseVideo)

video.addEventListener('timeupdate', updateTime)