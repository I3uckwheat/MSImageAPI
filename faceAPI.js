const APIKey = "30341e7fca68433ca4b17627450ca5f9";
const faceIDLink = "https://westusff.api.cognitive.microsoft.com/face/v1.0/detect"

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
    body: reqBody
    // body: JSON.stringify(reqBody)
  }

  const request = new Request(faceIDLink, initObj)

}
