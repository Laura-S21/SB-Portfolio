import { getWorks } from "./api.js";

let modal = null;
let works = [];
let galleryWorks = [];

// API call to delete works
async function remWorks(workId) {
    const response = await fetch(`http://localhost:5678/api/works/${workId}` , {
         method: "DELETE",
         headers: { "Authorization": "Bearer "+window.localStorage.getItem("token")},
         body: {userId: window.localStorage.getItem("userId")} 
     });
     
     return response
 }


// Function to open the modal
export const openModal = function(event) {
    event.preventDefault()
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelectorAll('.js-close-modal').forEach((item) => {
        item.addEventListener('click', closeModal)
    })
    modal.querySelectorAll('.js-modal-stop').forEach((item) => {
        item.addEventListener('click', stopPropagation)
    })

    const firstPage = document.querySelector("#first-page");
    const secPage = document.querySelector("#sec-page");
    firstPage.classList.remove("hidden");
    secPage.classList.add("hidden");
}

// Function to close the modal
const closeModal = function(event) {
    if (modal === null) return
    event.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelectorAll('.js-close-modal').forEach((item) => {
        item.removeEventListener('click', closeModal)
    })
    modal.querySelectorAll('.js-modal-stop').forEach((item) => {
        item.removeEventListener('click', stopPropagation)
    })
    modal = null
}

// Function to prevent the closing of the modal when clicked
const stopPropagation = function(event) {
    event.stopPropagation()
}

// Event listener on every element with the class "js-modal"
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

// Generate modal gallery
function generateModalGallery() {
    const modalGallery = document.querySelector('#modal-gallery')

    for (let i = 0; i <galleryWorks.length; i++) {

        const work = galleryWorks[i];

        const modalWork = document.createElement("div");
        modalWork.className = "modal-work";
        modalWork.dataset.workId = work.id;

        const modalPicture = document.createElement("img");
        modalPicture.src = work.imageUrl;
        modalPicture.alt = work.title;
        modalPicture.className = "modal-img";
        
        const modalText = document.createElement("p");
        modalText.innerText = "éditer";
        modalText.className = "modal-text";

        const trashIcon = document.createElement("div");
        trashIcon.innerHTML = '<i class="fa-solid fa-trash-can" ></i>';
        trashIcon.className = "trash-icon";

        const resizeIcon = document.createElement("div");
        resizeIcon.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';
        resizeIcon.className = "resize-icon";

        modalGallery.appendChild(modalWork);
        modalWork.appendChild(modalPicture);
        modalWork.appendChild(modalText);
        modalWork.appendChild(trashIcon);
        modalWork.appendChild(resizeIcon);
}}

// Open the window to add pictures
function openAddPictureWindow() {
    const addButton = document.querySelector(".add-img");
    const firstPage = document.querySelector("#first-page");
    const secPage = document.querySelector("#sec-page");

    addButton.addEventListener('click', function() {
        firstPage.classList.add("hidden");
        secPage.classList.remove("hidden");
    })
}

// Close the window to add pictures
function closeAddPictureWindow() {
    const backButton = document.querySelector(".js-back");
    const firstPage = document.querySelector("#first-page");
    const secPage = document.querySelector("#sec-page");

    backButton.addEventListener('click', function() {
        firstPage.classList.remove("hidden");
        secPage.classList.add("hidden");
    })
}

// Delete works
function deleteWorks() {
    document.querySelectorAll(".trash-icon").forEach((item) => {
        item.addEventListener('click', async function(e) {
            e.preventDefault();
            const workId = item.parentElement.dataset.workId;
            let response = await remWorks(workId)
            if (!response.ok) {
                return;
            }
            
            document.querySelectorAll(`[data-workId=${workId}]`).forEach((item) => {
                item.remove()
            });
        })
    })
}


async function modalMain() {

   
   works = await getWorks();
   galleryWorks = works;

   generateModalGallery();

   openAddPictureWindow();

   closeAddPictureWindow();

   deleteWorks()
}

modalMain()