import {
    CHANGE_LEVEL,
    SET_COLOR,
    SET_USER_SEQUENCE,
    TOGGLE_PLAYING,
    NEXT_ROUND,
    GAME_OVER,
} from '../utils/constants';

const initialState = {
    level: {
        type: 'low',
        time: 1500,
    },
    sequence: [],
    isPlaying: false,
    userSequence: [],
    gameOver: false,
    activeColor: null,
    round: 0,
    message: '',
};

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_LEVEL:
            return {
                ...state,
                payload,
            };
        case NEXT_ROUND:
            console.log('ADD_SEQUENCE', payload);
            return {
                ...state,
                round: state.round + 1,
                sequence: [...state.sequence, ...payload],
                userSequence: [],
                message: '',
            };
        case SET_COLOR:
            return {
                ...state,
                activeColor: payload,
            };
        case SET_USER_SEQUENCE:
            state.userSequence.push(payload);
            return {
                ...state,
                userSequence: state.userSequence,
            };
        case GAME_OVER:
            return {
                ...state,
                userSequence: [],
                sequence: [],
                round: 0,
                message: 'Sorry you lost!',
            };
        case TOGGLE_PLAYING:
            return {
                ...state,
                isPlaying: payload,
            };
        default:
            return state;
    }
}
