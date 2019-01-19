let template2 = document.querySelector('[type = "template2"]').innerHTML;

let main = document.querySelector("main");
let dataBase;

setQuantity();
$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function(res) {
  dataBase = res;
  let newArr = [];
  if (localStorage.getItem("cartArr")) {
    cartArr = JSON.parse(localStorage.getItem("cartArr"));

    for (let i = 0; i < cartArr.length; i++) {
      if (newArr.indexOf(cartArr[i]) < 0) {
        newArr.push(cartArr[i]);
      }
    }

    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = newArr[i].replace("img/products/", "");
      newArr[i] = newArr[i].replace(".jpg", "");
    }

    let data = [];
    for (let i = 0; i < dataBase.length; i++) {
      if (newArr.indexOf(dataBase[i].imgSrc) > -1) {
        data.push(dataBase[i]);
      }
    }

    // dataBase = dataBase.filter(function(e) {
    //   return e.imgSrc == newArr;
    // });

    let text2 = "";
    for (let i = 0; i < data.length; i++) {
      text2 += template2
        .replace(/{{imgSrc}}/gi, data[i].imgSrc)
        .replace(/{{productTitle}}/gi, data[i].productTitle)
        .replace(/{{model}}/gi, data[i].model)
        .replace(/{{price}}/gi, data[i].price);
    }

    let text3 = `
             </div>
               </section>
               <div style="margin-bottom:20px;">
                 <button style="padding-bottom:50px; border-color: yellow; border-size: 5px; background-color:#ddd;color:#333; font-weight:bold;font-size:30px;" type="button"
                 class=" btn btn-outline-danger btn-lg form-control"> Ukupna cena: <span class="fullPrice"> 1000 </span> RSD </button>
               </div>
               </div>
             </main>
             `;
    let text1 = `<div class="container">
               <section class="products-section">
                 <h3 class="top-picked active">Korpa: </h3>
              
               <div class="row">`;

    if (cartArr.length != 0) {
      main.innerHTML = text1 + text2 + text3;
    } else {
      main.innerHTML = `<h4 style="color:grey;text-align:center;line-height:600px;">Niste izabrali nijedan proizvod.</h4>`;
    }
  } else {
    main.innerHTML = `<h4 style="color:grey;text-align:center;line-height:600px;">Niste izabrali nijedan proizvod.</h4>`;
  }
  setProductsquantity();
  function setProductsquantity() {
    let cartArr = JSON.parse(localStorage.getItem("cartArr"));
    let numbers = document.querySelectorAll(".number");

    for (let i = 0; i < numbers.length; i++) {
      numbers[i].innerHTML = cartArr.filter(function(e) {
        return (
          e ==
          numbers[
            i
          ].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute(
            "src"
          )
        );
      }).length;
    }
  }
  setProductsprice();
  function setProductsprice() {
    let cartArr = JSON.parse(localStorage.getItem("cartArr"));
    let price = document.querySelectorAll(".pp");
    let fullPrice = document.querySelector(".fullPrice");
    let num = 0;

    for (let i = 0; i < price.length; i++) {
      price[i].innerHTML =
        dataBase.filter(function(e) {
          return (
            e.imgSrc ==
            price[
              i
            ].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild
              .getAttribute("src")
              .replace("img/products/", "")
              .replace(".jpg", "")
          );
        })[0].price *
        parseInt(
          price[i].parentElement.parentElement.firstElementChild
            .firstElementChild.innerHTML
        ) *
        1000;

      console.log(fullPrice);
      num += parseInt(price[i].innerHTML);
      fullPrice.innerHTML = num;
    }
  }
  //remove

  let removeBtn = document.querySelectorAll(".remove");
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", removeProduct);
  }

  function removeProduct() {
    let imgSrc = this.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute(
      "src"
    );
    console.log(imgSrc);
    let cartArr = JSON.parse(localStorage.getItem("cartArr"));
    cartArr.splice(cartArr.indexOf(imgSrc), 1);
    console.log(cartArr);
    newArr = [];
    for (let i = 0; i < cartArr.length; i++) {
      if (newArr.indexOf(cartArr[i]) < 0) {
        newArr.push(cartArr[i]);
      }
    }

    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = newArr[i].replace("img/products/", "");
      newArr[i] = newArr[i].replace(".jpg", "");
    }

    let data = [];
    for (let i = 0; i < dataBase.length; i++) {
      if (newArr.indexOf(dataBase[i].imgSrc) > -1) {
        data.push(dataBase[i]);
      }
    }
    let text2 = "";
    for (let i = 0; i < data.length; i++) {
      text2 += template2
        .replace(/{{imgSrc}}/gi, data[i].imgSrc)
        .replace(/{{productTitle}}/gi, data[i].productTitle)
        .replace(/{{model}}/gi, data[i].model)
        .replace(/{{price}}/gi, data[i].price);
    }

    let text3 = `
             </div>
               </section>
               <div style="margin-bottom:20px;">
                 <button style="padding-bottom:50px; border-color: yellow; border-size: 5px; background-color:#ddd;color:#333; font-weight:bold;font-size:30px;" type="button"
                 class=" btn btn-outline-danger btn-lg form-control"> Ukupna cena: <span class='fullPrice'> 1000 </span> RSD </button>
               </div>
               </div>
             </main>
             `;
    let text1 = `<div class="container">
               <section class="products-section">
                 <h3 class="top-picked active">Korpa: </h3>
               <div class="row">`;
    if (cartArr.length != 0) {
      main.innerHTML = text1 + text2 + text3;
    } else {
      main.innerHTML = `<h4 style="color:grey;text-align:center;line-height:600px;">Niste izabrali nijedan proizvod.</h4>`;
    }

    localStorage.setItem("cartArr", JSON.stringify(cartArr));

    setProductsquantity();
    setQuantity();
    setProductsprice();

    removeBtn = document.querySelectorAll(".remove");
    for (let i = 0; i < removeBtn.length; i++) {
      removeBtn[i].addEventListener("click", removeProduct);
    }
  }

  // for (let i = 0; i < number.length; i++) {
  //   number[i].innerHTML = "8";
  // }
});
