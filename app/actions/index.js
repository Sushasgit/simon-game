import {
    NEXT_ROUND,
    TOGGLE_PLAYING,
    SET_USER_SEQUENCE,
    GAME_OVER,
    SET_COLOR,
} from '../utils/constants';

export const setActiveColor = index => ({
    type: SET_COLOR,
    payload: index,
});

export const togglePlaying = value => ({
    type: TOGGLE_PLAYING,
    payload: value,
});

export const setUserAnswer = index => ({
    type: SET_USER_SEQUENCE,
    payload: index,
});

export const gameOver = () => ({
    type: GAME_OVER,
});

export const nextRound = sequance => ({
    type: NEXT_ROUND,
    payload: sequance,
});
