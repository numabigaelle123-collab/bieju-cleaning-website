
document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const form = document.getElementById("quoteForm");
const modal = document.getElementById("modal");
const output = document.getElementById("messageOutput");
const closeBtn = document.getElementById("modalClose");
const copyBtn = document.getElementById("copyBtn");
const copyStatus = document.getElementById("copyStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const message =
`Hello BIEJU Cleaning Services,

My name is ${data.get("name")}.
Phone: ${data.get("phone")}
Email: ${data.get("email") || "Not provided"}
City / ZIP: ${data.get("location")}
Service requested: ${data.get("service")}

Details:
${data.get("details") || "No additional details provided."}

I would like a cleaning quote. Thank you.`;

  output.value = message;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  copyStatus.textContent = "";
}

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    copyStatus.textContent = "Copied! You can paste it into a text, email, or DM.";
  } catch {
    output.select();
    document.execCommand("copy");
    copyStatus.textContent = "Copied.";
  }
});
