let template2 = document.querySelector('[type = "template2"]').innerHTML;

let main = document.querySelector("main");
let dataBase;
$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function(res) {
  dataBase = res;
  let korpa = [];
  korpa.push(localStorage.getItem("imgSrc"));
  localStorage.setItem("korpa", korpa);
  //   for (let i = 0; i < korpa.length; i++) {
  //     text += template1
  //       .replace(/{{imgSrc}}/gi, korpa[i].imgSrc)
  //       .replace(/{{productTitle}}/gi, data[i].productTitle)
  //       .replace(/{{model}}/gi, korpa[i].model)
  //       .replace(/{{price}}/gi, korpa[i].price);
  //   }
});
