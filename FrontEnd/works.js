// Function to generate the gallery
async function generateGallery(){

    // Fetching the pictures from the API
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    // Fetching DOM element which contain all works
    const gallerySection = document.querySelector(".gallery");
    
    for (let i = 0; i < works.length; i++) {

        const work = works[i];
        
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
};

//Filters function
async function workFilters() {
    const response = await fetch("http://localhost:5678/api/categories");
    const filters = await response.json();
    // Fetching DOM element which contain all filters
    const filtersSection = document.querySelector(".filters");

    //Creating all button
    const buttonAll = document.createElement("button");
    buttonAll.className = "button all_button";
    buttonAll.textContent = "Tous";

    filtersSection.appendChild(buttonAll);

    //Creating categories buttons
    for (let i = 0; i < filters.length; i++) {

        const filter = filters[i];
        
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
  
generateGallery();
workFilters();
