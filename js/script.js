//// --------------------------
//// load All the new category
//// --------------------------
const loadAllNews = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
//// ----------------------------------------------
//// Show All the new category to the Category menu
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
    const nameItem = document.createElement("p");
    nameItem.classList.add("px-4", "py-3", "mb-0", "text-center");
    nameItem.innerText = category_name;
    categoryMenu.appendChild(nameItem);
  });
};
showAllCategories();
