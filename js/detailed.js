let template1 = document.querySelector('[type = "template1"]').innerHTML;
let template2 = document.querySelector('[type = "template2"]').innerHTML;

console.log(template2);
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
  console.log(imgSrc);
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
  console.log(randBase);
  // let randBase = dataBase[Math.floor(Math.random() * 16)];
  // // newArray.push(randBase);
  // console.log(rand);

  // // for (let i = 0; i < array.length; i++) {
  // //   const element = array[i];
  // // }
  // // }
  // console.log(dataBase);

  // for (let i = 0; i < newArray.length; i++) {
  //   if (newArray[i] === rand) {
  //     console.log("nista");
  //   } else {
  //     newArray.push(rand);
  //   }
  // }

  text2 = "</div></section ></div>";
  main.innerHTML = text + text1 + text2;
  let back = document.querySelector(".back");
  console.log(back);
  back.addEventListener("click", backToMain);
  function backToMain() {
    back.setAttribute("href", "index.html");
  }
});
