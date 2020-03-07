import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { sounds } from '../../utils/constants';
import Square from '../../components/Square';
import {
    setActiveColor,
    togglePlaying,
    setUserAnswer,
    nextRound,
    gameOver,
} from '../../actions';
import { fillArray, asyncActiomWrap } from '../../utils/helpers';

const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 200px);
    max-width: 800px;
    margin: 0 auto;
`;

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.hilghtTimer = null;
    }

    hilghtItem = item => {
        this.props.setActiveColor(item);
        this.hilghtTimer = setTimeout(() => {
            this.props.setActiveColor(null);
        }, 200);

        return () => {
            clearTimeout(this.hilghtTimer);
        };
    };

    startGame = () => {
        const arr = fillArray(4);
        const { nextRound } = this.props;
        asyncActiomWrap(nextRound, arr).then(() => {
            this.playSequence();
            this.props.togglePlaying(true);
        });
    };

    playSequence = () => {
        const { sequence } = this.props;
        let timeIndex = 0;
        const arr = sequence.map(item => {
            timeIndex += 1000;
            return this.promiseTimeout(timeIndex, item);
        });
        console.log(arr);
        Promise.all(arr).then(() => {
            console.log('FINISHED all');
            this.props.togglePlaying(false);
        });
    };

    promiseTimeout = (delay, item) => {
        console.log('Delay', delay);
        return new Promise(resolve => {
            setTimeout(() => {
                const { setActiveColor } = this.props;
                resolve();
                sounds[item].audio.play();
                this.hilghtItem(item);
            }, delay);
        }).then(() => {
            console.log('end of promise', item);
            // this.props.setActiveColor(null)
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
                const { nextRound } = this.props;
                this.props.togglePlaying(true);
                asyncActiomWrap(nextRound, arr).then(() => {
                    this.playSequence();
                });
            }
        }
    };

    testFunc = index => {
        const { sequence, userSequence, setUserAnswer } = this.props;
        asyncActiomWrap(setUserAnswer, index).then(() => {
            this.checkResult(userSequence, sequence);
        });
    };

    render() {
        const { round, message, activeColor, isPlaying } = this.props;
        console.log('THIS PROPS RENDER', this.props);
        return (
            <>
                <h2>Round {round || 0}</h2>
                <p>{message && message}</p>
                <Container>
                    {sounds.map((item, i) => (
                        <Square
                            item={item}
                            testFunc={this.testFunc}
                            key={item.id}
                            color={
                                activeColor === item.activeColor && isPlaying
                                    ? activeColor
                                    : item.color
                            }
                            index={i}
                            activeColor={activeColor}
                            isPlaying={isPlaying}>
                            {console.log(
                                'activeColor === item.activeColor',
                                activeColor === item.activeColor,
                                isPlaying,
                            )}
                        </Square>
                    ))}
                </Container>
                <button type="button" onClick={this.startGame}>
                    Start
                </button>
            </>
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
});

const mapDispatchToProps = dispatch => {
    return {
        nextRound: array => dispatch(nextRound(array)),
        setActiveColor: index => dispatch(setActiveColor(index)),
        togglePlaying: value => dispatch(togglePlaying(value)),
        setUserAnswer: index => dispatch(setUserAnswer(index)),
        gameOver: () => dispatch(gameOver()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
