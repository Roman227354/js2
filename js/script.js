const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
  return new Promise((callback) => {
    var xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
      // console.log(xhr.responseText);
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();

  
// Здесь пишем асинхронный код
// В случае успешного выполнения вызываем колбэк resolve()
// В случае ошибки вызываем reject()

});
}

class GoodsItem {
  constructor(title, price,id_product) {
    this.title = title;
    this.price = price;
    this.id_product=id_product;
  }
  render() {
    return `<div class="goods-item">
    <img class="img" src="https://via.placeholder.com/30x100.png">
    <h3>${this.product_name}</h3>
    <p>Item price: ${this.price}</p>
    <button class="buy-btn" data-${this.id_product} onclick="basket.addItem(${this.id_product})">В конзину</button>
    </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
      this.goods = JSON.parse(goods);
      this.render();
    })
}

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price,good.id_product);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
    document.querySelector('.goods-list').insertAdjacentHTML('afterend', `<p> Total summ:${this.getSumm()}`);
  }

// Т.к корзины пока нет и остатков пока нет считаем что всех товаров по 1
getSumm() {
 let goodsSumm=0;
 this.goods.forEach(good=>{
  goodsSumm = goodsSumm+good.price;
  
})
 return goodsSumm;
}
}

class Basket{
  constructor() {
    this.GoodsList = new GoodsList;
  }

	addItem(id_product){
    console.log(id_product);
    let good = new GoodsItem;
     list.goods.forEach(element=>{
      if (element.id_product==id_product) {good=element};
     }); 
    if (!this.GoodsList.goods.includes(good)) this.GoodsList.goods.push(good); 
    console.log(this.GoodsList);
  }
	removeItem(good){
   // if (this.GoodsList.includes(good)) this.GoodsList.slice(this.GoodsList.indexOf(good));
  }
  getBasketGoods(){
     return this.GoodsList;
  }
	clearBasket(){
    this.GoodsList = new GoodsList;
  }
	getSumm(){}
	render(){}
}
class BasketItem{
	render(){}
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();});

const basket = new Basket();
