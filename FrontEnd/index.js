import { getGategories, getWorks } from "./api.js";
import {} from "./modal.js";

let works = [];
let filteredWorks = [];
let categories = [];

// Function to generate the gallery
async function generateGallery() {

    // Fetching DOM element which contain all works
    const gallerySection = document.querySelector(".gallery");
    gallerySection.innerHTML = "";
    
    for (let i = 0; i <filteredWorks.length; i++) {

        const work = filteredWorks[i];
        
        // Creating the figure element wich contain the picture and the legend
        const workElement = document.createElement("figure");
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
          const categoryId = event.target.dataset.id;
          filterWorks(categoryId);
    }
    btns.forEach((item) => {
        item.addEventListener("click", clickEvent)
    })
}

// Function to filter the gallery
async function filterWorks(categoryId) {
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
    buttonAll.className = "button all_button";
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

async function main () {
    categories = await getGategories();
    
    works = await getWorks();
    filteredWorks = works;

    generateGallery();

    await generateFilterButtons();

    addButtonsEvents();

}

main();
