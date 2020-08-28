import useFetch from "../hooks/useFetch";

function jsonToArray(obj) {
  const arr = [];

  for (let key in obj)
   if (obj.hasOwnProperty(key))
    arr.push(obj[key]);
  return arr;
}

function getIdealArray(obj) {
  let data = obj.find(item => Object.keys(item.measures).length === 3) || obj[0];
  let temp, humid, press, rain;
  if (!data)
    return {err: "No data found"};
  data = jsonToArray(data.measures);
  temp = jsonToArray(data[0].res)[0][0];
  humid = jsonToArray(data[0].res)[0][1];
  press = jsonToArray(data[1].res)[0][0];
  if (data.length === 3) {
    rain = data[2].rain_24h;
  }
  return {temp: temp, humid: humid, press: press, rain: rain};
}

export function getData(lat_ne, lon_ne, lat_sw, lon_sw) {
  const url = `${process.env.NEXT_PUBLIC_API_URI}/getpublicdata?lat_ne=${lat_ne}&lon_ne=${lon_ne}&lat_sw=${lat_sw}&lon_sw=${lon_sw}&filter=false`;
  const [ rawData ] = useFetch({url, deps: [url] });
  const data = rawData ? getIdealArray(rawData.body) : null;

  return data;
}