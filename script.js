// Replace this with your actual Web App URL from Apps Script deployment
const API_URL = "https://script.google.com/macros/s/AKfycbwzCEaGrNiAuT1qdW5Hw45jJMpvB8JdNm4xVEHzaijf66ZeWd_VV6WVuIFCE_idQF-_qg/exec "; 

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lostFoundForm");
  const itemsList = document.getElementById("itemsList");

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Gather form data
    const data = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      location: document.getElementById("location").value,
      status: document.getElementById("status").value,
    };

    // Send POST request to Apps Script
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      alert(result.message || "Item added!");

      // Reset form
      form.reset();

      // Reload items
      loadItems();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add item.");
    }
  });

  // Function to fetch items (GET request)
  async function loadItems() {
    itemsList.innerHTML = "Loading...";

    try {
      const response = await fetch(API_URL); // doGet
      const data = await response.json();

      itemsList.innerHTML = "";
      data.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${item.title}</strong> 
          <br> ${item.description}
          <br> Category: ${item.category} | Location: ${item.location} | Status: ${item.status}
        `;
        itemsList.appendChild(li);
      });
    } catch (err) {
      console.error("Error fetching items:", err);
      itemsList.innerHTML = "Error loading items!";
    }
  }

  // Load items on page load
  loadItems();
});
