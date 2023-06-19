import { remWorks, sendWork } from "./api.js";

let modal = null;

// Function to open the modal
export const openModal = function (event) {
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
    resetForm()
    generateModalGallery(JSON.parse(window.localStorage.getItem("works")))
}

// Function to close the modal
const closeModal = function (event) {
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
const stopPropagation = function (event) {
    event.stopPropagation()
}



// Generate modal gallery
export function generateModalGallery(galleryWorks) {
    const modalGallery = document.querySelector('#modal-gallery')
    modalGallery.innerHTML = "";

    for (let i = 0; i < galleryWorks.length; i++) {

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
    }
}

// Open the window to add pictures
function openAddPictureWindow() {
    const addButton = document.querySelector(".add-img");
    const firstPage = document.querySelector("#first-page");
    const secPage = document.querySelector("#sec-page");

    addButton.addEventListener('click', function () {
        firstPage.classList.add("hidden");
        secPage.classList.remove("hidden");
    })
}

// Close the window to add pictures
function closeAddPictureWindow() {
    const backButton = document.querySelector(".js-back");
    const firstPage = document.querySelector("#first-page");
    const secPage = document.querySelector("#sec-page");

    backButton.addEventListener('click', function () {
        firstPage.classList.remove("hidden");
        secPage.classList.add("hidden");
    })
}

// Delete works
export async function trashButton(item) {
    // Get id from parent element (work)
    const workId = item.parentElement.dataset.workId;
    // Response from the API
    return await remWorks(workId)
}

// Upload picture
const fileInput = document.querySelector(".file-input");
const fileOutput = document.querySelector(".file-output");
let uploadImages = []
fileInput.addEventListener("change", function () {
    const file = fileInput.files
    uploadImages.push(file[0])
    displayImages()
})

// Creating elments for the picture to add
function displayImages() {
    let images = ""
    uploadImages.forEach((image) => {
        images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
              </div>`
    })
    const spec = document.querySelector(".submit-area");
    spec.classList.add("hidden")
    fileOutput.innerHTML = images
}

// Category selector
export function categoriesSelector(categories) {
    const selector = document.querySelector("#categories-names");
    for (let i = 0; i < categories.length; i++) {
        const newOption = document.createElement("option");
        const optionText = document.createTextNode(categories[i].name)

        newOption.appendChild(optionText);
        newOption.setAttribute('value', categories[i].id);
        selector.appendChild(newOption)
    }

}

// Add a picture
export async function addWork() {
    // Get title input
    const title = document.querySelector(".title-input");
    // Get categories input
    const imgCategory = document.querySelector("#categories-names");
    // Form data to send data to the API
    let workData = new FormData();
    workData.append('image', fileInput.files[0]);
    workData.append('title', title.value);
    workData.append('category', imgCategory.value);
    workData.append('userId', window.localStorage.getItem("userId"))

    return await sendWork(workData)
}

// Reset the form after adding à new work
export function resetForm() {
    fileInput.value = "";
    fileOutput.innerHTML = "";
    const spec = document.querySelector(".submit-area");
    spec.classList.remove("hidden");
    document.querySelector(".title-input").value = ""
    document.querySelector("#categories-names").selectedIndex = 0
}


async function modalMain() {

    openAddPictureWindow();

    closeAddPictureWindow();

}

modalMain()