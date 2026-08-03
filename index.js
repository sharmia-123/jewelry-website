document.addEventListener('DOMContentLoaded', function() {
  let cart = JSON.parse(localStorage.getItem('issaou_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('issaou_wishlist')) || [];

  function saveToStorage() {
    localStorage.setItem('issaou_cart', JSON.stringify(cart));
    localStorage.setItem('issaou_wishlist', JSON.stringify(wishlist));
  }

  function updateCounts() {
    const cartCountEl = document.getElementById('cart-count');
    const wishCountEl = document.getElementById('wishlist-count');
    if(cartCountEl) cartCountEl.innerText = cart.reduce((total, item) => total + item.qty, 0);
    if(wishCountEl) wishCountEl.innerText = wishlist.length;
  }

  function updateHearts() {
    document.querySelectorAll('.prdct').forEach(product => {
      const id = product.dataset.id;
      const heart = product.querySelector('.add-wishlist');
      if(!heart) return;
      if (wishlist.find(p => p.id == id)) {
        heart.classList.remove('fa-regular');
        heart.classList.add('fa-solid');
        heart.style.color = '#e63946';
      } else {
        heart.classList.remove('fa-solid');
        heart.classList.add('fa-regular');
        heart.style.color = '';
      }
    });
  }

  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = e.target.closest('.prdct');
      const item = {
        id: product.dataset.id,
        name: product.dataset.name,  
        price: parseInt(product.dataset.price),
        img: product.dataset.img,
        qty: 1
      };
      console.log("Adding:", item); 
      const existing = cart.find(p => p.id == item.id);
      if (existing) existing.qty++; 
      else cart.push(item);
      saveToStorage();
      updateCounts();
      alert(`${item.name} added to Cart!`);
    });
  });

  document.querySelectorAll('.add-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = e.target.closest('.prdct');
      const item = {
        id: product.dataset.id,
        name: product.dataset.name,
        price: parseInt(product.dataset.price),
        img: product.dataset.img
      };
      const existingIndex = wishlist.findIndex(p => p.id == item.id);
      if (existingIndex === -1) wishlist.push(item);
      else wishlist.splice(existingIndex, 1);
      saveToStorage();
      updateCounts();
      updateHearts(); 
    });
  });

  updateCounts(); 
  updateHearts(); 
});
const imageDetails = [
  "",
]