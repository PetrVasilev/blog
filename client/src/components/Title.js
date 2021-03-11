import styled from 'styled-components'

const View = styled.div`
    font-size: 18px;
    margin-bottom: 15px;
`

const Title = ({ children, className }) => {
    return <View className={className}>{children}</View>
}

export default Title
