fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((productData) => {
    console.log(productData);
    document.getElementById("cardContainer").innerHTML = "";
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.length > 20) {
        productData[i].title = productData[i].title.substring(0, 30) + "...";
      }
      productData[i].title = productData[i].title;

      if (productData[i].description.length > 60) {
        productData[i].description =
          productData[i].description.substring(0, 60) + "...";
      }
      productData[i].description = productData[i].description;

      let rating;
      if (productData[i].rating.rate < 1.5) {
        rating = `
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
      } else if (productData[i].rating.rate < 2.5) {
        rating = `
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
      } else if (productData[i].rating.rate < 3) {
        rating = `
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
      } else if (productData[i].rating.rate < 3.5) {
        rating = `
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>`;
      } else if (productData[i].rating.rate < 4) {
        rating = `
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>`;
      } else if (productData[i].rating.rate < 4.5) {
        rating = `
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>`;
      } else if (productData[i].rating.rate < 5) {
        rating = `
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>`;
      }

      document.getElementById("cardContainer").innerHTML += `
      <div class="card shadow border-0 align-items-center" style="width: 18rem">
        <img src="${productData[i].image}" class="card-img-top p-3" />
        <div class="card-body">
        <h5 class="card-title">${productData[i].title}</h5>
        <p class="card-text">${productData[i].description}</p>
        <p class="card-text text-primary">${rating}</p>
        <p class="card-text"><del>${parseFloat(
          (productData[i].price * 1.12).toFixed(2)
        )} L.E.</del></p>
        <h5 class="card-price">${productData[i].price} L.E.</h5>
        
        </div>
        <div class="mt-auto mb-4">
         <a href="#" <a href="#" class="btn btn-primary align-self-end">Add to cart</a>
        </div>
      </div>`;
    }
  })
  .catch((error) => console.error("Error fetching product data:", error));
