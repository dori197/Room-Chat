import React from "react";
import styled from "styled-components";

const Button = ({ children, ...press }) => {
  return (
    <StyledWrapper>
      <button {...press}>
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
        <span>{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 15px;
    background: linear-gradient(to bottom, #4dc7d9 0%,#66a6ff 100%);
    color: white;
    padding: 0.2em 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 25px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    padding: 0em;
    background: linear-gradient(to bottom, #5bd9ec 0%,#97c3ff 100%);
    cursor: pointer;
  }

  button:active {
    transform: scale(0.95);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  button span {
    display: block;
    margin-left: 0.4em;
    transition: all 0.3s;
  }

  button:hover span {
    scale: 0;
    font-size: 0%;
    opacity: 0;
    transition: all 0.5s;
  }

  button svg {
    width: 18px;
    height: 18px;
    fill: white;
    transition: all 0.3s;
  }

  button .svg-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    transition: all 0.3s;
  }

  button:hover .svg-wrapper {
    background-color: rgba(43, 169, 228, 0.897);
    width: 34px;
    height: 34px;
  }

  button:hover svg {
    width: 22px;
    height: 22px;
    margin-right: 5px;
    transform: rotate(45deg);
  }
`;

export default Button;