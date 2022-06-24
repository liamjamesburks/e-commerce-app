import styled from "styled-components";
import { ReactComponent as GoogleIcon } from "../../assets/google_icon.svg";

export const GoogleButtonIcon = styled(GoogleIcon)`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  min-height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 2rem;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  font-weight: bolder;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const InvertedButton = styled(BaseButton)`
  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

export const GoogleButton = styled(BaseButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 15px;
  line-height: 23px;
  padding: 0.75rem 1.5rem;

  background-color: #195dcb;
  color: white;

  &:hover {
    background-color: #2f7af5;
    border: none;
  }
`;
