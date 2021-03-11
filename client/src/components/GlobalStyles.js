import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        background-color: whitesmoke;
    }

    a {
        text-decoration: none;
    }

    .card {
        background-color: #fff;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
`
