import styled from 'styled-components'

import Header from './Header'

const Content = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
`

const Layout = ({ children, options = {}, ...props }) => {
    return (
        <>
            <Header {...props} />
            <Content>{children}</Content>
        </>
    )
}

const withLayout = (props, Component, options = {}) => (
    <Layout options={options} {...props}>
        <Component {...props} />
    </Layout>
)

export default withLayout
