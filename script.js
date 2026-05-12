const form = document.getElementById("volunteerForm");
const response = document.getElementById("response");
const countElement = document.getElementById("count");
const storageKey = "volunteerRegistration";
const countKey = "volunteerCount";

function getVolunteerCount() {
  return Number(localStorage.getItem(countKey) || "0");
}

function updateCountDisplay() {
  countElement.textContent = getVolunteerCount();
}

function showMessage(message) {
  response.textContent = message;
  response.hidden = false;
}

function loadRegistration() {
  const registration = localStorage.getItem(storageKey);
  if (!registration) {
    return;
  }

  const data = JSON.parse(registration);
  showMessage(`Obrigado, ${data.name}! Sua inscrição como voluntário para apoiar moradores de rua já está registrada. Você escolheu: ${data.role}.`);
  form.style.display = "none";
}

function saveRegistration(data) {
  const existing = localStorage.getItem(storageKey);
  if (!existing) {
    localStorage.setItem(countKey, String(getVolunteerCount() + 1));
  }
  localStorage.setItem(storageKey, JSON.stringify(data));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const volunteer = {
    name: formData.get("name").trim(),
    age: formData.get("age"),
    email: formData.get("email").trim(),
    role: formData.get("role"),
    registeredAt: new Date().toISOString(),
  };

  saveRegistration(volunteer);
  updateCountDisplay();
  showMessage(`Inscrição recebida! Obrigado, ${volunteer.name}. Em breve enviaremos informações sobre a ação no dia 20 de junho de 2026.`);
  form.reset();
  form.style.display = "none";
});

window.addEventListener("load", () => {
  updateCountDisplay();
  loadRegistration();
});