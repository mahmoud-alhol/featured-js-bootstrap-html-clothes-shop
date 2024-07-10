fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((productData) => {
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

      document.getElementById("cardContainer").innerHTML += `
      <div class="card shadow border-0 align-items-center" style="width: 18rem">
        <img src="${productData[i].image}" class="card-img-top p-3" />
        <div class="card-body">
        <h5 class="card-title">${productData[i].title}</h5>
        <p class="card-text">${productData[i].description}</p>
        </div>
        <div class="mt-auto mb-4">
         <a href="#" <a href="#" class="btn btn-primary align-self-end">Add to cart</a>
        </div>
      </div>`;
    }
  })
  .catch((error) => console.error("Error fetching product data:", error));
