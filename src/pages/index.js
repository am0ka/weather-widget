import Head from 'next/head';
import { useState } from 'react';

import { MainWrapper, CitySelector, CityOption, CityButton, Loader } from '../components/styled';
import WeatherCity from '../components/WeatherCity';
import { getData } from '../utils';


const cityList = [{
  id: 1,
  label: "paris",
  title: "Paris",
  lat_ne: "48.86471476180278",
  lat_sw: "48.83579746243092",
  lon_ne: "2.373046875",
  lon_sw: "2.3291015625"
}, {
  id: 2,
  label: "newYork",
  title: "New York",
  lat_ne: "40.97989806962013",
  lat_sw: "38.82259097617712",
  lon_ne: "-81.5625",
  lon_sw: "-81.5625"
}, {
  id: 3,
  label: "berlin",
  title: "Berlin",
  lat_ne: "52.3755991766591",
  lat_sw: "52.26815737376817",
  lon_ne: "13.7109375",
  lon_sw: "13.53515625"
}, {
  id: 4,
  label: "bogota",
  title: "Bogota",
  lat_ne: "5.266007882805492",
  lat_sw: "4.915832801313174",
  lon_ne: "-75.234375",
  lon_sw: "-75.5859375"
}];

const MainPage = () => {
  const [city, setCity] = useState(cityList[0]);

  const handleCity = (label) => {
    setCity(cityList.find(c => c.label === label));
  };
  
  const arr = getData(city.lat_ne, city.lon_ne, city.lat_sw, city.lon_sw);

  return (
    <MainWrapper>
      <Head>
        <title>Weather Widget</title>
      </Head>
      <CitySelector>
        {cityList.map(({ id, label, title }) => (
          <CityOption key={id}>
            <CityButton active={city.label === label} onClick={() => handleCity(label)}>{title}</CityButton>
          </CityOption>
        ))}
      </CitySelector>
      { !arr &&  <Loader><div></div><div></div></Loader> }
      { arr && arr.err && <h1 style={{textAlign: "center"}}>{arr.err}</h1>}
      { arr && !arr.err && <WeatherCity
        city={city}
        temp={arr.temp}
        humid={arr.humid}
        pressure={arr.press}
        rain={arr.rain == undefined ? "-" : arr.rain}
      /> }
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </MainWrapper>
  );
};

export default MainPage;