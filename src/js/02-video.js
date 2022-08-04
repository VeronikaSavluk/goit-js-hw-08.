import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const iframeEl = document.querySelector("iframe#vimeo-player");

const player = new Player(iframeEl);
let parsedCurrentTime;
let seconds = 0;

const onPlay = function (timeupdate) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timeupdate));

};

player.on('timeupdate', throttle(onPlay, 1000));

const savedCurrentTime = localStorage.getItem(STORAGE_KEY);

function checkParsedTime(savedCurrentTime) {
    if (!savedCurrentTime) {
        seconds = 0;
    }
    else {
        parsedCurrentTime = JSON.parse(savedCurrentTime);
        seconds = parsedCurrentTime.seconds;
    }
    return seconds;
}
checkParsedTime(savedCurrentTime);
console.log(seconds);

player.setCurrentTime(seconds).then(function (seconds) {

    }).catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            break;

        default:
            break;
    }
    });



