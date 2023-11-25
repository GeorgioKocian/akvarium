import styled from "styled-components";

export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48%;
  border: 1px solid white;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
  ${(props) => {
    if (props.name === props["data-active"]) {
      return `
                background-color: rgba(255,255,255,0.3);
            `;
    }
  }}
`;
