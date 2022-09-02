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
        div.classList.add('hover:bg-red-600', 'hover:text-white', 'rounded')
        div.innerHTML = `
            <div class="text-center py-3" onclick="clickedCategory('${category.category_id}','${category.category_name}')">
                <p>${category.category_name}</p>
            </div> 
        `
        categoriesContainer.appendChild(div);
    })
}
loadCatagories()


const clickedCategory = (categoryId,categoryName) => {
    toggleSpinner(true);
    loadCategoryData(categoryId,categoryName);
}


// ! News section

// Loading spinner
const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

// load category data
const loadCategoryData = (id,name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCategoryData(data.data,name))
        .catch(err => console.error(err));
}

// Display category data 
const displayCategoryData = (newsFeed,name) => {
    console.log(newsFeed);
    const totalNews = document.getElementById('total-news');
    totalNews.innerText = `${name} category has ${newsFeed.length} news`;
}