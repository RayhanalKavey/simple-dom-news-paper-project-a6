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
            <p class="news px-4 py-3 mb-0 text-center" onclick="newInCategory(${category_id})" >  ${category_name}</p> 

    `;
    categoryMenu.appendChild(nameItem);
  });
};
showAllCategories();
//// --------------------------
//// load the news in a category
//// --------------------------
const newInCategory = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
};
//// ----------------------------------------------
//// Show All the new details in the new feed
//// ----------------------------------------------
