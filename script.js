const ADMIN_CODE = "29399";

const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const closeAdmin = document.getElementById("closeAdmin");

const uploadBtn = document.getElementById("uploadBtn");
const gallery = document.getElementById("gallery");

const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerTitle = document.getElementById("viewerTitle");
const closeViewer = document.getElementById("closeViewer");

const announcementBar = document.getElementById("announcementBar");
const announcementText = document.getElementById("announcementText");

const announcementInput = document.getElementById("announcementInput");

const saveAnnouncement = document.getElementById("saveAnnouncement");

const deleteAnnouncement = document.getElementById("deleteAnnouncement");

let images = JSON.parse(localStorage.getItem("galleryImages")) || [];

function renderGallery() {

  gallery.innerHTML = "";

  images.forEach((image, index) => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${image.src}">
      <h3>${image.title}</h3>
      <button class="deleteBtn">Delete</button>
    `;

    const imageElement = card.querySelector("img");

    imageElement.addEventListener("click", () => {

      viewerImage.src = image.src;

      viewerTitle.textContent = image.title;

      imageViewer.classList.remove("hidden");

    });

    const deleteBtn = card.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", () => {

      const code = prompt("Enter Admin Code");

      if (code !== ADMIN_CODE) {

        alert("Wrong code");

        return;

      }

      images.splice(index, 1);

      localStorage.setItem("galleryImages", JSON.stringify(images));

      renderGallery();

    });

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

closeAdmin.addEventListener("click", () => {

  adminPanel.classList.add("hidden");

});

closeViewer.addEventListener("click", () => {

  imageViewer.classList.add("hidden");

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

saveAnnouncement.addEventListener("click", () => {

  const text = announcementInput.value;

  if (!text) return;

  localStorage.setItem("announcement", text);

  announcementText.textContent = text;

  announcementBar.classList.remove("hidden");

});

deleteAnnouncement.addEventListener("click", () => {

  localStorage.removeItem("announcement");

  announcementBar.classList.add("hidden");

});

const savedAnnouncement = localStorage.getItem("announcement");

if (savedAnnouncement) {

  announcementText.textContent = savedAnnouncement;

  announcementBar.classList.remove("hidden");

}
