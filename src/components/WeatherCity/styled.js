import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CityName = styled.h1`
  align-self: center;
  text-decoration: underline;
`;

export const MainWeather = styled.h3`
  align-self: center;
  font-size: 3.5rem;
  margin: 0;
  &::after {
    content: "\\00B0 C"
  }
`;

export const SupWeather = styled.div`
  align-self: center;
  justify-content: space-around;
  display: flex;
  font-size: 1.25rem;
  width: 15rem;
  margin-top: .25rem;
  span:first-child {
    &::before {
      content: "\\2191";
    }
  }
  span:last-child {
    &::before {
      content: "\\2193";
    }
  }
  span::after {
    content: "\\00B0 C";
  }
`;

export const Stats = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: .5rem;
`;

export const StatsBox = styled.div`
  text-align: center;
  padding: .5px;
  h1 {
    font-weight: normal;
    font-size: 1.2rem;
    text-decoration: underline;
  }
`;
