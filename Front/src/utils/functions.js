export function showData(data) {
  console.log(data);
  const resElement = document.querySelector("#response")
  resElement.textContent = ""
  const responseContainer = document.createElement("div")
  responseContainer.classList.add("response")
  

  switch (data.status) {
    case "Success":
        responseContainer.classList.add("success")
        localStorage.setItem("userData", JSON.stringify(data.userData))
        responseContainer.textContent =  `Bienvenido ${data.userData.name}, eres ${data.userData.role}`
      break;
    case "Failed":
        responseContainer.classList.add("failed")
        responseContainer.textContent = data.message
      break;
  }
  resElement.appendChild(responseContainer);
}
