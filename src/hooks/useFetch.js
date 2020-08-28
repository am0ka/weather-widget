import { useState, useEffect } from "react";

const getNewToken = (clientId, clientSecret, refresh_token) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "refresh_token");
  urlencoded.append("client_id", clientId);
  urlencoded.append("client_secret", clientSecret);
  urlencoded.append("refresh_token", refresh_token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch("https://api.netatmo.com/oauth2/token", requestOptions)
    .then(response => response.text())
    .then(result => {return JSON.parse(result).access_token})
    .catch(error => console.log('error', error));
}

const getRequestOptions = async (
  method = 'GET',
  body = null,
  extraHeaders = {},
) => {
    const baseHeaders = { 'Content-Type': 'application/json' };
    const token = await getNewToken(
      process.env.NETATMO_ID,
      process.env.NETATMO_SECRET,
      process.env.NETATMO_REFRESH_TOKEN);
    const headers = {
      ...baseHeaders,
      authorization: `Bearer ${token}`,
      ...extraHeaders,
    }
    return { method, headers, ...(body && { body: JSON.stringify(body) }) };
  };

async function request({
  url,
  method,
  body,
  headers,
  serverContext,
}) {
  try {
    const call = await fetch(url, await getRequestOptions(method, body, headers));
    if (!call.ok) {
      const { status, statusText } = call;
      const errObj = { status, statusText};
      return Promise.reject(errObj);
    }
    const data = await call.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export default function useFetch({
  url,
  method,
  body,
  headers,
  initialData = null,
  deps = [],
  conditionally = true,
}) {
  const [data, setData] = useState(initialData);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(() => {
        setError(null);
        return true;
      });
      const response = await request({
        url, method, body, headers,
      });
      setLoading(() => {
        setData(response);
        return false;
      });
    } catch (_error) {
      setLoading(() => {
        setError(_error);
        return false;
      });
    }
  };

  useEffect(() => {
    if (conditionally) {
      getData();
    }
  }, deps);

  return [data, isLoading, error];
}