import styled from 'styled-components'

const View = styled.div`
    margin-bottom: 15px;
    width: 100%;

    input {
        width: 100%;
        box-sizing: border-box;
        height: 34px;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding-left: 10px;
        padding-right: 10px;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    .label {
        margin-bottom: 3px;
        font-size: 14px;
    }
`

const Input = ({ label, ...props }) => {
    return (
        <View>
            {label && <div className="label">{label}</div>}
            <input {...props} />
        </View>
    )
}

export default Input
