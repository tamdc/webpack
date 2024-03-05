import axios from "axios";

import { useEffect, useState } from "react";

const binanceConfig = {
  BINANCE_HOST: process.env.BINANCE_HOST,
  API_KEY: process.env.BINANCE_API_KEY,
  SECRET_KEY: process.env.BINANCE_SECRECT_KEY,
};

const binanceRequest = async (endpoint, data, type) => {
  try {
    const queryParam = new URLSearchParams(data).toString();

    const requestConfig = {
      method: type,
      url: `${binanceConfig.BINANCE_HOST}${endpoint}?${queryParam}&signature=${binanceConfig.SECRECT_KEY}`,
      headers: {
        "X-MBX-APIKEY": binanceConfig.API_KEY,
      },
    };

    console.log("requestConfig", requestConfig);
    const rs = await axios(requestConfig);
    console.log("rs", rs);
    return rs;
  } catch (error) {
    console.log("error in binance Request", error);
  }
};

const useBinanceFetch = (initParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [params, setParams] = useState(initParams);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("useBinanceFetch", params);
    const fetchData = async () => {
      setIsLoading(true);
      console.log("isLoading", isLoading);
      try {
        const result = await binanceRequest("/api/v3/order", params, "GET");
        console.log("result", result);
        setData(result);
      } catch (error) {
        console.log("error", error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    if (params) {
      fetchData();
    }
  }, [params]);

  return [{ isLoading, isError, data }, setParams];
};

export default useBinanceFetch;
