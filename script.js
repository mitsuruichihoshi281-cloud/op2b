const students = Array.from({length: 30}, (_, i) => ({
  number: i + 1,
  name: `Төгсөгч ${String(i + 1).padStart(2, "0")}`,
  image: `student${String(i + 1).padStart(2, "0")}.jpg`
}));

const grid = document.getElementById("studentGrid");

students.forEach(student => {
  const card = document.createElement("article");
  card.className = "student-card";
  card.innerHTML = `
    <img class="student-photo" src="${student.image}" alt="${student.name}"
         onerror="this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
           `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="42" fill="#64748b">ЗУРАГ ${student.number}</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="#94a3b8">student${String(student.number).padStart(2,"0")}.jpg</text></svg>`
         )}'">
    <div class="student-info">
      <div class="student-no">№ ${String(student.number).padStart(2, "0")}</div>
      <div class="student-name">${student.name}</div>
    </div>`;
  grid.appendChild(card);
});

let current = 0;
const slideImage = document.getElementById("slideImage");
const slideCaption = document.getElementById("slideCaption");
const dots = document.getElementById("dots");

students.forEach((student, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.setAttribute("aria-label", `${i + 1}-р зураг`);
  dot.addEventListener("click", () => showSlide(i));
  dots.appendChild(dot);
});

function showSlide(index) {
  current = (index + students.length) % students.length;
  const student = students[current];
  slideImage.src = student.image;
  slideImage.alt = student.name;
  slideCaption.textContent = `${student.number}. ${student.name}`;
  slideImage.onerror = () => {
    slideImage.onerror = null;
    slideImage.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700"><rect width="100%" height="100%" fill="#172033"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="56" fill="white">Дурсамжийн зураг ${student.number}</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="26" fill="#cbd5e1">student${String(student.number).padStart(2,"0")}.jpg</text></svg>`
    )}`;
  };
  [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
}

document.querySelector(".prev").addEventListener("click", () => showSlide(current - 1));
document.querySelector(".next").addEventListener("click", () => showSlide(current + 1));

showSlide(0);

setInterval(() => showSlide(current + 1), 5000);

document.getElementById("year").textContent = new Date().getFullYear();
