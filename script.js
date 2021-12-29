const logoEl = document.getElementById("logo");
const inputDivEl = document.getElementById("username-div");
const inputEl = document.getElementById("username-input");
const resultBtn = document.getElementById("result-btn");
const pfpEl = document.getElementById("pfp");
const displayName = document.getElementById("name");
const displayUsername = document.getElementById("username-display");
const displayBio = document.getElementById("bio");
const twitterBtn = document.getElementById("twitter");
const instaBtn = document.getElementById("insta");

instaBtn.addEventListener("click", instaInfo);
twitterBtn.addEventListener("click", twitterInfo);
logoEl.addEventListener("click", () => {
  location.reload();
});

function twitterInfo() {
  const inputVal = inputEl.value;
  const data = JSON.stringify([inputVal]);

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      inputDivEl.style.display = "none";
      twitterBtn.style.display = "none";
      instaBtn.style.display = "none";

      let json = JSON.parse(this.responseText);
      displayName.innerHTML = json.data[0].name;

      pfpEl.src = json.data[0].profile_image_url_https.replace("_normal", "");
      displayUsername.innerHTML = "@" + json.data[0].screen_name;
      displayBio.innerHTML = json.data[0].description;

      pfpEl.style.border = "3px solid #49e376";
    }
  });

  xhr.open(
    "POST",
    "https://twitter-user-profile-data.p.rapidapi.com/v1/api/twitter"
  );
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader(
    "x-rapidapi-host",
    "twitter-user-profile-data.p.rapidapi.com"
  );
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "d06597e9e2msh79753a6bd01ce6ap105686jsnf67fb43af5df"
  );

  xhr.send(data);
}

function instaInfo() {
  const data = null
  const inputVal = inputEl.value;
  const igUsername = inputVal;

  const xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      inputDivEl.style.display = "none";
      twitterBtn.style.display = "none";
      instaBtn.style.display = "none";

      let json = JSON.parse(this.responseText);
      displayName.innerHTML = json[0].full_name;
      pfpEl.src = json[0].profile_pic_url

      console.log(pfpEl.src)
      displayUsername.innerHTML = "@" + json[0].username;
      displayBio.innerHTML = json[0].biography;

      pfpEl.style.border = "3px solid #49e376";
    }
  });

  xhr.open(
    "GET",
    `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${igUsername}&response_type=short&corsEnabled=false`
  );
  xhr.setRequestHeader("ig", `${igUsername}`);
  xhr.setRequestHeader(
    "x-rapidapi-host",
    "instagram-bulk-profile-scrapper.p.rapidapi.com"
  );
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "d06597e9e2msh79753a6bd01ce6ap105686jsnf67fb43af5df"
  );

  xhr.send(data);
}
