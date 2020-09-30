const apiKey = '316963d8350302a7cd125f824272e0ef'
const cityId = 74
const cuisineId = 148
const apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&cuisines=148'

fetch(apiUrl, { headers: { "user-key": apiKey } })
  .then(response => response.json())
  .then(json => {
    const myRestaurants = json.restaurants.map(item => {
      name = item.restaurant.name
      address = item.restaurant.location.address
      cost = new Number(item.restaurant.average_cost_for_two).toLocaleString("se-SE")
      rating = item.restaurant.user_rating.aggregate_rating
      image = item.restaurant.featured_image
      return { name, cost, address, rating, image }
    })
    console.log(myRestaurants)

    // loops through and calls generateRestaurant() for each item in myRestautans.
    myRestaurants.forEach(item => {
      restaurants.innerHTML += generateRestaurant(item)
    })

    // add eventlistener that sorts the restaurants when user clicks button.
    const sortedRestaurants = myRestaurants.sort(compare)
    console.log(sortedRestaurants)

    // add eventlistener that filters the restaurants when user clicks button.
    const greatRestaurants = myRestaurants.filter(check)
    console.log(greatRestaurants)

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

// function that sorts the restaurants based on price, from cheapest to most expensive.
function compare(a, b) {
  const costA = a.cost
  const costB = b.cost

  let comparison = 0;
  if (costA > costB) {
    comparison = 1
  } else if (costA < costB) {
    comparison = -1
  }
  return comparison
}

// function that filters restaurants based on rating, includes restaurants with a rating higher than 4.
function check(item) {
  return item.rating > 4
}













































