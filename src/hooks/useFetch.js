import { useState, useEffect } from "react";

const getRequestOptions = (
  method = 'GET',
  body = null,
  extraHeaders = {},
) => {
    const baseHeaders = { 'Content-Type': 'application/json' };
    const token = process.env.NEXT_PUBLIC_NETATMO_TOKEN;
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
    const call = await fetch(url, getRequestOptions(method, body, headers));
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