// Convert Milliseconds to minutes and seconds
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Get Video ID
function YouTubeGetID(link) {
  var ID = "";
  link = link
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (link[2] !== undefined) {
    ID = link[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = link;
  }
  return ID;
}

async function getVideoAPI(videoID, options) {
  const res = await fetch(
    `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoID}`,
    options
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error("Bad Request");
  }
}

export { millisToMinutesAndSeconds, YouTubeGetID, getVideoAPI };
