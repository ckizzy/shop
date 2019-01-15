let template = document.querySelector('[type="template"]').innerHTML;
let mainRow = document.querySelector("#insertTemplate");
let dataBase;

$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function(res) {
  dataBase = res;
  let aLinks = document.querySelectorAll("a");
  render(dataBase);
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
  //view detailed html
  let viewIcon = document.querySelectorAll('[alt="View icon"]');
  for (let i = 0; i < viewIcon.length; i++) {
    viewIcon[i].addEventListener("click", showDetailedPage);
  }
});

//bojanov front

$(".back-to-top").click(function() {
  $("html, body").animate({ scrollTop: 0 }, 1000);
});
