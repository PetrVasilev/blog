import React from 'react'
import styled from 'styled-components'

import Loading from './Loading'

const View = styled.button`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.8);
    height: 34px;
    min-width: 70px;
    font-size: 14px;
    padding-left: 15px;
    padding-right: 15px;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        cursor: default;
        opacity: 0.5;
    }
`

const Button = ({ children, loading, ...props }) => {
    return (
        <View disabled={loading} {...props}>
            {loading ? <Loading size="18px" /> : children}
        </View>
    )
}

export default Button
