//! Categories section

// loading categories
const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(err => console.error(err));
}

//  display Categories 
const displayCategory = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
   categories.forEach((category) => {
       const div = document.createElement('div');
        div.innerHTML = `
            <div id="single-category${category.category_id}" class="text-center py-3" onclick="clickedCategory(${category.category_id})">
                <p>${category.category_name}</p>
            </div> 
        `
        categoriesContainer.appendChild(div);
    })
}
loadCatagories()