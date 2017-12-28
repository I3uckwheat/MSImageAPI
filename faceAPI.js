const APIKey = "30341e7fca68433ca4b17627450ca5f9";
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
    .then(response => {return response.json()})
    .then(appendAttributes)
    .catch(error => console.log(error));
}

function appendAttributes(attributes) {
  const attributesDiv = document.getElementById("attributes");
  attributesDiv.innerHTML = "";

  const age = document.createElement('p')
  age.textContent = attributes[0].faceAttributes.age

  const gender = document.createElement('p')
  gender.textContent = attributes[0].faceAttributes.gender

  attributesDiv.appendChild(age);
  attributesDiv.appendChild(gender);

}
