import { getCategories, getWorks } from "./api.js";
import { categoriesSelector, generateModalGallery, addWork, resetForm, trashButton, openModal } from "./modal.js";

let filteredWorks = [];
let categories = [];
let filterCategory = "all";

// Function to generate the gallery
export async function generateGallery() {

  // Fetching DOM element which contain all works
  const gallerySection = document.querySelector(".gallery");
  gallerySection.innerHTML = "";

  for (let i = 0; i < filteredWorks.length; i++) {

    const work = filteredWorks[i];

    // Creating the figure element wich contain the picture and the legend
    const workElement = document.createElement("figure");
    workElement.dataset.workId = work.id;
    // Creating the img element for the picture
    const pictureElement = document.createElement("img");
    pictureElement.src = work.imageUrl;
    pictureElement.alt = work.title;
    // Creating figcaption element for picture legend
    const textElement = document.createElement("figcaption");
    textElement.innerText = work.title;

    gallerySection.appendChild(workElement);
    workElement.appendChild(pictureElement);
    workElement.appendChild(textElement);
  }
}

// Add event listener on all filter buttons
async function addButtonsEvents() {
  const btns = document.querySelectorAll(".button");
  let clickEvent = (event) => {
    // Changing the color onclick
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove("button_selected");
    }
    event.target.classList.add("button_selected");
    filterCategory = event.target.dataset.id;
    filterWorks(filterCategory);
  }
  btns.forEach((item) => {
    item.addEventListener("click", clickEvent)
  })
}

// Function to filter the gallery
async function filterWorks(categoryId) {
  let works = JSON.parse(window.localStorage.getItem("works"));
  if (categoryId === "all") {
    filteredWorks = works;
  } else {
    filteredWorks = works.filter(
      (work) => work.categoryId === parseInt(categoryId)
    );
  }
  generateGallery();

}

// Generating filter buttons
async function generateFilterButtons() {
  // Fetching DOM element which contain all filters
  const filtersSection = document.querySelector(".filters");

  //Creating all button
  const buttonAll = document.createElement("button");
  buttonAll.className = "button all_button button_selected";
  buttonAll.textContent = "Tous";
  buttonAll.dataset.id = "all";

  filtersSection.appendChild(buttonAll);

  //Creating categories buttons
  for (let i = 0; i < categories.length; i++) {

    const filter = categories[i];

    // Creating the button element
    const buttonElement = document.createElement("button");
    buttonElement.className = "button";
    buttonElement.dataset.id = filter.id;
    buttonElement.textContent = filter.name;

    filtersSection.appendChild(buttonElement);
  }
};

// Show the edition mode when the user is connected
function editionMode() {
  //Get token from local storage
  const token = window.localStorage.getItem("token");
  if (token == null) {
    return
  }
  const editElements = document.querySelectorAll(".edit");
  const loginLink = document.querySelector("#login");

  editElements.forEach((item) => {
    item.classList.remove("hidden")
  })
  loginLink.classList.add("hidden")
}

// Hide the edition mode
function editionModeOff() {
  const logoutButton = document.querySelector("#logout");

  logoutButton.addEventListener('click', function () {
    window.localStorage.removeItem("token");
  })
}

// Event listener on every element with the class "js-modal"
document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', function (event) {
    openModal(event);
    deleteWorks();
  })
})

// Add picture in the modal
function addPicture() {
  // Get submit button
  const submit = document.querySelector(".submit-img");
  // Add event listener
  submit.addEventListener('click', async function () {
    // Calling the function to send the form
    let response = await addWork();
    // If error, the function stops
    if (!response.ok) {
      document.querySelector(".form-error-msg").classList.remove("hidden");
      return;
    }
    // Else, get works from local storage
    let works = JSON.parse(window.localStorage.getItem("works"));
    // Convert addWork response from JSON to an object
    const data = await response.json();
    // Convert string to int
    data.categoryId = parseInt(data.categoryId);
    // Add project data to project list
    works.push(data);
    // Update project list in local storage
    window.localStorage.setItem('works', JSON.stringify(works));
    // Clean all inputs
    resetForm();
    document.querySelector(".form-error-msg").classList.add("hidden");
    // 
    filterWorks(filterCategory);
    // Generate new gallery
    generateGallery();
    // Generate new modal gallery
    generateModalGallery(works);
    deleteWorks();
  })
}

function deleteWorks() {
  // For each trash icon
  document.querySelectorAll(".trash-icon").forEach((item) => {
    // Add event listener
    item.addEventListener('click', async function () {
      let response = await trashButton(item);
      const workId = item.parentElement.dataset.workId;
      // If error, function stops
      if (!response.ok) {
        return;
      }
      // Else, get works from local storage
      let works = JSON.parse(window.localStorage.getItem("works"));
      works = works.filter(
        (work) => work.id !== parseInt(workId)
      )
      // Update project list in local storage
      window.localStorage.setItem('works', JSON.stringify(works));

      filterWorks(filterCategory);
      // Generate new gallery
      generateGallery();
      // Generate new modal gallery
      generateModalGallery(works);
      deleteWorks();
    })
  })
}


async function main() {

  editionMode()
  editionModeOff()

  categories = await getCategories();

  const works = await getWorks();
  window.localStorage.setItem('works', JSON.stringify(works));
  filteredWorks = works;

  generateGallery();

  await generateFilterButtons();

  addButtonsEvents();

  categoriesSelector(categories);

  addPicture()

  deleteWorks()

}

main();
