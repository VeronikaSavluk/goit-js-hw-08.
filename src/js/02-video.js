import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const iframeEl = document.querySelector("iframe#vimeo-player");

const player = new Player(iframeEl);
let parsedCurrentTime;

player.on('play', throttle(function (timeupdate) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timeupdate));
}, 1000));

const savedCurrentTime = localStorage.getItem(STORAGE_KEY);
function checkParsedTime (savedCurrentTime) {
    if (!savedCurrentTime) {
        parsedCurrentTime = 0;
    }
    else {
        parsedCurrentTime = JSON.parse(savedCurrentTime);
    }
    console.log(parsedCurrentTime);
}
checkParsedTime(savedCurrentTime);

player.setCurrentTime(parsedCurrentTime.seconds).then(function (seconds) {

    }).catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            break;

        default:
            break;
    }
});