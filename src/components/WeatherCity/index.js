import { Wrapper, CityName, MainWeather, Stats, StatsBox } from "./styled";

const WeatherCity = ({city, temp, humid, pressure, rain}) => {
  return (
    <Wrapper>
      <CityName>{city.title}</CityName>
      <MainWeather>{temp}</MainWeather>
      <Stats>
        <StatsBox>
          <h1>Humidity</h1>
          {humid}%
        </StatsBox>
        <StatsBox>
          <h1>Pressure</h1>
          {pressure}hPa
        </StatsBox>
        <StatsBox>
          <h1>Rain</h1>
          {rain !== '-' ? rain + " mm" : rain}
        </StatsBox>
      </Stats>
    </Wrapper>
  );
};

export default WeatherCity;