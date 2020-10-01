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
      if (item.restaurant.featured_image) {
        image = item.restaurant.featured_image
      } else {
        image = `https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80`
      }
      return { name, cost, address, rating, image }
    })

    // loops through the my restaurants array and calls generateHTML for each restaurant
    const displayRestaurants = () => {
      myRestaurants.forEach(item => {
        restaurants.innerHTML += generateRestaurant(item)
      })
    }

    displayRestaurants()

    // new array with the restaurants sorted based on price from cheapest to most expensive
    const sortedRestaurants = myRestaurants.sort(compare)

    // function that loops through the sorted restaurants array and calls generateRestaurant() for each restaurant
    const sortRestaurants = () => {
      restaurants.innerHTML = ""
      sortedRestaurants.forEach(item => {
        restaurants.innerHTML += generateRestaurant(item)
      })
    }

    // new array including the restaurants with rating > 4
    const filteredRestaurants = myRestaurants.filter(check)

    // function that loops through the filtered restaurants array and calls generateRestaurant() for each restaurant
    const filterRestaurants = () => {
      restaurants.innerHTML = ""
      filteredRestaurants.forEach(item => {
        restaurants.innerHTML += generateRestaurant(item)
      })
    }

    // eventlistener for when user clicks sort button
    document.getElementById("sort-button").addEventListener("click", sortRestaurants)

    // evebtlistener for when user clicks filter button
    document.getElementById("filter-button").addEventListener("click", filterRestaurants)
  })

// function that generates HTML for a restaurant
const generateRestaurant = item => `
 <div class="restaurant-box"> 
  <img class="restaurant-image" src="${item.image}">
  <div class="text-box">
    <h3 class="restaurant-name">${item.name}</h3> 
    <p class="restaurant-address">${item.address}</p>
    <p class="restaurant-rating">
      <span>&#11088;</span>
      ${item.rating}
    </p>
    <p class="restaurant-cost">${item.cost} IDR</p>
  </div>
</div>`

// function that sorts the restaurants based on price, from cheapest to most expensive
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

// function that filters restaurants based on rating > 4
function check(item) {
  return item.rating > 4
}
