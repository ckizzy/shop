let template = document.querySelector('[type="template"]').innerHTML;
let template1 = document.querySelector('[type="template1"]').innerHTML;

let mainRow = document.querySelector("#insertTemplate");
let dataBase;
let izbProizvod = [];

setQuantity();
$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function(res) {
  dataBase = res;
  let aLinks = document.querySelectorAll("[data-col]");

  render(dataBase);
  document.querySelector(".cart").addEventListener("click", showCart);
  //renderCategory
  for (let i = 0; i < aLinks.length; i++) {
    aLinks[i].addEventListener("click", selectCategory);
  }

  function selectCategory() {
    event.preventDefault();
    //add and remove class ACTIVE
    for (let i = 0; i < aLinks.length; i++) {
      aLinks[i].classList.remove("active");
    }
    this.classList.add("active");
    let colection;
    let col = this.getAttribute("data-col");
    if (col == "male" || col == "female") {
      colection = dataBase.filter(function(e) {
        return e.colection == col;
      });
      render(colection);
    } else {
      colection = dataBase.filter(function(e) {
        return e[col];
      });
      render(colection);
    }
  }
});
function myFunction() {
  let box = document.querySelector("#box");
  box.innerHTML = "<div></div>";
  let search = document.querySelector("#search").value;
  console.log(box);
  box.style.display = "flex";
  box.style.flexWrap = "wrap";

  if (search.length > 1) {
    for (var i = 0; i < dataBase.length; i++) {
      let title = dataBase[i].productTitle;
      let proizvod = dataBase[i].imgSrc;

      console.log(izbProizvod);
      let tit = title.toUpperCase().indexOf(search.toUpperCase());

      console.log(tit);
      if (tit >= 0) {
        izbProizvod.push(i);
        box.innerHTML += template1
          .replace(/{{i}}/gi, i)
          .replace(/{{imgSrc}}/gi, dataBase[i].imgSrc)
          .replace(/{{productTitle}}/gi, dataBase[i].productTitle)
          .replace(/{{model}}/gi, dataBase[i].model)
          .replace(/{{price}}/gi, dataBase[i].price);
      }
    }

    let a = document.querySelectorAll("#aLink");

    for (var i = 0; i < a.length; i++) {
      a[i].addEventListener("click", fuck);
    }
    function fuck() {
      console.log(this);
      let imgSrc = this.firstElementChild.getAttribute("src");
      console.log(imgSrc);
      this.href = "http://localhost/shop/detailed.html";
      localStorage.setItem("imgSrc", imgSrc);

      // this.href = "http://localhost/shop/detailed.html";
      // localStorage.setItem("save", imgValue);
    }

    $("#insertTemplate1").html(box.innerHTML);
    let row = document.querySelector("#insertTemplate1");
    row.style.display = "none";
    let btn = document.querySelector(".btn");
    btn.addEventListener("click", closeSearch);
    function closeSearch(params) {
      box.style.display = "none";
    }
  }
}

//bojanov front

$(".back-to-top").click(function() {
  $("html, body").animate({ scrollTop: 0 }, 1000);
});
