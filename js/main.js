$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function(res) {
  let dataBase = res;
  //create html
  let template = document.querySelector('[type="template"]').innerHTML;
  let mainRow = document.querySelector("#insertTemplate");
  console.log(template);

  let text = "";
  for (let i = 0; i < dataBase.length; i++) {
    text += template
      .replace(/{{imgSrc}}/gi, dataBase[i].imgSrc)
      .replace(/{{productTitle}}/gi, dataBase[i].productTitle)
      .replace(/{{model}}/gi, dataBase[i].model)
      .replace(/{{price}}/gi, dataBase[i].price);
  }
  mainRow.innerHTML = text;
});

//bojanov front

$(".back-to-top").click(function() {
  $("html, body").animate({ scrollTop: 0 }, 1000);
});
