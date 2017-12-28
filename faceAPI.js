const APIKey = config.APIKey;
const faceIDLink = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender"

document.getElementById("analyze").addEventListener("click", analyze);

function analyze(){
  const reqBody = {
    "url" : document.getElementById("imageURL").value
  }

  const header = new Headers({
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key" : APIKey
  })

  const initObj = {
    method: 'POST',
    headers: header,
    mode: "cors",
    body: JSON.stringify(reqBody)
  }

  const request = new Request(faceIDLink, initObj)

  fetch(request)
    .then(response => {
      if(response.ok){
        return response.json()
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    })
    .then(response => {
      if(response.length === 0){
        return  Promise.reject(new Error("Bad Request"));
      } else {
        return response
      }
    })
    .then(displayAttributes)
    .catch(error => {
      alert(error);
      document.getElementById("attributes").innerHTML = "<p>No Face Detected</p>";
    });

    displayImage(reqBody["url"]);
}

function displayAttributes(attributes) {
  const attributesDiv = document.getElementById("attributes");
  attributesDiv.innerHTML = "";

  const age = document.createElement('p')
  age.textContent = attributes[0].faceAttributes.age

  const gender = document.createElement('p')
  gender.textContent = attributes[0].faceAttributes.gender

  attributesDiv.appendChild(age);
  attributesDiv.appendChild(gender);
}

function displayImage(url){
  document.getElementById("photo").setAttribute("src", url);
}
