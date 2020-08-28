import styled, { keyframes } from 'styled-components';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const CitySelector = styled.ul`
  border-radius: 20px;
  padding: .5rem .75rem;
  border: 1px solid #000;
  display: flex;
  justify-content: space-around;
  margin: .75rem;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
    padding: .75rem 1rem;
  }
`;

export const CityOption = styled.li`
  list-style: none;
`;

export const CityButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  font: inherit;
  user-select:none;
  &:hover, &:active {
    outline: 0;
  }
  text-decoration: ${({ active }) => active ? "underline" : "none"};
`;

const placeload = keyframes`
  from {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  to {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

export const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  align-self: center;
  div {
    position: absolute;
    border: 4px solid #000;
    opacity: 1;
    border-radius: 50%;
    animation: ${placeload} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;