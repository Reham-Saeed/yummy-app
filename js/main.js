// toggle nav-links
function openCloseNav(){
 $('#nav-content').toggleClass('d-none');
 $('#btn-nav').toggleClass('fa-close');
}
$('#btn-nav').click(openCloseNav)

// males 
async function getMales(){
 let api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
 let response=await api.json();
 displayMeals(response.meals)
}
function displayMeals(meal) {
 let box=``;
 for (let i = 0; i < meal.length; i++) {
   box += `
   <div class="col-md-3">
     <div onclick="getMealDetails('${meal[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
       <img class="w-100" src="${meal[i].strMealThumb}" alt="meal">
       <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${meal[i].strMeal}</h3>
       </div>
     </div>
   </div>
   `
 }
 document.getElementById('males').innerHTML =box
}
getMales()

// search
function showSearchInputs() {
 openCloseNav()
 document.getElementById('search-content').innerHTML = `
 <div class="row py-4">
     <div class="col-md-6 ">
         <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
     </div>
     <div class="col-md-6">
         <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
     </div>
 </div>`
 document.getElementById('males').innerHTML = ""
}
async function searchByName(term) {
 let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
 response = await response.json()
 displayMeals(response.meals)
}
async function searchByFLetter(term) {
 let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
 response = await response.json()
 displayMeals(response.meals)
}
$('#Search').click(showSearchInputs)

// categories 
async function getCategories(){
 openCloseNav()
 let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
 let response = await api.json()
 displayCategories(response.categories)
}
function displayCategories(category) {
 let box = ``;
 for (let i = 0; i < category.length; i++) {
     box += `
     <div class="col-md-3">
        <div onclick="getCategoryMeals('${category[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
           <img class="w-100" src="${category[i].strCategoryThumb}" alt="" srcset="">
           <div class="meal-layer position-absolute text-center text-black p-2">
               <h3>${category[i].strCategory}</h3>
               <p>${category[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
           </div>
        </div>
     </div>
     `
 }
 document.getElementById('males').innerHTML = box
}
async function getCategoryMeals(category) {
 document.getElementById('males').innerHTML = ""
 let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
 response = await response.json()
 displayMeals(response.meals.slice(0, 20))
}
$('#Categories').click(getCategories)

// Areas 
async function getArea(){
 openCloseNav()
 let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
 let response = await api.json()
 displayArea(response.meals)
}
function displayArea(area) {
 let box = ``;
 for (let i = 0; i < area.length; i++) {
    box += `
    <div class="col-md-3">
        <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area[i].strArea}</h3>
        </div>
     </div>
    `
 }
 document.getElementById('males').innerHTML = box
}
async function getAreaMeals(area) {
 document.getElementById('males').innerHTML = ""
 let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
 response = await response.json()
 displayMeals(response.meals.slice(0, 20))
}
$('#Area').click(getArea)

// Ingredients
async function getIngredients(){
 openCloseNav()
 let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
 let response = await api.json()
 displayIngredients(response.meals)
}
function displayIngredients(ingredient) {
 let box = ``;
 for (let i = 0; i < 20; i++) {
   box += `
   <div class="col-md-3">
      <div onclick="getIngredientsMeals('${ingredient[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${ingredient[i].strIngredient}</h3>
        <p>${ingredient[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
      </div>
   </div>
  `
 }
 document.getElementById('males').innerHTML = box
}
async function getIngredientsMeals(ingredients) {
 document.getElementById('males').innerHTML = ""
 let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
 response = await response.json()
 displayMeals(response.meals.slice(0, 20))
}
$('#Ingredients').click(getIngredients)

// Contact Us
function showContacts() {
 openCloseNav()
 document.getElementById('males').innerHTML = `
 <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
   <div class="container w-75 text-center">
     <div class="row g-4">
         <div class="col-md-6">
             <input type="text" class="form-control" placeholder="Enter Your Name">
         </div>
         <div class="col-md-6">
             <input type="email" class="form-control " placeholder="Enter Your Email">
         </div>
         <div class="col-md-6">
             <input type="text" class="form-control " placeholder="Enter Your Phone">
         </div>
         <div class="col-md-6">
             <input type="number" class="form-control " placeholder="Enter Your Age">
         </div>
         <div class="col-md-6">
             <input type="password" class="form-control " placeholder="Enter Your Password">
         </div>
         <div class="col-md-6">
             <input type="password" class="form-control " placeholder="Repassword">
         </div>
     </div>
     <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
 </div> `
}
$('#ContactUs').click(showContacts)

// detales
async function getMealDetails(mealID) {
 document.getElementById('males').innerHTML = ""
 document.getElementById('search-content').innerHTML = "";
 let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
 respone = await respone.json();
 displayMealDetails(respone.meals[0])
}
function displayMealDetails(meal) {
 
 document.getElementById('search-content').innerHTML = "";


 let ingredients = ``

 for (let i = 1; i <= 20; i++) {
     if (meal[`strIngredient${i}`]) {
         ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
     }
 }

 let tags = meal.strTags?.split(",")
 // let tags = meal.strTags.split(",")
 if (!tags) tags = []

 let tagsStr = ''
 for (let i = 0; i < tags.length; i++) {
     tagsStr += `
     <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
 }



 let cartoona = `
 <div class="col-md-4">
             <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                 alt="">
                 <h2>${meal.strMeal}</h2>
         </div>
         <div class="col-md-8">
             <h2>Instructions</h2>
             <p>${meal.strInstructions}</p>
             <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
             <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
             <h3>Recipes :</h3>
             <ul class="list-unstyled d-flex g-3 flex-wrap">
                 ${ingredients}
             </ul>

             <h3>Tags :</h3>
             <ul class="list-unstyled d-flex g-3 flex-wrap">
                 ${tagsStr}
             </ul>

             <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
             <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
         </div>`

         document.getElementById('males').innerHTML = cartoona
}
