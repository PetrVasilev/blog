import React from 'react'
import styled from 'styled-components'

const View = styled.div`
    .loader {
        border: ${(props) => props.width} solid ${(props) => props.color};
        border-radius: 50%;
        box-sizing: border-box;
        border-top: ${(props) => props.width} solid ${(props) => props.textColor};
        width: ${(props) => props.size};
        height: ${(props) => props.size};
        -webkit-animation: spin 0.6s linear infinite;
        animation: spin 0.6s linear infinite;
    }

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const Loading = ({ color = 'black', textColor = 'white', size = '20px', width = '2px' }) => {
    return (
        <View size={size} width={width} color={color} textColor={textColor}>
            <div className="loader"></div>
        </View>
    )
}

export default Loading
