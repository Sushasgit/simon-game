import React from 'react';
import styled from '@emotion/styled';

const SelectWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 900;
`;

const BaseSelect = styled.select`
    min-width: 200px;
    margin-left: 10px;
    font-size: 16px;
`;

const Select = ({ options = [], defaultValue, handleChange, disabled }) => (
    <SelectWrap>
        Level:
        <BaseSelect
            defaultValue={defaultValue}
            onChange={handleChange}
            disabled={disabled}>
            {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </BaseSelect>
    </SelectWrap>
);

export default Select;
