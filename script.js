const apiKey = '316963d8350302a7cd125f824272e0ef'
const cityId = 74
const cuisineId = 148
const apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&cuisines=148'

fetch(apiUrl, { headers: { "user-key": apiKey } })
  .then(response => response.json())
  .then(json => {
    console.log(json)
    const myRestaurants = json.restaurants.map(item => {
      name = item.restaurant.name
      address = item.restaurant.location.address
      cost = new Number(item.restaurant.average_cost_for_two).toLocaleString("se-SE")
      rating = item.restaurant.user_rating.aggregate_rating
      image = item.restaurant.featured_image
      return { name, cost, address, rating, image }
    })
    console.log(myRestaurants)
    console.log(myRestaurants[0].cost)

    myRestaurants.forEach(item => {
      restaurants.innerHTML += generateRestaurant(item)
    })
  })



// function that generates HTML for a restaurant. 
const generateRestaurant = item => `
 <div class="restaurant-box"> 
  <h3 class="restaurant-name">${item.name}</h3> 
  <p class="restaurant-address">${item.address}</p>
  <p class="restaurant-rating">${item.rating}</p>
  <p class="restaurant-cost">${item.cost} IDR</p>
  <img class="restaurant-image" src="${item.image}">
</div>`








































