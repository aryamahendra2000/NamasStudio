$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2.5,
    },
    1000: {
      items: 5.5,
    },
  },
});

let nav2 = $(".nav-link");
nav2.css("color", "#ffffff"); // set font color to white

$(window).scroll(function () {
  let nav = $(".nav-index");
  let nav2 = $(".nav-link");
  let nav3 = $(".navbar-brand");
  let float = $(".floating");
  if ($(this).scrollTop() > 30) {
    // nav.css("display", "inline-block");
    nav.addClass("bg-custom shadow");
    nav3.removeClass("fs-1");
    nav2.css("color", "#000000"); // set font color to white
    nav3.css("color", "#000000"); // set font color to white
  } else {
    // nav.css("display", "none");
    nav3.addClass("fs-1");
    nav.removeClass("bg-custom shadow");
    nav2.css("color", "#ffffff"); // set font color to black
    nav3.css("color", "#ffffff"); // set font color to black
  }
});

$(window).resize(function () {
  if ($(window).width() < 766) {
    $(".product-img img").addClass("center-img");
    // $(".img-ft").hide();
  } else {
    $(".product-img img").removeClass("center-img");
    // $(".img-ft").show();
  }
});

$(window).resize(function () {
  if ($(window).width() < 767) {
    $(".img-ft").hide();
  } else {
    $(".img-ft").show();
  }
});

$(window).on("resize load", function () {
  let user = $(".user-icon");
  let cart = $(".cart-icon");
  let about = $(".about");
  let nav = $(".main-nav");

  if ($(window).width() < 991) {
    user.removeClass("fa-solid fa-user").text("Profile");
    user.css("padding", "4px 0 8px 0");
    cart.removeClass("fa-solid fa-cart-shopping").text("Cart(1)");
    cart.css("padding-top", "0px");
    about.removeClass("py-1");
    about.css("padding", "2px 0px 2 0");
    nav.removeClass("ps-5");
  } else {
    user.addClass("fa-solid fa-user").text("");
    cart.addClass("fa-solid fa-cart-shopping").text("");
    user.addClass("py-2");
    cart.addClass("py-2");
    about.addClass("py-1");
    nav.addClass("py-1");
    nav.addClass("ps-5");
  }
});

$(document).ready(function () {
  $(".content")
    .css({
      opacity: 0,
      bottom: "-50px",
    })
    .animate(
      {
        opacity: 1,
        bottom: "0px",
      },
      3000
    );
});

$(".btn-size").click(function () {
  $(".btn-size").removeClass("active");
  $(this).addClass("active");
});

$(document).ready(function () {
  $(".btn-secondary").click(function (event) {
    event.preventDefault();
    let imagePath = $(".get-img-to-cart").attr("src");
    let productName = $(".name-product").text();
    let productPrice = $(".price-product").text();
    let productMaterial = $('span:contains("Cotton Premium")').text();
    let productColor = $('span:contains("Brown Sugar")').text();
    let productSize = $("button.active").text();
    let productQuantity = $("#quantity").val();
    let productTotal =
      parseInt(productPrice.replace("$", "")) * parseInt(productQuantity);

    if (productQuantity > 0) {
      let product = {
        name: productName,
        price: productPrice,
        material: productMaterial,
        color: productColor,
        size: productSize,
        quantity: productQuantity,
        total: productTotal,
        image: imagePath,
      };
      let cart = [];
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Product added to cart!");
    } else {
      alert("Quantity must > 0");
    }
  });
});

$(document).ready(function () {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  if (cart) {
    let ship = 5;
    let subTotal = 0;
    $.each(cart, function (index, product) {
      let productHtml = `
        <div class="card mb-1">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <img
                  src="${product.image}"
                  alt="${product.name}"
                  class="img-fluid"
                />
              </div>
              <div class="col-md-8">
                <h5>${product.name}</h5>
                <p>${product.material}, ${product.color}, ${product.size}</p>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="quantity">Quantity:</label>
                      <input
                        type="number"
                        class="form-control"
                        id="quantity-${index}"
                        value="${product.quantity}"
                      />
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <label for="price">Price:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="price-${index}"
                        value="${product.price}"
                        readonly
                      />
                    </div>
                  </div>
                </div>
                <div class="col text-end mt-3">
                  <button class="btn btn-primary remove" data-index="${index}">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      subTotal += parseInt(product.price);
      console.log(subTotal);
      $("#subtotal").text("$ " + subTotal + ".00");
      $("#cart-items").append(productHtml);
    });
    let tax = subTotal * 0.01;
    $("#tax").text("$ " + tax + ".00");
    $("#shipping").text("$ " + ship + ".00");
    let total = subTotal + ship + tax;
    $("#total").text("$ " + total + ".00");
  } else {
    let productHtml = `
    <div class="card">
    <div class="card-body">
      <div class="row">
          <div class="col">
            <h1 class="text-center">
              Nothing!
            </h1>
          </div>
      </div>
    </div>
  </div>
`;
    $("#cart-items").append(productHtml);
  }
});

$(document).on("click", ".remove", function () {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let index = $(this).data("index");
  cart.splice(index, 1); // Remove the product at the given index from the cart array
  if (cart.length === 0) {
    localStorage.removeItem("cart"); // Delete the cart object from local storage if it's empty
  } else {
    localStorage.setItem("cart", JSON.stringify(cart)); // Update the cart in the local storage
  }
  location.reload(); // Refresh the page
});
