import { YouTubeGetID, millisToMinutesAndSeconds } from "./functions.js";

const link = document.getElementById("link-input");
const downloadBtn = document.getElementById("download-button");
const downloadBox = document.getElementById("download-box");
const title = document.getElementById("title");
const duration = document.getElementById("duration");
const downloadMp3Btn = document.getElementById("download-mp3-button");
const isLoading = document.getElementById("loading");
const alertBox = document.getElementById("alert");
const failedBox = document.getElementById("warning");
const progress = document.querySelector("#progress");
const progressBar = document.getElementById("progressBar");

let progressStatus = 0;

function getVideo() {
  // Check for Video ID
  const videoID = YouTubeGetID(link.value);

  if (link.value === "" || videoID.length < 5) {
    console.log("Invalid Video ID");
    alertBox.classList.remove("d-none");
    setTimeout(function () {
      alertBox.classList.add("d-none");
      //link.value = link.trim();
    }, 5000);

    //if link input contains white space set to empty
  } else {
    downloadBox.classList.add("d-none");
    downloadBtn.classList.add("disabled");
    downloadBtn.innerText = "Processing...";
    link.setAttribute("disabled", "");
    downloadBtn.classList.add("d-block");
    progress.classList.remove("d-none");
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
        switch (response.status) {
          case "ok":
            progressBar.style.width = "100%";
            progressBar.innerHTML = "100%";
            downloadBtn.innerText = "Download";
            downloadBtn.classList.remove("disabled");
            link.classList.remove("disabled");
            link.removeAttribute("disabled", "");
            link.value = "";
            downloadBox.classList.remove("d-none");
            title.innerText = response.title;
            // duration.innerText = millisToMinutesAndSeconds(response.duration);
            downloadMp3Btn.setAttribute("href", response.link);
            break;
          case "processing":
            progressStatus = response.progress;
            progressBar.style.width = `${progressStatus}%`;
            progressBar.innerHTML = `${progressStatus}%`;

            setTimeout(getVideo, 1000);
            break;
          default:
            downloadBtn.innerText = "Download";
            downloadBtn.classList.remove("disabled");
            link.classList.remove("disabled");
            link.removeAttribute("disabled", "");
            failedBox.classList.remove("d-none");
            setTimeout(function () {
              failedBox.classList.add("d-none");
            }, 6000);
        }
      })
      .catch((err) => console.log(err));
  }
}

downloadBtn.addEventListener("click", getVideo);

link.addEventListener("input", getVideo);

// console.log(response);
// console.log(response.status);
// downloadBtn.innerText = "Download";
// downloadBtn.classList.remove("disabled");
// link.classList.remove("disabled");
// link.removeAttribute("disabled", "");
// link.value = "";
// downloadBox.classList.remove("display-none");
// title.innerText = response.title;
// // duration.innerText = millisToMinutesAndSeconds(response.duration);
// downloadMp3Btn.setAttribute("href", response.link);
