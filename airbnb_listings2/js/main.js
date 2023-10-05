$(document).ready(function() {
  $.ajax({
      url: 'package-lock.json', 
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          if (data && data.length) {
              for (let i = 0; i < Math.min(50, data.length); i++) {
                  let listing = data[i];
                  
                  let listingCard = `
                  <div class="col-4">
                      <div class="listing card">
                          <img src="${listing.image}" class="card-img-top" alt="AirBNB Listing" />
                          <div class="card-body">
                              <h5 class="card-title">${listing.title}</h5>
                              <p class="card-text">${listing.description}</p>
                              <a href="#" class="btn btn-primary">Start to Book</a>
                          </div>
                      </div>
                  </div>`;

                  $('#listings').append(listingCard);
              }
          } else {
              $('#listings').append('<div class="col-12"><p>No listings available.</p></div>');
          }
      },
      error: function(error) {
          console.error('Error fetching the listings', error);
          $('#listings').append('<div class="col-12"><p>Error loading listings.</p></div>');
      }
  });
});

function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    return `<div class="col-4">
  <div class="listing card">
    <img
      src="https://a0.muscache.com/pictures/b7c2a199-4c17-4ba6-b81d-751719d2dac6.jpg"
      class="card-img-top"
      alt="AirBNB Listing"
    />
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div>${listing.price}</div>
      <p class="card-text">
        Some quick example text to build on the card title and make up
        the bulk of the card's content.
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <!-- /card -->
  </div>

  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();


    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();

$(document).ready(function() {
  // Make an AJAX request to get the JSON data
  $.ajax({
      url: 'package-lock.json', // Replace with your JSON file's path
      type: 'GET',
      dataType: 'json',
      success: function(data) {
          // Check if data exists and it has at least 50 listings
          if (data && data.length >= 50) {
              for (let i = 0; i < 50; i++) {
                  let listing = data[i];
                  // Assuming each listing is an object with a title and description, modify as per your data structure
                  $('#listings').append('<div class="listing"><h3>' + listing.title + '</h3><p>' + listing.description + '</p></div>');
              }
          } else {
              $('#listings').append('<p>No listings available.</p>');
          }
      },
      error: function(error) {
          console.error('Error fetching the listings', error);
          $('#listings').append('<p>Error loading listings.</p>');
      }
  });
});
