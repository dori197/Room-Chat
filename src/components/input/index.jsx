import React from 'react'
import styled from 'styled-components';

const Input = ({ placeholder, color, ...press }) => {
    return (
        <StyledWrapper color={color}>
            <div className="inputGroup">
                <input type="text" id="name" required autoComplete="off" {...press} />
                <label htmlFor="name">{placeHolder}</label>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .inputGroup {
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0 1em 0;
    max-width: 100%;
    position: relative;
  }
  .inputGroup input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
  }
  .inputGroup label {
    font-size: 100%;
    position: absolute;
    left: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
  }
  .inputGroup :is(input:focus, input:valid)~label {
    transform: translateY(-50%) scale(.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    // background-color: #e8e8e8;
    color: ${props => props.color || "#ffff"};
    font-weight: bold;
  }
  .inputGroup :is(input:focus, input:valid) {
    border-color: var(--default-color);
  }`;

export default Input
