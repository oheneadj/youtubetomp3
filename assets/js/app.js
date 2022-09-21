import { YouTubeGetID, millisToMinutesAndSeconds } from "./functions.js";

const link = document.getElementById("link-input");
const downloadBtn = document.getElementById("download-button");
const downloadBox = document.getElementById("download-box");
const title = document.getElementById("title");
const duration = document.getElementById("duration");
const downloadMp3Btn = document.getElementById("download-mp3-button");
const isLoading = document.getElementById("loading");

downloadBtn.addEventListener("click", () => {
  // Check for Video ID
  const videoID = YouTubeGetID(link.value);

  if (link.value === "" || videoID.length < 5) {
    console.log("Invalid Video ID");
  } else {
    downloadBtn.innerText = "Processing...";
    isLoading.classList.remove("no-display");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8b17e9f042mshf2c05bade66a115p1db1aejsn144a6b7f71a5",
        "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
      },
    };

    fetch(
      `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoID}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        downloadBox.classList.remove("display-none");
        title.innerText = response.title;
        duration.innerText = millisToMinutesAndSeconds(response.duration);
        downloadMp3Btn.setAttribute("href", response.link);
      })
      .catch((err) => console.error(err));

    link.addEventListener("input", () => {
      console.log(link.value);
    });
  }
});
