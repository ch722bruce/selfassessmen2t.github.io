function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    const amenities = Array.isArray(listing.amenities)
      ? listing.amenities
      : JSON.parse(listing.amenities);

    const amenitiesHTML = amenities
      .map((amenity) => `<label>${amenity}</label>`)
      .join("");

    return `<div class="col-4">
      <div class="listing card">
        <img
          src=${listing.picture_url}
          class="card-img-top"
          alt="AirBNB Listing"
        />
        <div class="card-body">
          <h2 class="card-title">${listing.name}</h2>
          <div class="price">${listing.price}</div>
          <p class="card-text">${listing.description}</p>
          <p class="card-text amenities-title">Amenities</p>
          <div class="card-text amenities">${amenitiesHTML}</div>
          <div class="card-text host-info">
            <img class="host-picture" src=${listing.host_picture_url} alt=${listing.host_name} />
            <span class="host-name">${listing.host_name}</span>
          </div>
        </div>
      </div>
    </div>`;
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