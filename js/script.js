//// --------------------------
//// load All the news category
//// --------------------------
const loadAllNews = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
//// ----------------------------------------------
//// Show All the news category to the Category menu
//// ----------------------------------------------
const showAllCategories = async () => {
  const data = await loadAllNews();
  const allCategories = data.data.news_category;
  // console.log(allCategories);
  // Access individual category
  allCategories.forEach((category) => {
    const { category_name, category_id } = category;
    //insert category name to the one line default category menu
    const categoryMenu = document.getElementById("category-menu");
    const nameItem = document.createElement("div");
    // console.log(nameItem);
    nameItem.innerHTML = `
            <p class="news px-4 py-3 mb-0 text-center" onclick="newInCategory('${category_id}')" >  ${category_name}</p> 

    `;
    categoryMenu.appendChild(nameItem);
  });
};
showAllCategories();
//// --------------------------
//// load the news in a category
//// --------------------------
const newInCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => newsFeed(data.data));
};
//// ----------------------------------------------
//// Show All the new details in the new feed
//// ----------------------------------------------
const newsFeed = (newsDetails) => {
  const newsFeedField = document.getElementById("news-feed");
  newsFeedField.innerHTML = "";
  newsDetails.forEach((news) => {
    // console.log(news);
    const {
      _id,
      author,
      title,
      image_url,
      thumbnail_url,
      details,
      others_info,
      rating,
      total_view,
    } = news;
    const { name, published_date, img } = author;
    //Insert news details in the news feed
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
 <div class="card flex-row">
            <img src="${image_url}" class="w-25 h-full" alt="..." />
            <div class="card-body">
              <h5 class="card-title text-dark">${title}</h5>
              <p class="card-text">
               ${
                 details.length > 300 ? details.slice(0, 300) + " ..." : details
               }
              </p>
              <p class="card-text">
             <div class="d-flex justify-content-between align-items-end">
              <div class="d-flex align-items-center">
                <div class="me-2">  <img class="news-author" src="${img}" alt=""></div>
                <div>
                <div>${name}</div>
                <div>${published_date}</div>
                </div>
              </div>
              <div>${total_view ? total_view : "No"} view</div>
              <div>rating</div>
              <button>details</button>
            </div>
              </p>
            </div>
          </div>
  
  `;
    newsFeedField.appendChild(newsDiv);
  });
};
