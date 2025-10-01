const items = document.querySelectorAll(".accordion-item");

items.forEach(item => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    item.classList.toggle("active");

    // Close other open items
    items.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });
  });
});
