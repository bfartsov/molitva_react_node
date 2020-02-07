export const short = date => {
  let dateArr = date.split(" ");
  let month = dateArr[1]
    .split("")
    .slice(0, 4)
    .join("");
  let shortDate = `${dateArr[0]} ${month}.`;
  return shortDate;
};

export const dateCorrection = events => {
  events.map(event => {
    const bgMonth = [
      "януари",
      "февруари",
      "март",
      "април",
      "май",
      "юни",
      "юли",
      "август",
      "септември",
      "октомври",
      "ноември",
      "декември"
    ];
    const newDate = new Date(event.date);
    const month = newDate.getMonth();
    const bgDate = `${newDate.getUTCDate()} ${
      bgMonth[month]
    } ${newDate.getFullYear()}`;
    event.date = bgDate;
    event.shortD = short(event.date);
  });
};
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
    if (type === "events") {
      dateCorrection(data);

      return cb(data);
    }
    cb(data);
  } catch (error) {
    console.log(error);
  }
};
