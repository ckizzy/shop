let template1 = document.querySelector('[type = "template1"]').innerHTML;
let template2 = document.querySelector('[type = "template2"]').innerHTML;
setQuantity();

let main = document.querySelector("main");
let dataBase;

$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function(res) {
  dataBase = res;
  //render template1
  text = "";
  text1 = "";
  text3 = "";
  imgSrc = localStorage.getItem("imgSrc");
  imgSrc = imgSrc.replace("img/products/", "");
  imgSrc = imgSrc.replace(".jpg", "");

  let data = dataBase.filter(function(e) {
    return e.imgSrc == imgSrc;
  });

  for (let i = 0; i < data.length; i++) {
    text += template1
      .replace(/{{imgSrc}}/gi, data[i].imgSrc)
      .replace(/{{productTitle}}/gi, data[i].productTitle)
      .replace(/{{model}}/gi, data[i].model)
      .replace(/{{price}}/gi, data[i].price);
  }

  let randBase = [];
  let col = data[0].colection;
  console.log(col);
  let newArray = dataBase.filter(function(e) {
    return e.imgSrc != imgSrc && e.colection == col;
  });

  for (let i = 0; i < 4; i++) {
    let rand = [Math.floor(Math.random() * newArray.length)];
    randBase.push(newArray[rand]);

    newArray.splice(rand, 1);
    console.log(randBase);
    text1 += template2
      .replace(/{{imgSrc}}/gi, randBase[i].imgSrc)
      .replace(/{{productTitle}}/gi, randBase[i].productTitle)
      .replace(/{{model}}/gi, randBase[i].model)
      .replace(/{{price}}/gi, randBase[i].price);
  }

  text2 = "</div></section ></div>";
  main.innerHTML = text + text1 + text2;
  //SUPERPAY MLADEN SUPERGAY
  document.querySelector(".add-to-cart").addEventListener("click", addToCart);
  for (
    let i = 0;
    i < document.querySelectorAll('[alt="View icon"]').length;
    i++
  ) {
    document
      .querySelectorAll('[alt="View icon"]')
      [i].addEventListener("click", showDetailedPage);
    document
      .querySelectorAll('[alt="Shop icon"]')
      [i].addEventListener("click", addToCartInstant);
  }
  //back to main button
  let back = document.querySelector(".back");
  console.log(back);
  back.addEventListener("click", backToMain);
  function backToMain() {
    back.setAttribute("href", "index.html");
  }
  document.querySelector(".cart").addEventListener("click", showCart);
});

function addToCart() {
  event.preventDefault();
  let quantityInput = document.querySelector('input[type="value"]').value;
  console.log(quantityInput);
  if (quantityInput == "") {
    if (!localStorage.getItem("cartArr")) {
      let cartArr = [];
      cartArr.push(localStorage.getItem("imgSrc"));
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
    } else {
      let cartArr = JSON.parse(localStorage.getItem("cartArr"));
      cartArr.push(localStorage.getItem("imgSrc"));
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
    }
  } else {
    if (!localStorage.getItem("cartArr")) {
      let cartArr = [];
      cartArr.push(localStorage.getItem("imgSrc"));

      for (let i = 0; i < quantityInput; i++) {
        cartArr.push(localStorage.getItem("imgSrc"));
      }
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
    } else {
      let cartArr = JSON.parse(localStorage.getItem("cartArr"));
      for (let i = 0; i < quantityInput; i++) {
        cartArr.push(localStorage.getItem("imgSrc"));
      }
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
    }
  }
  setQuantity();
}
