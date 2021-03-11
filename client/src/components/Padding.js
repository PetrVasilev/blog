import styled from 'styled-components'

const View = styled.div`
    max-width: ${(props) => props.maxWidth};
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    @media only screen and (max-width: ${(props) => props.maxWidth}) {
        padding: 0 15px;
        width: 100%;
        max-width: 100%;
    }
`

const Padding = ({ children, className, style, maxWidth = '700px' }) => {
    return (
        <View className={className} style={style} maxWidth={maxWidth}>
            {children}
        </View>
    )
}

export default Padding
