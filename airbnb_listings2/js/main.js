// $(document).ready(function() {
//   $.ajax({
//       url: './airbnb_sf_listings_500.json', 
//       type: 'GET',
//       dataType: 'json',
//       success: function(data) {
//           if (data && data.length) {
//               for (let i = 0; i < Math.min(50, data.length); i++) {
//                   let listing = data[i];
                  
//                   let listingCard = `
//                   <div class="col-4">
//                       <div class="listing card">
//                           <img src="${listing.picture_url}" class="card-img-top" alt="AirBNB Listing" />
//                           <div class="card-body">
//                               <h5 class="card-title">${listing.name}</h5>
//                               <p class="card-text">${listing.description}</p>
//                               <div class="card-atri">${listing.ost_location}</div>
//                               <a href="#" class="btn btn-primary">Start to Book</a>
//                           </div>
//                       </div>
//                   </div>`;

//                   $('#listings').append(listingCard);
//               }
//           } else {
//               $('#listings').append('<div class="col-12"><p>No listings available.</p></div>');
//           }
//       },
//       error: function(error) {
//           console.error('Error fetching the listings', error);
//           $('#listings').append('<div class="col-12"><p>Error loading listings.</p></div>');
//       }
//   });
// });

// in class example
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
      <div>${listing.host_location}</div>
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

  function getListingCode1(listing) {
    return `
    <div class="col-4">
        <div class="listing card">
            <img src="${listing.picture_url}" class="card-img-top" alt="${listing.name}" />
            <div class="card-body">
                <h2 class="card-title">${listing.name}</h2>
                <p class="card-text">${listing.description.split('<br />')[0]}...</p>
                <div><strong>Price:</strong> ${listing.price}</div>
                <div><strong>Location:</strong> ${listing.neighbourhood}</div>
                <div><strong>Host:</strong> <a href="${listing.host_url}" target="_blank">${listing.host_name}</a></div>
                <div><strong>Rating:</strong> ${listing.review_scores_rating}/5 from ${listing.number_of_reviews} reviews</div>
                <a href="${listing.listing_url}" class="btn btn-primary" target="_blank">View on Airbnb</a>
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


