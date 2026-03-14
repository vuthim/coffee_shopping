// Authentication Module for Brew & Bean Co.

const Auth = {
  // Current user state
  currentUser: null,
  
  // Initialize auth
  init() {
    this.loadUser();
    this.bindEvents();
  },
  
  // Load user from localStorage
  loadUser() {
    const userData = localStorage.getItem('coffeeUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.updateUI();
    }
  },
  
  // Save user to localStorage
  saveUser() {
    if (this.currentUser) {
      localStorage.setItem('coffeeUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('coffeeUser');
    }
  },
  
  // Bind authentication events
  bindEvents() {
    // Login button
    document.getElementById('loginBtn')?.addEventListener('click', () => {
      this.showAuthModal('login');
    });
    
    // Signup button
    document.getElementById('signupBtn')?.addEventListener('click', () => {
      this.showAuthModal('signup');
    });
    
    // Auth tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchAuthTab(tab.dataset.tab);
      });
    });
    
    // Login form submission
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });
    
    // Signup form submission
    document.getElementById('signupForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignup();
    });
    
    // User dropdown toggle
    document.getElementById('userBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('userDropdown').classList.toggle('show');
    });
    
    // User dropdown actions
    document.getElementById('userDropdown')?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const action = link.dataset.action;
        this.handleDropdownAction(action);
      });
    });
    
    // Close dropdown on outside click
    document.addEventListener('click', () => {
      document.getElementById('userDropdown')?.classList.remove('show');
    });
    
    // Logout
    document.querySelector('[data-action="logout"]')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.logout();
    });
  },
  
  // Show auth modal
  showAuthModal(tab = 'login') {
    const modal = document.getElementById('authModal');
    modal.classList.add('show');
    this.switchAuthTab(tab);
  },
  
  // Hide auth modal
  hideAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('show');
    // Reset forms
    document.getElementById('loginForm')?.reset();
    document.getElementById('signupForm')?.reset();
  },
  
  // Switch between login and signup tabs
  switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('signupForm').style.display = tab === 'signup' ? 'block' : 'none';
  },
  
  // Handle login
  handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe')?.checked;
    
    // Simple validation
    if (!email || !password) {
      App.showToast('Please enter email and password', 'error');
      return;
    }
    
    // Simulate API call - in production, this would be a real server call
    // For demo, accept any email with password length > 0
    if (password.length > 0) {
      this.currentUser = {
        id: Date.now(),
        name: email.split('@')[0].replace(/[.]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email: email,
        avatar: email.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString()
      };
      
      this.saveUser();
      this.updateUI();
      this.hideAuthModal();
      App.showToast(`Welcome back, ${this.currentUser.name}!`, 'success');
    } else {
      App.showToast('Invalid credentials', 'error');
    }
  },
  
  // Handle signup
  handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirm').value;
    
    // Validation
    if (!name || !email || !password) {
      App.showToast('Please fill in all fields', 'error');
      return;
    }
    
    if (password.length < 8) {
      App.showToast('Password must be at least 8 characters', 'error');
      document.getElementById('signupPassword').classList.add('invalid');
      return;
    }
    
    if (password !== confirmPassword) {
      App.showToast('Passwords do not match', 'error');
      document.getElementById('signupConfirm').classList.add('invalid');
      return;
    }
    
    // Create user
    this.currentUser = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: name.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString()
    };
    
    this.saveUser();
    this.updateUI();
    this.hideAuthModal();
    App.showToast('Account created successfully!', 'success');
  },
  
  // Handle user dropdown actions
  handleDropdownAction(action) {
    document.getElementById('userDropdown').classList.remove('show');
    
    switch (action) {
      case 'orders':
        Orders.show();
        break;
      case 'profile':
        App.showToast('Profile settings coming soon!', 'info');
        break;
      case 'settings':
        App.showToast('Settings coming soon!', 'info');
        break;
      case 'logout':
        this.logout();
        break;
    }
  },
  
  // Logout
  logout() {
    this.currentUser = null;
    this.saveUser();
    this.updateUI();
    App.showToast('You have been logged out', 'success');
  },
  
  // Update UI based on auth state
  updateUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    
    if (this.currentUser) {
      authButtons.style.display = 'none';
      userMenu.style.display = 'flex';
      userAvatar.textContent = this.currentUser.avatar;
      userName.textContent = this.currentUser.name;
    } else {
      authButtons.style.display = 'flex';
      userMenu.style.display = 'none';
    }
  },
  
  // Check if user is logged in
  isLoggedIn() {
    return this.currentUser !== null;
  },
  
  // Get current user
  getUser() {
    return this.currentUser;
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Auth;
}
