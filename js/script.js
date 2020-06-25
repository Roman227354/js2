class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item">
             <img class="img" src="https://via.placeholder.com/30x100.png">
              <h3>${this.title}</h3>
              <p>Item price: ${this.price}</p>
             </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
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
	addItem(){}
	removeItem(){}
	clearBasket(){}
	getSumm(){}
	render(){}
}
class BasketItem{
	render(){}
}

const list = new GoodsList();
list.fetchGoods();
list.render();