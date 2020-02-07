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
