const apiKey = '316963d8350302a7cd125f824272e0ef'
const cityId = 74
const cuisineId = 148
const apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&cuisines=148'

fetch(apiUrl, { headers: { "user-key": apiKey } })
  .then(response => response.json())
  .then(json => {
    console.log(json)
    console.log(json.restaurants[0].restaurant.name)
    console.log(json.restaurants[0].restaurant.average_cost_for_two)
    console.log(json.restaurants[0].restaurant.location.address)
    console.log(json.restaurants[0].restaurant.user_rating.aggregate_rating)

    const myRestaurants = json.restaurants.map(item => {
      name = item.restaurant.name
      cost = item.restaurant.average_cost_for_two
      address = item.restaurant.location.address
      rating = item.restaurant.user_rating.aggregate_rating
      return { name, cost, address, rating }
    })

    myRestaurants.forEach(item => {
      restaurants.innerHTML += generateRestaurant(item)
    })


  })



// function that generates HTML for a restaurant. 
const generateRestaurant = item => `
  <h3 class="restaurant-name">${item.name}</h3> 
  <p class="restaurant-address">${item.address}</p>`



















