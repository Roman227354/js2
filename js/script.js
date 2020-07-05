const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    goodsBasket: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: true,
    imgPass:'https://placehold.it/200x150',
    imgPassBasket:'https://placehold.it/50x100'
  },

  methods: {
    makeGETRequest(url, callback) {

      var xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('GET', url, true);
      xhr.send();
    },

    filterGoods(){
      if (!this.searchLine===''){
        this.filteredGoods=this.goods;
      }
      else {
       this.filteredGoods=this.goods.filter((item)=>item.product_name.includes(this.searchLine));
       // arr.forEach((item,i,forEach)=>{
       //  if (item.product_name.includes(this.searchLine)){this.filteredGoods.push(item)};
       // }); 
     }
     console.log(this.filteredGoods);
   },

   BasketShowHide(){
     this.isVisibleCart=!this.isVisibleCart;
     console.log(this.isVisibleCart);
   },

   addProduct(inGood){
    console.log(inGood);
    let result = this.goodsBasket.find((item)=>item.good===inGood);
    if (result==undefined) this.goodsBasket.push({good:inGood,quantity:1 });
    else result.quantity++;
    console.log(this.goodsBasket);}
  },

  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
      console.log();
    });
  }

});
