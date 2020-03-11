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

export const tableInfo = data => {
  let title = {};
  let items = [];
  if (data.length > 0) {
    data.forEach(video => {
      const item = {
        id: video._id,
        title: video.title,
        description: video.description,
        img: video.img,
        video: video.video,
        date: video.date,
        feature: video.feature
      };
      items.push(item);
    });
  }
  items.length > 0 ? (title = Object.keys(items[0])) : (title = {});
  return { title, items };
};
