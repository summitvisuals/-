const ADMIN_CODE = "29399";

const SUPABASE_URL = "https://toiiahcerainrtudyzzl.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaWlhaGNlcmFpbnJ0dWR5enpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTY3OTksImV4cCI6MjA5NTU5Mjc5OX0.nht4Pu64jPTj1rCsAuCBUWdQxplt28i_W6AxbaekoHs";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const gallery = document.getElementById("gallery");

const adminBtn = document.getElementById("adminBtn");

const adminPanel = document.getElementById("adminPanel");

const closeAdmin = document.getElementById("closeAdmin");

const uploadBtn = document.getElementById("uploadBtn");

const closeViewer = document.getElementById("closeViewer");

const imageViewer = document.getElementById("imageViewer");

const viewerImage = document.getElementById("viewerImage");

const viewerTitle = document.getElementById("viewerTitle");

const announcementBar = document.getElementById("announcementBar");

const announcementText = document.getElementById("announcementText");

const saveAnnouncement = document.getElementById("saveAnnouncement");

const deleteAnnouncement = document.getElementById("deleteAnnouncement");

adminBtn.addEventListener("click", () => {

  const code = prompt("Enter Admin Code");

  if (code === ADMIN_CODE) {

    adminPanel.classList.remove("hidden");

  }

});

closeAdmin.addEventListener("click", () => {

  adminPanel.classList.add("hidden");

});

closeViewer.addEventListener("click", () => {

  imageViewer.classList.add("hidden");

});

async function loadImages() {

  const { data } = await supabaseClient
    .from("images")
    .select("*");

  gallery.innerHTML = "";

  data.forEach((image) => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${image.image_url}">
      <h3>${image.title}</h3>
      <button class="deleteBtn">Delete</button>
    `;

    const img = card.querySelector("img");

    img.addEventListener("click", () => {

      viewerImage.src = image.image_url;

      viewerTitle.textContent = image.title;

      imageViewer.classList.remove("hidden");

    });

    const deleteBtn = card.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", async () => {

      const code = prompt("Admin Code");

      if (code !== ADMIN_CODE) return;

      await supabaseClient
        .from("images")
        .delete()
        .eq("id", image.id);

      loadImages();

    });

    gallery.appendChild(card);

  });

}

loadImages();

uploadBtn.addEventListener("click", async () => {

  const file = document.getElementById("imageUpload").files[0];

  const title = document.getElementById("imageTitle").value;

  if (!file || !title) return;

  const fileName = Date.now() + "-" + file.name;

  await supabaseClient.storage
    .from("gallery")
    .upload(fileName, file);

  const { data } = supabaseClient.storage
    .from("gallery")
    .getPublicUrl(fileName);

  await supabaseClient
    .from("images")
    .insert([
      {
        title: title,
        image_url: data.publicUrl
      }
    ]);

  loadImages();

});

saveAnnouncement.addEventListener("click", async () => {

  const text = document.getElementById("announcementInput").value;

  await supabaseClient
    .from("announcements")
    .delete()
    .neq("id", 0);

  await supabaseClient
    .from("announcements")
    .insert([
      {
        text: text
      }
    ]);

  loadAnnouncement();

});

deleteAnnouncement.addEventListener("click", async () => {

  await supabaseClient
    .from("announcements")
    .delete()
    .neq("id", 0);

  announcementBar.classList.add("hidden");

});

async function loadAnnouncement() {

  const { data } = await supabaseClient
    .from("announcements")
    .select("*")
    .limit(1);

  if (data.length > 0) {

    announcementText.textContent = data[0].text;

    announcementBar.classList.remove("hidden");

  }

}

loadAnnouncement();
