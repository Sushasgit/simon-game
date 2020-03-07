import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Square from '../../components/Square';
import Select from '../../components/Select';
import {
    setActiveColor,
    togglePlaying,
    setUserAnswer,
    nextRound,
    gameOver,
    changeLevel,
} from '../../actions';
import { fillArray, asyncActiomWrap } from '../../utils/helpers';
import { SOUNDS, LEVELS } from '../../utils/constants';

const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 200px);
    max-width: 650px;
    margin: 30px auto;
    border-bottom: 2px solid #000;
    border-left: 2px solid #000;

    & > button {
        border-top: 2px solid #000;
        border-right: 2px solid #000;
        margin: 0;
    }
`;

const Button = styled.button`
    display: inline-block;
    padding: 10px 50px;
    font: 18px 'Nunito Sans', 'Helvetica', sans-serif;
    border-radius: 7px;
`;

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.hilghtTimer = null;
    }

    hilghtItem = item => {
        const { setActiveColor } = this.props;
        setActiveColor(item);
        this.hilghtTimer = setTimeout(() => {
            setActiveColor(null);
        }, 200);

        return () => {
            clearTimeout(this.hilghtTimer);
        };
    };

    startGame = () => {
        const arr = fillArray(4);
        const { nextRound, togglePlaying } = this.props;
        asyncActiomWrap(nextRound, arr).then(() => {
            this.playSequence();
            togglePlaying(true);
        });
    };

    playSequence = () => {
        const { sequence, level } = this.props;
        let timeIndex = 0;
        const arr = sequence.map(item => {
            timeIndex += level.time;
            return this.promiseTimeout(timeIndex, item);
        });
        Promise.all(arr).then(() => {
            const { togglePlaying } = this.props;
            togglePlaying(false);
        });
    };

    promiseTimeout = (delay, item) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                SOUNDS[item].audio.play();
                this.hilghtItem(item);
            }, delay);
        });
    };

    checkResult = (userSequence, sequence) => {
        const lastElem = userSequence.length - 1;
        const { gameOver } = this.props;
        if (userSequence[lastElem] !== sequence[lastElem]) {
            gameOver();
        } else {
            if (userSequence.length === sequence.length) {
                const arr = fillArray(2);
                const { nextRound, togglePlaying } = this.props;
                togglePlaying(true);
                asyncActiomWrap(nextRound, arr).then(() => {
                    this.playSequence();
                });
            }
        }
    };

    handleClick = index => {
        const { sequence, userSequence, setUserAnswer } = this.props;
        SOUNDS[index].audio.play();
        this.hilghtItem(index);
        asyncActiomWrap(setUserAnswer, index).then(() => {
            this.checkResult(userSequence, sequence);
        });
    };

    handleChange = e => {
        const { changeLevel } = this.props;
        const level = LEVELS.find(level => level.id === +e.target.value);
        changeLevel(level);
    };

    render() {
        const { round, message, activeColor, isPlaying, level } = this.props;
        return (
            <main className="main">
                <h1>Simon the Game</h1>
                <h2>Round: {round || 0}</h2>
                <h2>{message}</h2>
                <Select
                    options={LEVELS}
                    defaultValue={level}
                    handleChange={this.handleChange}
                    disabled={isPlaying || round > 0}
                />
                <Container>
                    {SOUNDS.map((item, i) => (
                        <Square
                            item={item}
                            handleClick={this.handleClick}
                            key={item.id}
                            color={
                                activeColor === item.activeColor && isPlaying
                                    ? activeColor
                                    : item.color
                            }
                            round={round}
                            index={i}
                            activeColor={activeColor}
                            isPlaying={isPlaying}
                        />
                    ))}
                </Container>
                <Button
                    disabled={isPlaying || round > 0}
                    type="button"
                    onClick={this.startGame}>
                    Start Game
                </Button>
            </main>
        );
    }
}

const mapStateToProps = state => ({
    sequence: state.sequence,
    activeColor: state.activeColor,
    isPlaying: state.isPlaying,
    userSequence: state.userSequence,
    round: state.round,
    message: state.message,
    level: state.level,
});

const mapDispatchToProps = dispatch => {
    return {
        nextRound: array => dispatch(nextRound(array)),
        setActiveColor: index => dispatch(setActiveColor(index)),
        togglePlaying: value => dispatch(togglePlaying(value)),
        setUserAnswer: index => dispatch(setUserAnswer(index)),
        gameOver: () => dispatch(gameOver()),
        changeLevel: level => dispatch(changeLevel(level)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
