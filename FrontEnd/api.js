export async function getGategories() {
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