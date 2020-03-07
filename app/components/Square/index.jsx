import React from 'react';
import styled from '@emotion/styled';

const SquareButton = styled.button`
    background-color: ${props =>
        props.active ? props.item.activeColor : props.item.color};
    border: 2px solid #000;
`;

const Square = ({ color, testFunc, item, index, activeColor, isPlaying }) => (
    <SquareButton
        onClick={() => {
            testFunc(index, item);
        }}
        color={color}
        item={item}
        active={index === activeColor}
        isPlaying={isPlaying}
        type="button"></SquareButton>
);

export default Square;
