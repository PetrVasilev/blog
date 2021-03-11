import styled from 'styled-components'

const View = styled.div`
    margin-bottom: 15px;
    width: 100%;

    textarea {
        width: 100%;
        box-sizing: border-box;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    .label {
        margin-bottom: 3px;
        font-size: 14px;
    }
`

const Textarea = ({ label, containerClass, ...props }) => {
    return (
        <View className={containerClass}>
            {label && <div className="label">{label}</div>}
            <textarea {...props} />
        </View>
    )
}

export default Textarea
