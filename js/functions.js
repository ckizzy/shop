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
  let viewIcon = document.querySelectorAll('[alt="View icon"]');

  for (let i = 0; i < viewIcon.length; i++) {
    viewIcon[i].addEventListener("click", showDetailedPage);
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
