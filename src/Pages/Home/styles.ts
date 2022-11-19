import styled from "styled-components";

export const HomeContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    flex: 1;

    form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
    }

`
const BasedButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 0.5rem;
    font-weight:  bold;

    cursor: pointer;

    color: ${props => props.theme["gray-100"]};

    transition: all 0.2s;
`

export const StartCountDownButton = styled(BasedButton)`

    background: ${props => props.theme["green-500"]};

    &:not(:disabled):hover{
        background: ${props => props.theme["green-700"]};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`

export const StopCountDownButton = styled(BasedButton)`
   
    background: ${props => props.theme["red-500"]};

    &:not(:disabled):hover{
        background: ${props => props.theme["red-700"]};
    }

`