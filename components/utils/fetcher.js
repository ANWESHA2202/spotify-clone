export const BASE_URL = "https://cms.samespace.com";

const fetcher = async (url, method = "GET", requestBody = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    let response;

    if (method.toLowerCase() === "get") {
      response = await fetch(`${BASE_URL}/${url}`, {
        headers,
      });
    } else {
      response = await fetch(`${BASE_URL}/${url}/`, {
        method: method,
        headers: headers,
        body: JSON.stringify(requestBody),
      });
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    const err = {
      errcode: 1,
      status: 500,
      data: error.message,
    };
    return err;
  }
};

export default fetcher;
