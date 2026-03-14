// Cart Module for Brew & Bean Co.

const Cart = {
  // Cart items
  items: [],
  
  // Shipping cost
  shippingCost: 5.99,
  
  // Free shipping threshold
  freeShippingThreshold: 50,
  
  // Initialize cart
  init() {
    this.loadCart();
    this.bindEvents();
    this.updateUI();
  },
  
  // Load cart from localStorage
  loadCart() {
    const cartData = localStorage.getItem('coffeeCart');
    if (cartData) {
      this.items = JSON.parse(cartData);
    }
  },
  
  // Save cart to localStorage
  saveCart() {
    localStorage.setItem('coffeeCart', JSON.stringify(this.items));
    this.updateUI();
  },
  
  // Bind cart events
  bindEvents() {
    // Cart button
    document.getElementById('cartBtn')?.addEventListener('click', () => {
      this.show();
    });
    
    // Continue shopping
    document.getElementById('continueShopping')?.addEventListener('click', () => {
      this.hide();
    });
    
    // Proceed to checkout
    document.getElementById('proceedCheckout')?.addEventListener('click', () => {
      if (this.items.length > 0) {
        this.hide();
        Checkout.show();
      }
    });
    
    // Close cart modal
    document.querySelector('[data-close="cartModal"]')?.addEventListener('click', () => {
      this.hide();
    });
  },
  
  // Show cart modal
  show() {
    this.render();
    document.getElementById('cartModal').classList.add('show');
  },
  
  // Hide cart modal
  hide() {
    document.getElementById('cartModal').classList.remove('show');
  },
  
  // Add item to cart
  add(productId, qty = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = this.items.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      this.items.push({
        id: productId,
        qty: qty,
        price: product.price
      });
    }
    
    this.saveCart();
    App.showToast(`${product.name} added to cart!`, 'success');
  },
  
  // Remove item from cart
  remove(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.render();
  },
  
  // Update item quantity
  updateQuantity(productId, qty) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (qty <= 0) {
        this.remove(productId);
      } else {
        item.qty = qty;
        this.saveCart();
      }
    }
  },
  
  // Get cart total item count
  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },
  
  // Get cart subtotal
  getSubtotal() {
    return this.items.reduce((sum, item) => {
      const product = getProductById(item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  },
  
  // Get shipping cost
  getShipping() {
    const subtotal = this.getSubtotal();
    if (subtotal >= this.freeShippingThreshold || subtotal === 0) {
      return 0;
    }
    return this.shippingCost;
  },
  
  // Get total (subtotal + shipping)
  getTotal() {
    return this.getSubtotal() + this.getShipping();
  },
  
  // Get tax (calculated at 8%)
  getTax() {
    return this.getSubtotal() * 0.08;
  },
  
  // Check if free shipping
  isFreeShipping() {
    return this.getSubtotal() >= this.freeShippingThreshold;
  },
  
  // Get remaining for free shipping
  getRemainingForFreeShipping() {
    const remaining = this.freeShippingThreshold - this.getSubtotal();
    return remaining > 0 ? remaining : 0;
  },
  
  // Update UI elements
  updateUI() {
    const cartCount = document.getElementById('cartCount');
    const count = this.getItemCount();
    
    cartCount.textContent = count;
    cartCount.classList.toggle('show', count > 0);
  },
  
  // Render cart items
  render() {
    const container = document.getElementById('cartItems');
    
    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
          </svg>
          <p>Your cart is empty</p>
        </div>
      `;
      
      document.getElementById('cartSubtotal').textContent = formatPrice(0);
      document.getElementById('cartTotal').textContent = formatPrice(0);
      document.getElementById('cartShipping').textContent = '-';
      return;
    }
    
    container.innerHTML = this.items.map(item => {
      const product = getProductById(item.id);
      if (!product) return '';
      
      return `
        <div class="cart-item">
          <div class="cart-item-image">${product.image}</div>
          <div class="cart-item-details">
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-price">${formatPrice(product.price)}</div>
            <div class="cart-item-controls">
              <button class="qty-btn" data-id="${item.id}" data-action="dec">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" data-id="${item.id}" data-action="inc">+</button>
              <button class="remove-item-btn" data-id="${item.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    // Bind quantity buttons
    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const action = btn.dataset.action;
        const item = this.items.find(i => i.id === id);
        if (item) {
          const newQty = action === 'inc' ? item.qty + 1 : item.qty - 1;
          this.updateQuantity(id, newQty);
        }
      });
    });
    
    // Bind remove buttons
    container.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.remove(parseInt(btn.dataset.id));
      });
    });
    
    // Update totals
    document.getElementById('cartSubtotal').textContent = formatPrice(this.getSubtotal());
    document.getElementById('cartTotal').textContent = formatPrice(this.getTotal());
    
    const shippingEl = document.getElementById('cartShipping');
    if (this.isFreeShipping()) {
      shippingEl.textContent = 'FREE';
      shippingEl.style.color = 'var(--success)';
    } else {
      shippingEl.textContent = formatPrice(this.getShipping());
      shippingEl.style.color = '';
    }
    
    // Update proceed to checkout button
    const checkoutBtn = document.getElementById('proceedCheckout');
    if (checkoutBtn) {
      checkoutBtn.disabled = this.items.length === 0;
    }
  },
  
  // Clear cart
  clear() {
    this.items = [];
    this.saveCart();
  },
  
  // Get cart items for order
  getItems() {
    return this.items.map(item => {
      const product = getProductById(item.id);
      return {
        product: product,
        qty: item.qty,
        price: product.price,
        total: product.price * item.qty
      };
    });
  }
};

// Checkout Module
const Checkout = {
  currentStep: 1,
  shippingData: {},
  paymentData: {},
  
  // Show checkout modal
  show() {
    if (Cart.items.length === 0) {
      App.showToast('Your cart is empty', 'warning');
      return;
    }
    
    this.reset();
    document.getElementById('checkoutModal').classList.add('show');
    this.renderStep(1);
  },
  
  // Hide checkout modal
  hide() {
    document.getElementById('checkoutModal').classList.remove('show');
  },
  
  // Reset checkout state
  reset() {
    this.currentStep = 1;
    this.shippingData = {};
    this.paymentData = {};
    
    document.querySelectorAll('.checkout-step').forEach(step => {
      step.classList.toggle('active', parseInt(step.dataset.step) === 1);
    });
    
    document.querySelectorAll('.checkout-panel').forEach(panel => {
      panel.classList.toggle('active', parseInt(panel.dataset.panel) === 1);
    });
    
    document.getElementById('checkoutSuccess').style.display = 'none';
    document.getElementById('reviewItems').innerHTML = '';
  },
  
  // Render checkout step
  renderStep(step) {
    // Update step indicators
    document.querySelectorAll('.checkout-step').forEach(s => {
      const stepNum = parseInt(s.dataset.step);
      s.classList.toggle('active', stepNum <= step);
    });
    
    // Update panels
    document.querySelectorAll('.checkout-panel').forEach(p => {
      p.classList.toggle('active', parseInt(p.dataset.panel) === step);
    });
    
    // If going to review step, populate review data
    if (step === 3) {
      this.populateReview();
    }
  },
  
  // Navigate to step
  goToStep(step) {
    if (step >= 1 && step <= 3) {
      this.currentStep = step;
      this.renderStep(step);
    }
  },
  
  // Bind checkout events
  bindEvents() {
    // Close checkout
    document.querySelector('[data-close="checkoutModal"]')?.addEventListener('click', () => {
      this.hide();
    });
    
    // Shipping form
    document.getElementById('shippingForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.shippingData = {
        firstName: document.getElementById('shipFirstName').value,
        lastName: document.getElementById('shipLastName').value,
        address: document.getElementById('shipAddress').value,
        city: document.getElementById('shipCity').value,
        state: document.getElementById('shipState').value,
        zip: document.getElementById('shipZip').value,
        phone: document.getElementById('shipPhone').value,
        instructions: document.getElementById('shipInstructions').value
      };
      this.goToStep(2);
    });
    
    // Back to shipping
    document.getElementById('backToShipping')?.addEventListener('click', () => {
      this.goToStep(1);
    });
    
    // Payment form
    document.getElementById('paymentForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
      
      this.paymentData = {
        name: document.getElementById('cardName').value,
        last4: cardNumber.slice(-4),
        expiry: document.getElementById('cardExpiry').value
      };
      
      this.goToStep(3);
    });
    
    // Back to payment
    document.getElementById('backToPayment')?.addEventListener('click', () => {
      this.goToStep(2);
    });
    
    // Place order
    document.getElementById('placeOrder')?.addEventListener('click', () => {
      this.placeOrder();
    });
    
    // Continue after order
    document.getElementById('continueAfterOrder')?.addEventListener('click', () => {
      this.hide();
    });
    
    // Card number formatting
    document.getElementById('cardNumber')?.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
      let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formatted.slice(0, 19);
    });
    
    // Expiry formatting
    document.getElementById('cardExpiry')?.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  },
  
  // Populate review data
  populateReview() {
    // Address
    const addressHtml = `
      ${this.shippingData.firstName} ${this.shippingData.lastName}<br>
      ${this.shippingData.address}<br>
      ${this.shippingData.city}, ${this.shippingData.state} ${this.shippingData.zip}<br>
      ${this.shippingData.phone}
    `;
    document.getElementById('reviewAddress').innerHTML = addressHtml;
    
    // Card
    document.getElementById('reviewCardLast4').textContent = this.paymentData.last4;
    
    // Items
    const itemsHtml = Cart.getItems().map(item => `
      <div class="order-item-tag">
        ${item.product.name} × ${item.qty} - ${formatPrice(item.total)}
      </div>
    `).join('');
    document.getElementById('reviewItems').innerHTML = itemsHtml;
    
    // Summary
    const subtotal = Cart.getSubtotal();
    const shipping = Cart.getShipping();
    const tax = Cart.getTax();
    const total = subtotal + shipping + tax;
    
    document.getElementById('reviewSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('reviewShipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    document.getElementById('reviewTax').textContent = formatPrice(tax);
    document.getElementById('reviewTotal').textContent = formatPrice(total);
  },
  
  // Place order
  placeOrder() {
    // Simulate order processing
    const orderNumber = 'BB' + Date.now().toString().slice(-8);
    
    // Create order record
    const order = {
      id: orderNumber,
      date: new Date().toISOString(),
      status: 'processing',
      items: Cart.getItems(),
      subtotal: Cart.getSubtotal(),
      shipping: Cart.getShipping(),
      tax: Cart.getTax(),
      total: Cart.getSubtotal() + Cart.getShipping() + Cart.getTax(),
      shippingAddress: this.shippingData,
      payment: this.paymentData
    };
    
    // Save to orders
    Orders.addOrder(order);
    
    // Show success
    document.querySelectorAll('.checkout-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('checkoutSuccess').style.display = 'block';
    document.getElementById('orderNumber').textContent = orderNumber;
    
    // Clear cart
    Cart.clear();
  }
};

// Orders Module
const Orders = {
  orders: [],
  
  // Initialize
  init() {
    this.loadOrders();
  },
  
  // Load orders from localStorage
  loadOrders() {
    const ordersData = localStorage.getItem('coffeeOrders');
    if (ordersData) {
      this.orders = JSON.parse(ordersData);
    }
  },
  
  // Save orders
  saveOrders() {
    localStorage.setItem('coffeeOrders', JSON.stringify(this.orders));
  },
  
  // Add new order
  addOrder(order) {
    this.orders.unshift(order);
    this.saveOrders();
  },
  
  // Show orders modal
  show() {
    if (!Auth.isLoggedIn()) {
      App.showToast('Please login to view your orders', 'warning');
      Auth.showAuthModal('login');
      return;
    }
    
    this.render();
    document.getElementById('ordersModal').classList.add('show');
  },
  
  // Hide orders modal
  hide() {
    document.getElementById('ordersModal').classList.remove('show');
  },
  
  // Bind events
  bindEvents() {
    // Close modal
    document.querySelector('[data-close="ordersModal"]')?.addEventListener('click', () => {
      this.hide();
    });
  },
  
  // Render orders
  render() {
    const container = document.getElementById('ordersList');
    
    if (this.orders.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <p>No orders yet</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = this.orders.map(order => {
      const date = new Date(order.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const itemsList = order.items.map(item => 
        `${item.product.name} × ${item.qty}`
      ).join(', ');
      
      return `
        <div class="order-card">
          <div class="order-header">
            <span class="order-id">Order #${order.id}</span>
            <span class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
          </div>
          <div class="order-date">${date}</div>
          <div class="order-items-list">
            <span class="order-item-tag">${itemsList}</span>
          </div>
          <div class="order-footer">
            <span class="order-total">${formatPrice(order.total)}</span>
            <button class="order-action-btn">View Details →</button>
          </div>
        </div>
      `;
    }).join('');
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  Checkout.bindEvents();
  Orders.init();
  Orders.bindEvents();
});

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Cart, Checkout, Orders };
}
