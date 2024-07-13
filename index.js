let cartNum = 0;
let isAuthenticated = false;
let currentUser = [];
let productData = [];

// Fetch data from API and put them in cards
if (document.getElementById("html")) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((productData) => {
      localStorage.setItem("productData", JSON.stringify(productData));
      document.getElementById("cardContainer").innerHTML = "";
      for (let i = 0; i < productData.length; i++) {
        document.getElementById("cardContainer").innerHTML += `
      <div class="card shadow border-0 align-items-center flex-grow-1" onclick="productPage(${i})">
        <img src="${productData[i].image}" class="card-img-top m-3"/>
        <div class="card-body w-100">
        <h5 class="card-title cardTitle" >${productData[i].title}</h5>
        <p class="card-text cardDescription">${
          productData[i].description
        }</p>   
        </div>
        <div class='mt-auto mb-4 ms-3 align-self-start'>
        <p class="card-text text-primary">${getRatingStars(
          productData[i].rating.rate
        )} <small>(${productData[i].rating.count})</small></p>
        <p class="card-text"><span class='fs-4 fw-medium'>${
          productData[i].price
        } L.E.</span> <del>${parseFloat(
          (productData[i].price * 1.12).toFixed(2)
        )} L.E.</del></p>     </div>
        <div class="mt-auto mb-4">
         <a class="btn btn-primary align-self-end" onclick="addToCart(${i}); event.stopPropagation();">Add to cart </a>
        </div>
      </div>`;
      }
    })
    .catch((error) => console.error("Error fetching product data:", error));
}
// Sign up regex check
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let email = document.getElementById("email");
let password = document.getElementById("password");

let namePattern = /^[A-Z][a-zA-Z'-]*$/;
let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
let passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

fName.addEventListener("blur", function () {
  if (!namePattern.test(fName.value)) {
    document.getElementById("nameError").style.display = "flex";
  } else {
    document.getElementById("nameError").style.display = "none";
  }
});
lName.addEventListener("blur", function () {
  if (!namePattern.test(lName.value)) {
    document.getElementById("nameError").style.display = "flex";
  } else {
    document.getElementById("nameError").style.display = "none";
  }
});
email.addEventListener("blur", function () {
  if (!emailPattern.test(email.value)) {
    document.getElementById("emailError").style.display = "flex";
  } else {
    document.getElementById("emailError").style.display = "none";
  }
});
password.addEventListener("blur", function () {
  if (!passwordPattern.test(password.value)) {
    document.getElementById("passwordError").style.display = "flex";
  } else {
    document.getElementById("passwordError").style.display = "none";
  }
});

// Sign up storing in local storage
let nUserData;
if (localStorage.user) {
  nUserData = JSON.parse(localStorage.user);
} else {
  nUserData = [];
}

document.getElementById("signUp").addEventListener("click", function () {
  if (
    namePattern.test(fName.value) &&
    namePattern.test(lName.value) &&
    emailPattern.test(email.value) &&
    passwordPattern.test(password.value)
  ) {
    let newUser = {
      fName: document.getElementById("fName").value,
      lName: document.getElementById("lName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    nUserData.push(newUser);
    localStorage.setItem("user", JSON.stringify(nUserData));
  }
});

// Sign in
let userData = JSON.parse(localStorage.getItem("user")) || [];

let inEmail = document.getElementById("inEmail");
let inEmailError = document.getElementById("inEmailError");

inEmail.addEventListener("blur", function () {
  let foundUsers = userData.filter((user) => user.email === inEmail.value);

  if (foundUsers.length > 0) {
    inEmailError.style.display = "none";
  } else {
    inEmailError.style.display = "flex";
  }
});

let inPassword = document.getElementById("inPassword");
let inPasswordError = document.getElementById("inPasswordError");

document.getElementById("inPassword").addEventListener("keyup", function () {
  if (
    userData.find(
      (user) =>
        user.email === inEmail.value && user.password === inPassword.value
    )
  ) {
    document.getElementById("signIn").setAttribute("data-bs-dismiss", "modal");
    inPasswordError.style.display = "none";
  } else {
    inPasswordError.style.display = "flex";
  }
});
document.getElementById("signInModalToggle2").addEventListener("touchstart", function () {
  if (
    userData.find(
      (user) =>
        user.email === inEmail.value && user.password === inPassword.value
    )
  ) {
    document.getElementById("signIn").setAttribute("data-bs-dismiss", "modal");
    inPasswordError.style.display = "none";
  } else {
    inPasswordError.style.display = "flex";
  }
});

function authy() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  document.getElementById("signUpBtn").style.display = "none";
  document.getElementById("signInBtn").style.display = "none";
  document.getElementById("hiName").style.display = "inline-block";
  document.getElementById("cartIcon").style.display = "inline-block";
  document.getElementById("signOutBtn").style.display = "inline-block";
  document.getElementById("hiName").innerHTML = `Hi ${currentUser.fName}`;
}

document.getElementById("signIn").addEventListener("click", function () {
  isAuthenticated = false;

  for (let i = 0; i < userData.length; i++) {
    if (
      userData[i].email == inEmail.value &&
      userData[i].password == inPassword.value
    ) {
      isAuthenticated = true;
      currentUser = userData[i];
      currentUser.index = i;
      currentUser.cart = [];
      break;
    }
  }

  if (isAuthenticated) {
    localStorage.setItem("auth", JSON.stringify(1));
    authy();
  } else {
    inPasswordError.style.display = "flex";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let auth = JSON.parse(localStorage.getItem("auth"));
  if (auth === null) {
    auth = 0;
    localStorage.setItem("auth", JSON.stringify(auth));
    isAuthenticated = 0;
  }
  if (auth === 1) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    authy();
    isAuthenticated = 0;
  }
});

// Sign out
document.getElementById("signOutBtn").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  isAuthenticated = false;
  currentUser = null;

  document.getElementById("signUpBtn").style.display = "inline-block";
  document.getElementById("signInBtn").style.display = "inline-block";
  document.getElementById("hiName").style.display = "none";
  document.getElementById("cartIcon").style.display = "none";
  document.getElementById("signOutBtn").style.display = "none";

  document.getElementById("hiName").innerHTML = "";
});

// Add cart items to user object
function addToCart(i) {
  if (!JSON.parse(localStorage.getItem("auth"))) {
    alert("Please login first");
  } else {
    cartNum++;

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.cart.push(i);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    document.getElementById(
      "cartIcon"
    ).innerHTML = `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-primary fs-6 p-1">
    ${cartNum}
  </span>`;
  }
}

// Rating to stars
function getRatingStars(rate) {
  const stars = `${'<i class="bi bi-star-fill"></i>'.repeat(Math.floor(rate))}${
    rate % 1 ? '<i class="bi bi-star-half"></i>' : ""
  }${'<i class="bi bi-star"></i>'.repeat(5 - Math.ceil(rate))}`;
  return stars;
}

// Go to product page
function productPage(i) {
  window.location.href = `product.html?id=${i}`;
}
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("html3")) {
    let productId = new URLSearchParams(window.location.search).get("id");
    let productData = JSON.parse(localStorage.getItem("productData"));
    let product = productData[productId];

    document.getElementById("productPageContent").innerHTML = `
        <img src="${product.image}" class="w-50 productImage" />
        <div class="card-body">
          <h5 class="card-title pb-4">${product.title}</h5>
          <p class="card-text pb-4">${product.description}</p>
          <p class="card-text text-primary"> ${getRatingStars(
            product.rating.rate
          )} <small>(${product.rating.count})</small></p>
          <p class="card-text"><span class='fs-4 fw-medium'>${
            product.price
          } L.E.</span> <del>${(product.price * 1.12).toFixed(
      2
    )} L.E.</del></p>        
        </div>
        <div class="mt-auto mb-4">
          <a class="btn btn-primary align-self-end" onclick="addToCart(${productId})">Add to cart</a>
        </div>`;
  }
});

// Cart page
function cartPage() {
  window.location.href = `product.html?id=${i}`;
}

if (document.getElementById("html2")) {
  let productData = JSON.parse(localStorage.getItem("productData"));
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && currentUser.cart && currentUser.cart.length > 0) {
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalContainer = document.getElementById("subtotalContainer");
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    const cartItemCount = currentUser.cart.reduce((countMap, productId) => {
      countMap[productId] = (countMap[productId] || 0) + 1;
      return countMap;
    }, {});

    Object.keys(cartItemCount).forEach((productId) => {
      let product = productData[productId];
      let quantity = cartItemCount[productId];
      subtotal += product.price * quantity;

      cartItemsContainer.innerHTML += `
        <div class="card cartCard mb-3 d-flex flex-row wrap">
          <img id"cartImg" src="${product.image}" class="p-3 cartProductImage" />
          <div class="cartName">
            <h5 class="card-title cardTitle">${product.title}</h5>
            <p class="card-text text-primary">
              ${getRatingStars(product.rating.rate)} <small>(${
        product.rating.count
      })</small>
            </p class="p-0">
            <p class="card-text">
              Quantity: ${quantity}
            </p>
          </div>
          <div class=" text-center cartPrice">
          <del>${(product.price * 1.12 * quantity).toFixed(2)} L.E.</del>
            <p class="card-text">
              <span class='fs-5 fw-medium'>${(product.price * quantity).toFixed(
                2
              )} L.E.</span>
            </p>
          </div>
        </div>`;
    });

    subtotalContainer.innerHTML = `
      <div class="subtotal">
        <h4>Subtotal: ${subtotal.toFixed(2)} L.E.</h4>
      </div>`;
  }
}

// Dark mode
let dark = JSON.parse(localStorage.getItem("dark"));
if (dark === null) {
  dark = 0;
  localStorage.setItem("dark", dark);
}

document.addEventListener("DOMContentLoaded", () => {
  darkMode(dark);
  console.log(dark);
});

if (document.getElementById("theme-toggle")) {
  document.getElementById("theme-toggle").addEventListener("click", () => {
    toggleDark(dark);
    dark = JSON.parse(localStorage.getItem("dark"));
    darkMode(dark);
    console.log(dark);

  });
} else if (document.getElementById("theme-toggle2")) {
  document.getElementById("theme-toggle2").addEventListener("click", () => {
    toggleDark(dark);
    dark = JSON.parse(localStorage.getItem("dark"));
    darkMode(dark);
    console.log(dark);

  });
} else if (document.getElementById("theme-toggle3")) {
  document.getElementById("theme-toggle3").addEventListener("click", () => {
    toggleDark(dark);
    dark = JSON.parse(localStorage.getItem("dark"));
    darkMode(dark);
    console.log(dark);

  });
}

function darkMode(dark) {
  if (dark == 1) {
    if (document.getElementById("html")) {
      document.getElementById("html").setAttribute("data-bs-theme", "dark");
    } else if (document.getElementById("html2")) {
      document.getElementById("html2").setAttribute("data-bs-theme", "dark");
    } else if (document.getElementById("html3")) {
      document.getElementById("html3").setAttribute("data-bs-theme", "dark");
    }

    if (document.getElementById("theme-toggle")) {
      document.getElementById("theme-toggle").innerHTML =
        '<i class="bi bi-moon-fill fs-4 px-3"></i>';
    } else if (document.getElementById("theme-toggle2")) {
      document.getElementById("theme-toggle2").innerHTML =
        '<i class="bi bi-moon-fill fs-4 px-3"></i>';
    } else if (document.getElementById("theme-toggle3")) {
      document.getElementById("theme-toggle3").innerHTML =
        '<i class="bi bi-moon-fill fs-4 px-3"></i>';
    }

    if (document.getElementById("gradient-overlay")) {
      document.getElementById("gradient-overlay").style.background =
        "linear-gradient(to top, #26252b 35%, transparent)";
    }

    let lightElements = document.querySelectorAll('*[class*="light"]');
    lightElements.forEach((element) => {
      const lightClasses = element.className.split(" ");
      const lightNewClasses = lightClasses.map((cls) =>
        cls.replace(/light/g, "dark")
      );
      element.className = lightNewClasses.join(" ");
    });

    let secondaryElements = document.querySelectorAll('*[class*="secondary"]');
    secondaryElements.forEach((element) => {
      const secondaryClasses = element.className.split(" ");
      const secondaryNewClasses = secondaryClasses.map((cls) =>
        cls.replace(/secondary/g, "info")
      );
      element.className = secondaryNewClasses.join(" ");
    });

    let primaryElements = document.querySelectorAll('*[class*="primary"]');
    primaryElements.forEach((element) => {
      const primaryClasses = element.className.split(" ");
      const primaryNewClasses = primaryClasses.map((cls) =>
        cls.replace(/primary/g, "danger")
      );
      element.className = primaryNewClasses.join(" ");
    });
  } else {
    if (document.getElementById("html")) {
      document.getElementById("html").setAttribute("data-bs-theme", "light");
    } else if (document.getElementById("html2")) {
      document.getElementById("html2").setAttribute("data-bs-theme", "light");
    } else if (document.getElementById("html3")) {
      document.getElementById("html3").setAttribute("data-bs-theme", "light");
    }

    if (document.getElementById("theme-toggle")) {
      document.getElementById("theme-toggle").innerHTML =
        '<i class="bi bi-brightness-high-fill fs-4 px-3"></i>';
    } else if (document.getElementById("theme-toggle2")) {
      document.getElementById("theme-toggle2").innerHTML =
        '<i class="bi bi-brightness-high-fill fs-4 px-3"></i>';
    } else if (document.getElementById("theme-toggle3")) {
      document.getElementById("theme-toggle3").innerHTML =
        '<i class="bi bi-brightness-high-fill fs-4 px-3"></i>';
    }

    if (document.getElementById("gradient-overlay")) {
      document.getElementById("gradient-overlay").style.background =
        "linear-gradient(to top, #f9f7ff 35%, transparent)";
    }

    let lightElements = document.querySelectorAll('*[class*="dark"]');
    lightElements.forEach((element) => {
      const lightClasses = element.className.split(" ");
      const lightNewClasses = lightClasses.map((cls) =>
        cls.replace(/dark/g, "light")
      );
      element.className = lightNewClasses.join(" ");
    });

    let secondaryElements = document.querySelectorAll('*[class*="info"]');
    secondaryElements.forEach((element) => {
      const secondaryClasses = element.className.split(" ");
      const secondaryNewClasses = secondaryClasses.map((cls) =>
        cls.replace(/info/g, "secondary")
      );
      element.className = secondaryNewClasses.join(" ");
    });

    let primaryElements = document.querySelectorAll('*[class*="danger"]');
    primaryElements.forEach((element) => {
      const primaryClasses = element.className.split(" ");
      const primaryNewClasses = primaryClasses.map((cls) =>
        cls.replace(/danger/g, "primary")
      );
      element.className = primaryNewClasses.join(" ");
    });
  }
}

function toggleDark(dark) {
  localStorage.setItem("dark", !dark);
}
