function render(base) {
  let text = "";
  for (let i = 0; i < base.length; i++) {
    text += template
      .replace(/{{imgSrc}}/gi, base[i].imgSrc)
      .replace(/{{productTitle}}/gi, base[i].productTitle)
      .replace(/{{model}}/gi, base[i].model)
      .replace(/{{price}}/gi, base[i].price);
  }
  mainRow.innerHTML = text;
  //view detailed html

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
}

function showDetailedPage() {
  this.parentElement.setAttribute("href", "detailed.html");
  console.log(this.parentElement);
  let imgSrc = this.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute(
    "src"
  );
  localStorage.setItem("imgSrc", imgSrc);
}

function addToCartInstant() {
  event.preventDefault();
  let badge = document.querySelector(".badge");
  let cartArr = [];

  let imgSrc = this.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute(
    "src"
  );
  if (!localStorage.getItem("cartArr")) {
    cartArr.push(imgSrc);
    localStorage.setItem("cartArr", JSON.stringify(cartArr));
    badge.innerHTML = cartArr.length;
  } else {
    cartArr = JSON.parse(localStorage.getItem("cartArr"));
    cartArr.push(imgSrc);
    localStorage.setItem("cartArr", JSON.stringify(cartArr));
    badge.innerHTML = cartArr.length;
  }
}

function setQuantity() {
  if (!localStorage.getItem("cartArr")) {
    document.querySelector(".badge").innerHTML = 0;
  } else {
    document.querySelector(".badge").innerHTML = JSON.parse(
      localStorage.getItem("cartArr")
    ).length;
  }
}

function showCart() {
  this.setAttribute("href", "cart.html");
}
