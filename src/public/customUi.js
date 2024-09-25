let buttonsAdded = false;

const buttonConfigs = [
  {
    text: "Login",
    action: () => {
      console.log("Login Button Clicked!");
      window.location.href = "http://localhost:3000/authorize?response_type=code";
    },
    position: { top: "275px", right: "150px" },
  },
  {
    text: "Logout",
    action: () => {
      console.log("Logout Button Clicked!");
      window.location.href = "http://localhost:3000/logout";
    },
    position: { top: "275px", right: "70px" },
  },
];

const addButtons = () => {
  if (buttonsAdded) return;

  const targetElement = document.querySelector(".swagger-ui .scheme-container");
  if (targetElement) {
    buttonConfigs.forEach(config => {
      const button = document.createElement("button");
      button.innerText = config.text;
      button.style.position = "absolute";
      button.style.top = config.position.top;
      button.style.right = config.position.right;
      button.style.padding = "8px";

      button.onclick = config.action;

      targetElement.appendChild(button);
    });

    buttonsAdded = true;
  } else {
    console.log("Topbar not found. Retrying...");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    addButtons();
  }, 100);
});