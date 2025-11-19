import "./style.css";
import { showData } from "./utils/functions";

const form = document.querySelector("#loguearUser");

async function getData(email, pass) {
  try {
    const url = "http://localhost:3000/login";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pass
      }),
    });
    if (!res.ok) throw new Error("Fallo al realizar la peticion");
    const response = await res.json();
    showData(response) 
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.querySelector("#emailInput");
  const passInput = document.querySelector("#passInput");

  const email = emailInput.value;
  const pass = passInput.value;

  getData(email, pass);
});
