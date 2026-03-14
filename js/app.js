// Main Application for Brew & Bean Co.

const App = {
  // Current state
  currentCategory: 'all',
  currentSort: 'featured',
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 9,
  
  // Initialize the app
  init() {
    this.bindEvents();
    this.renderProducts();
    this.renderTestimonials();
    this.setupScrollEffects();
    this.setupModals();
  },
  
  // Bind all application events
  bindEvents() {
    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.setCategory(tab.dataset.category);
      });
    });
    
    // Sort select
    document.getElementById('sortSelect')?.addEventListener('change', (e) => {
      this.setSort(e.target.value);
    });
    
    // Search input
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      this.setSearch(e.target.value);
    });
    
    // Search button in header
    document.getElementById('searchBtn')?.addEventListener('click', () => {
      document.getElementById('searchBox').classList.toggle('show');
    });
    
    // Mobile menu toggle
    document.getElementById('menuToggle')?.addEventListener('click', () => {
      document.getElementById('nav').classList.toggle('show');
    });
    
    // Contact form
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleContactForm(e);
    });
    
    // Newsletter form
    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleNewsletter(e);
    });
    
    // Nav link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('nav').classList.remove('show');
      });
    });
    
    // Keyboard accessibility for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  },
  
  // Set current category
  setCategory(category) {
    this.currentCategory = category;
    this.currentPage = 1;
    
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });
    
    this.renderProducts();
  },
  
  // Set sort option
  setSort(sort) {
    this.currentSort = sort;
    this.renderProducts();
  },
  
  // Set search query
  setSearch(query) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.renderProducts();
  },
  
  // Render products
  renderProducts() {
    let filtered = getProductsByCategory(this.currentCategory);
    
    // Apply search
    if (this.searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.origin.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.flavorProfile.some(f => f.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
    
    // Apply sort
    filtered = sortProducts(filtered, this.currentSort);
    
    // Pagination
    const totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const paginated = filtered.slice(start, start + this.itemsPerPage);
    
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    if (paginated.length === 0) {
      grid.innerHTML = `
        <div class="cart-empty" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 1.2rem; color: var(--text-muted);">No products found</p>
        </div>
      `;
      this.renderPagination(0, totalPages);
      return;
    }
    
    grid.innerHTML = paginated.map(product => this.createProductCard(product)).join('');
    
    // Bind product card events
    this.bindProductEvents(grid);
    
    // Render pagination
    this.renderPagination(filtered.length, totalPages);
  },
  
  // Create product card HTML
  createProductCard(product) {
    const badgeHtml = product.badge ? `
      <div class="product-badges">
        <span class="${getBadgeClass(product.badge)}">${getBadgeText(product.badge)}</span>
      </div>
    ` : '';
    
    const priceHtml = product.originalPrice ? `
      <span class="price-current">${formatPrice(product.price)}</span>
      <span class="price-original">${formatPrice(product.originalPrice)}</span>
    ` : `
      <span class="price-current">${formatPrice(product.price)}</span>
    `;
    
    return `
      <div class="product-card" data-id="${product.id}">
        ${badgeHtml}
        <div class="product-image">
          <div class="product-image-bg" style="background: linear-gradient(135deg, ${this.getGradientColors(product.category)});"></div>
          <span class="product-image-icon">${product.image}</span>
          <div class="product-actions">
            <button class="product-action-btn quick-view" data-id="${product.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Quick View
            </button>
            <button class="product-action-btn add-to-cart" data-id="${product.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add
            </button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-category">${product.roast}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <span class="stars">${generateStars(product.rating)}</span>
            <span class="rating-count">(${product.reviews})</span>
          </div>
          <div class="product-footer">
            <div class="product-price">
              ${priceHtml}
            </div>
            <button class="add-cart-btn" data-id="${product.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  },
  
  // Get gradient colors based on category
  getGradientColors(category) {
    const colors = {
      light: '#E8DCC4 0%, #D4C4A8 100%',
      medium: '#8B7355 0%, #6B5344 100%',
      dark: '#3D2B1F 0%, #2A1F16 100%',
      decaf: '#A08060 0%, #806040 100%',
      espresso: '#4A3728 0%, #2E2218 100%'
    };
    return colors[category] || colors.medium;
  },
  
  // Bind product card events
  bindProductEvents(container) {
    // Add to cart buttons
    container.querySelectorAll('.add-cart-btn, .add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.id);
        Cart.add(productId);
      });
    });
    
    // Quick view buttons
    container.querySelectorAll('.quick-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.id);
        this.showQuickView(productId);
      });
    });
    
    // Product name click
    container.querySelectorAll('.product-name').forEach(name => {
      name.addEventListener('click', () => {
        const card = name.closest('.product-card');
        const productId = parseInt(card.dataset.id);
        this.showQuickView(productId);
      });
    });
    
    // Product image click
    container.querySelectorAll('.product-image').forEach(img => {
      img.addEventListener('click', () => {
        const card = img.closest('.product-card');
        const productId = parseInt(card.dataset.id);
        this.showQuickView(productId);
      });
    });
  },
  
  // Render pagination
  renderPagination(totalItems, totalPages) {
    const container = document.getElementById('productsPagination');
    if (!container) return;
    
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }
    
    let html = '';
    
    // Previous button
    html += `
      <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} data-page="prev">
        ←
      </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= this.currentPage - 1 && i <= this.currentPage + 1)
      ) {
        html += `
          <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
            ${i}
          </button>
        `;
      } else if (
        i === this.currentPage - 2 ||
        i === this.currentPage + 2
      ) {
        html += `<span>...</span>`;
      }
    }
    
    // Next button
    html += `
      <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="next">
        →
      </button>
    `;
    
    container.innerHTML = html;
    
    // Bind click events
    container.querySelectorAll('.pagination-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page === 'prev') {
          this.currentPage--;
        } else if (page === 'next') {
          this.currentPage++;
        } else {
          this.currentPage = parseInt(page);
        }
        this.renderProducts();
        // Scroll to products
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  },
  
  // Show quick view modal
  showQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const container = document.getElementById('quickviewContent');
    
    const priceHtml = product.originalPrice ? `
      <span class="quickview-price-current">${formatPrice(product.price)}</span>
      <span class="quickview-price-original">${formatPrice(product.originalPrice)}</span>
    ` : `
      <span class="quickview-price-current">${formatPrice(product.price)}</span>
    `;
    
    container.innerHTML = `
      <div class="quickview-image" style="background: linear-gradient(135deg, ${this.getGradientColors(product.category)});">
        ${product.image}
      </div>
      <div class="quickview-details">
        <div class="quickview-category">${product.roast} • ${product.origin}</div>
        <h2 class="quickview-title">${product.name}</h2>
        <div class="quickview-rating">
          <span class="stars">${generateStars(product.rating)}</span>
          <span>${product.rating} (${product.reviews} reviews)</span>
        </div>
        <div class="quickview-price">
          ${priceHtml}
        </div>
        <p class="quickview-desc">${product.description}</p>
        
        <div class="quickview-options">
          <div class="quickview-option">
            <label>Flavor Notes</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${product.flavors.map(f => `<span class="product-item-tag" style="padding: 4px 12px; background: var(--accent-light); border-radius: 20px; font-size: 0.85rem;">${f}</span>`).join('')}
            </div>
          </div>
          <div class="quickview-option">
            <label>Quantity</label>
            <div class="quickview-quantity">
              <button class="qty-btn" id="qvDec">−</button>
              <span class="qty-value" id="qvQty">1</span>
              <button class="qty-btn" id="qvInc">+</button>
            </div>
          </div>
        </div>
        
        <div class="quickview-actions">
          <button class="btn btn-primary btn-full" id="qvAddCart" data-id="${product.id}">
            Add to Cart - ${formatPrice(product.price)}
          </button>
        </div>
      </div>
    `;
    
    // Bind quick view events
    let qty = 1;
    const qtyDisplay = document.getElementById('qvQty');
    const qtyPrice = document.getElementById('qvAddCart');
    
    document.getElementById('qvDec')?.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        qtyDisplay.textContent = qty;
        qtyPrice.textContent = `Add to Cart - ${formatPrice(product.price * qty)}`;
      }
    });
    
    document.getElementById('qvInc')?.addEventListener('click', () => {
      qty++;
      qtyDisplay.textContent = qty;
      qtyPrice.textContent = `Add to Cart - ${formatPrice(product.price * qty)}`;
    });
    
    document.getElementById('qvAddCart')?.addEventListener('click', () => {
      Cart.add(productId, qty);
      document.getElementById('quickViewModal').classList.remove('show');
    });
    
    document.getElementById('quickViewModal').classList.add('show');
  },
  
  // Render testimonials
  renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    
    grid.innerHTML = testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="testimonial-avatar">${t.initial}</div>
          <div class="testimonial-info">
            <h4>${t.name}</h4>
            <div class="testimonial-rating">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
          </div>
        </div>
        <p class="testimonial-text">"${t.text}"</p>
      </div>
    `).join('');
  },
  
  // Setup scroll effects
  setupScrollEffects() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  },
  
  // Setup modal functionality
  setupModals() {
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', () => {
        this.closeAllModals();
      });
    });
    
    // Close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.close;
        document.getElementById(modalId)?.classList.remove('show');
      });
    });
  },
  
  // Close all modals
  closeAllModals() {
    document.querySelectorAll('.modal.show').forEach(modal => {
      modal.classList.remove('show');
    });
  },
  
  // Handle contact form
  handleContactForm(e) {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    
    this.showToast(`Thanks ${name}! We'll contact you at ${email} soon.`, 'success');
    e.target.reset();
  },
  
  // Handle newsletter
  handleNewsletter(e) {
    const email = e.target.querySelector('input').value;
    this.showToast(`Thanks for subscribing with ${email}!`, 'success');
    e.target.reset();
  },
  
  // Show toast notification
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('hiding'), 3000);
    
    // Remove from DOM
    setTimeout(() => toast.remove(), 3500);
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
