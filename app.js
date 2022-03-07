const generateBtn = document.querySelector(".btn-gn");
const copyBtn = document.querySelector(".btn-copy");
// const input = document.getElementById("input");
let shortURLInput = document.getElementById("short-URL");
const inputURL = document.getElementById("input");

const link = "https://github.com/Meegod/Myshort/blob/master/app.js";

const API = "c0c260da7668d00d37ffb866494376610e14e703";

new ClipboardJS(".btn-copy");

generateBtn.addEventListener("click", shortenerURL);
copyBtn.addEventListener("click", () => {
   if (shortURLInput.value != "") {
      console.log(shortURLInput.value);
      alert("URL has been copied!");
   }
});

function shortenerURL() {
   let enterValue = document.querySelector("#input").value;
   console.log(enterValue);

   if (validURL(enterValue)) {
      inputURL.style.outline = "none";
      fetch("https://api-ssl.bitly.com/v4/shorten", {
         method: "POST",
         headers: {
            Authorization: API,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            long_url: enterValue,
            domain: "bit.ly",
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data.link);
            shortURLInput.value = data.link;
         });
   } else {
      // alert("Please input a valid url.");
      inputURL.style.outline = "red 1px solid";
   }
}

function validURL(str) {
   var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
         "(\\#[-a-z\\d_]*)?$",
      "i"
   ); // fragment locator
   return !!pattern.test(str);
}
