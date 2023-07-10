const axios = require("axios")

async function fetchData(query) {

  const options = {
    method: "GET",
    url: "https://real-time-finance-data.p.rapidapi.com/search",
    params: {
      query: query,
      language: "en",
    },
    headers: {
      "X-RapidAPI-key": "12f92d3839msh961610ba10a33b5p14a820jsn5b46fba777e1",
      "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
    },
  };
  try {
    const response = await axios(options);
    return response
  } catch (error) {
    console.error(error);
  }
}


module.exports = fetchData;
