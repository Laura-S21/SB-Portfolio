let works = [];
let filteredWorks = [];
let categories = [];

async function getGategories() {
    // Fetching the categories from the API
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    return data;
}

async function getWorks() {
    // Fetching the pictures from the API
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
}

// Function to generate the filters
async function generateCategories(categories){
    // Fetching DOM element which contain all works
    const categoriesSection = document.querySelector(".filters");
    categoriesSection.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        // on genere les filtres
    }
};

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
    let clickEvent = () => {
        console.log("working event listener")
    }
    btns.forEach((item) => {
        item.addEventListener("click", clickEvent)
    })
}

//async function filterWorks(category) {
async function filterWorks() {
    console.log("boutonfiltre");
    /*filteredWorks = []

    for(let i = 0; i < works.length; i++) {
        const work = works[i]

        if(work.name === category) {
            filteredWorks.push(work);
        }
    }

    generateGallery();*/

}

// Generating filter buttons
async function generateFilterButtons() {
    // Fetching DOM element which contain all filters
    const filtersSection = document.querySelector(".filters");

    //Creating all button
    const buttonAll = document.createElement("button");
    buttonAll.className = "button all_button";
    buttonAll.textContent = "Tous";

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
    //Changing the color of the active button
    const buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        
        buttons[i].addEventListener("click", function(event) {
            const buttons = document.getElementsByClassName("button_selected");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove("button_selected");
            }
            event.target.classList.add("button_selected");  
        });
    }
};

async function main () {
    categories = await getGategories();

    await generateCategories();
    
    works = await getWorks();
    filteredWorks = works;

    generateGallery();

    generateFilterButtons();

    addButtonsEvents();

    

}

main();
