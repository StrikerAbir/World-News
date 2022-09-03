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

    // view all data default
    loadCategoryData(categories[categories.length - 1].category_id, categories[categories.length - 1].category_name);
}
loadCatagories()


const clickedCategory = (categoryId, categoryName) => {
    toggleSpinner(true);
    loadCategoryData(categoryId, categoryName);
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

// load all news

// load category data
const loadCategoryData = (id, name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCategoryData(data.data, name))
        .catch(err => console.error(err));
}

// Display category data 
const displayCategoryData = (newsFeed, name) => {
    console.log(newsFeed);
    const totalNews = document.getElementById('total-news');
    totalNews.innerText = `${name} category has ${newsFeed.length} news`;
    setCards(newsFeed)
}

const setCards = (newsFeed) => {
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ``;

    newsFeed.forEach(news => {
        const details = news.details.slice(0, 230);
        const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June","July", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];
        const date = new Date(news.author.published_date);
        const div = document.createElement('div');
        div.classList.add('flex', 'justify-center');
        div.innerHTML = `
        <div
            class="flex flex-col md:flex-row md:w-5/6 rounded-lg bg-sky-100 shadow-lg"
          >
            <img
              class="w-full h-96 md:h-auto object-cover md:w-auto rounded-t-lg md:rounded-none md:rounded-l-lg"
              src="${news.thumbnail_url}"
              alt=""
            />
            <div class="p-6 flex flex-col justify-start">
              <h5 class="text-gray-900 text-xl font-medium mb-2">${news.title}</h5>
              <p class="text-gray-700 text-base mb-4">
                ${details}...
              </p>
              <div class="flex justify-end">
              <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModalScrollable" onclick="loadFullDetails('${news._id}')">
                  <img src="./images/bi_arrow-right-short.png" alt="">
                </button>
              </div>
              
              <div class="flex justify-between items-center mt-5 md:mt-0 lg:mr-10">
                <div class="mb-2">
                  <div class="flex">
                    <img class="h-10 w-10" src="${news.author.img}" alt="" />
                    <div class="pl-2">
                      <h3 class="text-md font-semibold">${news.author.name}</h3>
                      <p class="text-sm">${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex">
                    <img src="./images/carbon_view.png" alt="" />
                    <div class="ml-">
                      <p class="text-sm p-1 font-bold">${news.total_view}</p>
                    </div>
                  </div>
                </div>
                <div>
                   <div class="flex items-center">
                    <div>
                      <p class="text-sm">Rating:</p>
                    </div>
                    <div class="mx-2">
                      <p class="text-sm font-bold">${news.rating.number}</p>
                    </div>
                    <i class="fa-solid fa-star text-yellow-400"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
        newsContainer.appendChild(div)
    })
    toggleSpinner(false);
}



//! showing details in modal

// full details in modal
const loadFullDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  console.log(id);
  fetch(url)
    .then(response => response.json())
    .then(data => displayFullDetails(data.data))
    .catch(err => console.error(err));
}

const displayFullDetails = (data) => {
  console.log(data);
  data.forEach(d => {
    const modal = document.getElementById('modal-body');
    modal.innerHTML = ``;
    modal.innerHTML = `
      <h4 class="font-bold text-lg">${d.title}</h4>
      <p>${d.details}</p>
    `
  })
}