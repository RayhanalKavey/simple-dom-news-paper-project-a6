//// --------------------------
//// load All the new category
//// --------------------------
const loadAllNews = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
const showAllCategories = async () => {
  const data = await loadAllNews();
  const allCategories = data.data.news_category;
  console.log(allCategories);
  // Access individual category
  allCategories.forEach((category) => {
    const { category_name, category_id } = category;
    console.log(category_name, category_id);
    //insert category to the online default menu
  });
};
showAllCategories();
