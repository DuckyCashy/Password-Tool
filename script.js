document.addEventListener("DOMContentLoaded", () => {

  const genTab = document.getElementById("genTab");
  const testTab = document.getElementById("testTab");

  const generator = document.getElementById("generator");
  const tester = document.getElementById("tester");

  genTab.onclick = () => {
    generator.classList.add("active");
    tester.classList.remove("active");
    genTab.classList.add("active");
    testTab.classList.remove("active");
  };

  testTab.onclick = () => {
    tester.classList.add("active");
    generator.classList.remove("active");
    testTab.classList.add("active");
    genTab.classList.remove("active");
  };

  const settingsBtn = document.getElementById("settingsBtn");
  const popup = document.getElementById("settingsPopup");
  const closeSettings = document.getElementById("closeSettings");

  settingsBtn.onclick = () => popup.classList.remove("hidden");
  closeSettings.onclick = () => popup.classList.add("hidden");

  const lengthSlider = document.getElementById("length");
  const lengthValue = document.getElementById("lengthValue");

  function updateSlider() {
  let value = lengthSlider.value;
  let min = lengthSlider.min;
  let max = lengthSlider.max;

  let percent = ((value - min) / (max - min)) * 100;

  lengthSlider.style.background =
    `linear-gradient(90deg, #6c5ce7 ${percent}%, #222 ${percent}%)`;

  lengthValue.textContent = value;
}

lengthSlider.oninput = updateSlider;
updateSlider();

  const passwordBox = document.getElementById("password");
  const generateBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");

  const testInput = document.getElementById("testInput");
  const strengthText = document.getElementById("strength");
  const testStrength = document.getElementById("testStrength");

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";

  generateBtn.onclick = () => {
    let pool = "";

    if (document.getElementById("upper").checked) pool += upper;
    if (document.getElementById("lower").checked) pool += lower;
    if (document.getElementById("number").checked) pool += numbers;
    if (document.getElementById("symbol").checked) pool += symbols;

    if (pool === "") {
      alert("Select at least one option!");
      return;
    }

    let password = "";
    for (let i = 0; i < lengthSlider.value; i++) {
      password += pool[Math.floor(Math.random() * pool.length)];
    }

    passwordBox.value = password;
    checkStrength(password, strengthText);
  };

  copyBtn.onclick = () => {
    passwordBox.select();
    document.execCommand("copy");
  };

  function checkStrength(pw, el) {
    let score = 0;

    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) el.textContent = "Weak 🔴";
    else if (score <= 4) el.textContent = "Medium 🟡";
    else el.textContent = "Strong 🟢";
  }

  testInput.addEventListener("input", () => {
    checkStrength(testInput.value, testStrength);
  });

});