const api_key = "AIzaSyDg6GyWGv4wDA5jWz2OysFQghL93R2VN7U";

const container = document.getElementById("search_results");
const searchVideos = async () => {
  try {
    let inp = document.getElementById("search").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${inp}&key=${api_key}`
    );

    let data = await res.json();
    let video = data.items;
    appendVideos(video);
    console.log("data:-", data);
  } catch (error) {
    console.log("error:-", error);
  }
};

const appendVideos = (data) => {
  container.innerHTML = null;

  data.map((el) => {
    let div = document.createElement("div");
    div.setAttribute("id", "shd");

    let channelTitle = document.createElement("p");
    channelTitle.innerText = el.snippet.title;

    let iframe = document.createElement("img");
    iframe.setAttribute("id", "iframe");
    iframe.src = el.snippet.thumbnails.default.url;
    
    iframe.addEventListener("click", () => {
      localStorage.setItem("videoId", JSON.stringify(el));
      window.location.href = "video.html";
    });
    iframe.style.width = "100%";
    iframe.style.height = "60%";
    // iframe.allow = "fullscreen"

    div.append(iframe, channelTitle);

    container.append(div);
  });
};