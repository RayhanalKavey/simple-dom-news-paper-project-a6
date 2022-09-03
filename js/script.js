//// --------------------------
//// load All the news category
//// --------------------------
const loadAllNews = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
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
            <p class="news mx-4 my-3 text-center" onclick="newInCategory('${category_id}', '${category_name}')" >  ${category_name}</p> 

    `;
    categoryMenu.appendChild(nameItem);
  });
};
showAllCategories();
//// --------------------------
//// load the news in a category
//// --------------------------
const newInCategory = (id, categoryName) => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => newsFeed(data.data, categoryName))
    .catch((error) => console.log(error));
};
//// ----------------------------------------------
//// Show All the new details in the news feed
//// ----------------------------------------------
const newsFeed = (newsDetails, categoryName) => {
  // console.log(newsDetails);
  const newsFeedField = document.getElementById("news-feed");
  newsFeedField.innerHTML = "";
  //No news display
  //-------
  const noResult = document.getElementById("no-news-text");
  if (newsDetails.length === 0) {
    noResult.classList.remove("d-none");
  } else {
    noResult.classList.add("d-none");
  }
  // ---------------
  ///////count field
  const count = Object.keys(newsDetails).length;
  const countField = document.getElementById("news-count");
  countField.innerText = "";
  countField.innerText = `${
    count === 0 ? "No" : count
  } news article  found for category ${categoryName}`;
  // ---------------
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
    //total view
    //Insert news details in the news feed
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
 <div class="card flex-row">
            <img src="${
              image_url ? image_url : "https://i.ibb.co/g9CSkZQ/image.png"
            }" class="w-25 h-full" alt="..." />
            <div class="card-body ">
              <h5 class="card-title text-dark">${
                title ? title : "No title found."
              }</h5>
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
                <div>${name ? name : "Not recognized"}</div>
                <div>${published_date ? published_date : "No date found"}</div>
                </div>
              </div>
              <div>${total_view ? total_view : "No"} view</div>
              <div>rating</div>

             <button type="button" class="btn btn-light me-4" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" onclick="newsDetailsBtn('${_id}')" >
Details</button>
             
            </div>
              </p>
            </div>
          </div>
  
  `;
    newsFeedField.appendChild(newsDiv);
  });
  toggleSpinner(false);
};
//-------------------------------------------------------
////Load individual news details by cicking news details button
//-------------------------------------------------------
const newsDetailsBtn = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};
//------------------------------------------
////Show individual news details in a modal
//------------------------------------------
const displayNewsDetails = (details) => {
  const { title, author, total_view, thumbnail_url } = details;
  const { name, published_date, img } = author;
  //Modal title
  const titleNews = document.getElementById("newsDetailsModalLabel");
  titleNews.innerText = "";
  titleNews.innerText = title ? title : "No title found";
  // modal body
  const modalBody = document.getElementById("modal-body-details");
  modalBody.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="d-flex align-items-center ">
  <div> <img class="modal-autho me-4 " src="${
    thumbnail_url ? thumbnail_url : "https://i.ibb.co/g9CSkZQ/image.png"
  }"alt=""> </div>
  <div>
  <div> <img class="modal-author" src="${
    img ? img : "https://i.ibb.co/g9CSkZQ/image.png"
  }" alt=""> </div>
  <p>${name ? name : "Not found"}</p>
  <p>${published_date ? published_date : "Not found"}</p>
  <p>${total_view ? total_view : "No data avaiable"} View</p>
  </div>
  </div>
  `;
  modalBody.appendChild(div);
};
//----------------
///toggle spinner
//----------------
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
