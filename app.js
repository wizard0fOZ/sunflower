const garden = document.getElementById("garden");
const notes = document.getElementById("notes");
const encourageBtn = document.getElementById("encourageBtn");
const card = document.querySelector(".card");

const messages = [
  "One breath. One sip of water. One step. That is enough for now.",
  "You are allowed to rest and still be strong.",
  "Hard days do not erase how far you have already come.",
  "The sun still finds sunflowers, even after cloudy mornings.",
  "Just a reminder, you’re pretty amazing.",
  "You’ve got this, even if it doesn’t feel like it right now.",
  "There is softness waiting for you on the other side of this moment.",
  "You are deeply worthy of gentleness, especially from yourself.",
  "I'll always be your go-to chai partner, no questions asked.",
  "You deserve a bit of peace and a lot of smiles.",
];

const flowerLimit = 12;
const noteLimit = 8;
let introDismissed = false;

function sunflowerMarkup() {
  return `
    <div class="sunflower__stem"></div>
    <div class="sunflower__leaf sunflower__leaf--left"></div>
    <div class="sunflower__leaf sunflower__leaf--right"></div>
    <div class="sunflower__bloom">
      ${Array.from({ length: 12 }, (_, i) => (
        `<span class="sunflower__petal" style="--i: ${i};"></span>`
      )).join("")}
      <div class="sunflower__core"></div>
    </div>
  `;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomMessage() {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

function trimCollection(selector, limit) {
  const items = garden.querySelectorAll(selector);
  if (items.length <= limit) {
    return;
  }

  items[0].remove();
}

function showNote(xPercent) {
  const note = document.createElement("div");
  note.className = "encouragement";
  note.textContent = randomMessage();
  note.style.left = `${xPercent}%`;
  note.style.top = `${randomBetween(22, 48)}%`;
  notes.appendChild(note);
  trimCollection(".encouragement", noteLimit);

  window.setTimeout(() => {
    note.remove();
  }, 4800);
}

function plantSunflower(xPercent) {
  const flower = document.createElement("div");
  const scale = randomBetween(0.52, 0.88).toFixed(2);
  const delay = randomBetween(0, 0.28).toFixed(2);

  flower.className = "sunflower";
  flower.innerHTML = sunflowerMarkup();
  flower.style.setProperty("--x", `${xPercent}%`);
  flower.style.setProperty("--scale", scale);
  flower.style.setProperty("--delay", `${delay}s`);
  flower.style.zIndex = String(Math.round(10 + Number(scale) * 10));
  garden.appendChild(flower);

  trimCollection(".sunflower:not(.sunflower--hero)", flowerLimit);
}

function gardenPercentFromEvent(event) {
  const rect = garden.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  return Math.max(10, Math.min(90, x));
}

function plantBrightSpot(xPercent = randomBetween(15, 85)) {
  plantSunflower(xPercent);
  showNote(xPercent);
}

function dismissIntroCard() {
  if (introDismissed || !card) {
    return;
  }

  introDismissed = true;
  card.classList.add("card--dismissed");
  window.setTimeout(() => {
    card.hidden = true;
  }, 340);
}

encourageBtn.addEventListener("click", () => {
  dismissIntroCard();
  plantBrightSpot();
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".card")) {
    return;
  }

  dismissIntroCard();
  plantBrightSpot(gardenPercentFromEvent(event));
});

window.addEventListener("load", () => {
  window.setTimeout(() => showNote(50), 1300);
});
