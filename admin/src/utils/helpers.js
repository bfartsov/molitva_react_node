export const fetchData = async (url, cb, type) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    cb(data);
  } catch (error) {
    console.log(error);
  }
};
