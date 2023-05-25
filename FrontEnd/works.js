// Function to generate the gallery
async function generateGallery(){

    // Fetching the pictures from the API
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    console.log(works);
    for (let i = 0; i < works.length; i++) {

        const work = works[i];
        // Fetching DOM element which contain all works
        const gallerySection = document.querySelector(".gallery");
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
  
generateGallery();