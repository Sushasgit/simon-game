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
        id: 1,
        name: 'Easy',
        time: 1500,
    },
    sequence: [],
    isPlaying: false,
    userSequence: [],
    activeColor: null,
    round: 0,
    message: '',
};

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_LEVEL:
            return {
                ...state,
                level: payload,
            };
        case NEXT_ROUND:
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
                message: 'Sorry, you lost. Try again',
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
