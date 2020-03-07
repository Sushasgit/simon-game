import React from 'react';
import styled from '@emotion/styled';

const SquareButton = styled.button`
    background-color: ${props =>
        props.active ? props.item.activeColor : props.item.color};
`;

const Square = ({
    color,
    handleClick,
    item,
    index,
    activeColor,
    isPlaying,
    round,
}) => (
    <SquareButton
        onClick={() => {
            handleClick(index, item);
        }}
        color={color}
        item={item}
        disabled={isPlaying || !round}
        active={index === activeColor}
        isPlaying={isPlaying}
        type="button"
    />
);

export default Square;
