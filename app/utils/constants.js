import sound1 from '../sounds/1.mp3';
import sound2 from '../sounds/2.mp3';
import sound3 from '../sounds/3.mp3';
import sound4 from '../sounds/4.mp3';

export const CHANGE_LEVEL = 'CHANGE_LEVEL';
export const GAME_OVER = 'GAME_OVER';
export const NEXT_ROUND = 'NEXT_ROUND';
export const ADD_SEQUENCE = 'ADD_SEQUENCE';
export const CHECK_RESULT = 'CHECK_RESULT';
export const SET_COLOR = 'SET_COLOR';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';
export const SET_USER_SEQUENCE = 'SET_USER_SEQUENCE';

export const sounds = [
    {
        id: 1,
        audio: new Audio(sound1),
        color: '#ff3333',
        activeColor: '#ff9980',
    },
    {
        id: 2,
        audio: new Audio(sound2),
        color: '#00cc66',
        activeColor: ' #80ffbf',
    },
    {
        id: 3,
        audio: new Audio(sound3),
        color: '#3399ff',
        activeColor: ' #99ccff',
    },
    {
        id: 4,
        audio: new Audio(sound4),
        color: '#ffff00',
        activeColor: '#ffff99',
    },
];
