const ADMIN_CODE = "29399";

const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const uploadBtn = document.getElementById("uploadBtn");
const gallery = document.getElementById("gallery");

let images = JSON.parse(localStorage.getItem("galleryImages")) || [];

function renderGallery() {
  gallery.innerHTML = "";

  images.forEach((image) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${image.src}" alt="${image.title}">
      <h3>${image.title}</h3>
    `;

    gallery.appendChild(card);
  });
}

renderGallery();

adminBtn.addEventListener("click", () => {
  const code = prompt("Enter Admin Code");

  if (code === ADMIN_CODE) {
    adminPanel.classList.remove("hidden");
  } else {
    alert("Wrong code");
  }
});

uploadBtn.addEventListener("click", () => {
  const file = document.getElementById("imageUpload").files[0];
  const title = document.getElementById("imageTitle").value;

  if (!file || !title) {
    alert("Add image and title");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    images.push({
      src: e.target.result,
      title: title
    });

    localStorage.setItem("galleryImages", JSON.stringify(images));

    renderGallery();

    document.getElementById("imageUpload").value = "";
    document.getElementById("imageTitle").value = "";
  };

  reader.readAsDataURL(file);
});
