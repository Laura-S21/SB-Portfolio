export async function getCategories() {
    // Fetching the categories from the API
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    return data;
}

export async function getWorks() {
    // Fetching the pictures from the API
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
}

// API call to delete works
export async function remWorks(workId) {
    const response = await fetch(`http://localhost:5678/api/works/${workId}` , {
         method: "DELETE",
         headers: { "Authorization": "Bearer "+window.localStorage.getItem("token")},
         body: {userId: window.localStorage.getItem("userId")} 
     });
     
     return response
 }

 export async function sendWork(workData) {
    const response = await fetch("http://localhost:5678/api/works", {
         method: "POST",
         headers: { "Authorization": "Bearer "+window.localStorage.getItem("token")},
         body: workData
     });
 
     return response
 }