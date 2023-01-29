'use strict';

const cart = {};
const cartCounter = document.querySelector('.cartIconWrap span');
const cartTotal = document.querySelector('.basketTotal');
const cartTotalValue = document.querySelector('.basketTotalValue');
const cartEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  cartEl.classList.toggle('hidden');
});

document.querySelector('.featuredItems').addEventListener('click', event => {
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in cart)) {
    cart[id] = {id: id, name: name, price: price, count: 0};
  }

  cart[id].count++;
  cartCounter.textContent = getTotalCartCount().toString();
  cartTotalValue.textContent = getTotalCartPrice().toFixed(2);
  addProductToCart(id);
}

function addProductToCart(productId) {
  const basketRowEl = cartEl.querySelector(`.basketRow[data-id="${productId}"]`);
  if (!basketRowEl) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${cart[productId].name}</div>
      <div>
        <span class="productCount">${cart[productId].count}</span> шт.
      </div>
      <div>$${cart[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(cart[productId].price * cart[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    cartTotal.insertAdjacentHTML("beforebegin", productRow);
    return;
  }

  const product = cart[productId];
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl.querySelector('.productTotalRow').textContent = (product.price * product.count).toFixed(2);
}

function getTotalCartCount() {
  return Object.values(cart).reduce((acc, product) => acc + product.count, 0);
}

function getTotalCartPrice() {
  return Object.values(cart).reduce((acc, product) => acc + product.price * product.count, 0);
}
