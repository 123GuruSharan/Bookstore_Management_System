// Existing code...
const noResults = document.getElementById('noResults');

function renderBooks() {
    const query = searchInput.value.toLowerCase();
    bookList.innerHTML = "";

    const filtered = books.filter(book => {
        const matchSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
        const matchGenre = selectedGenre === "All" || book.genres.includes(selectedGenre);
        return matchSearch && matchGenre;
    });

    if (filtered.length === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
    }

    filtered.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <div class="info">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
                <p>${renderStars(book.rating)} (${book.rating})</p>
                <div class="tag-list">${book.genres.map(g => `<span>${g}</span>`).join("")}</div>
                <p class="price">${book.price}</p>
            </div>
        `;
        bookList.appendChild(card);
    });
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(i < fullStars ? '<i class="fas fa-star" style="color: gold;"></i>' : '<i class="far fa-star"></i>');
    }
    return stars.join("");
}

// Dark mode toggle
document.getElementById("themeSwitch").addEventListener("change", function () {
    document.body.classList.toggle("dark");
});

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert('Please enter both username/email and password.');
            return;
        }

        // For demonstration, just alert success
        alert(`Login successful for user: ${username}`);

        // Clear form fields
        loginForm.reset();
    });
}

const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.getElementById('cartList');
const cartCount = document.getElementById('cartCount');

function renderCart() {
  if (!cartList || !cartCount) return;

  if (cartItems.length === 0) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    cartCount.textContent = '';
    return;
  }

  cartList.innerHTML = cartItems.map(book => `
    <div class="book-card">
      <img src="${book.img}" alt="${book.title}" />
      <div class="info">
        <div class="title">${book.title}</div>
        <div class="author">${book.author}</div>
        <div class="price">${book.price}</div>
      </div>
    </div>
  `).join('');

  cartCount.textContent = cartItems.length;
}

renderCart();

const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      genres: ["Non-Fiction", "Self-Help"],
      rating: 4.9,
      price: "$16.49",
      img: "https://images-na.ssl-images-amazon.com/images/I/81gepf1eMqL.jpg"
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      genres: ["Fiction", "Philosophy"],
      rating: 4.7,
      price: "$10.89",
      img: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg"
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genres: ["Finance", "Non-Fiction"],
      rating: 4.8,
      price: "$14.75",
      img: "https://images-na.ssl-images-amazon.com/images/I/71KilybDOoL.jpg"
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      genres: ["Finance", "Self-Help"],
      rating: 4.6,
      price: "$12.29",
      img: "https://images-na.ssl-images-amazon.com/images/I/61Iz2yy2CKL.jpg"
    },
    {
      title: "Ikigai",
      author: "Francesc Miralles",
      genres: ["Self-Help", "Philosophy"],
      rating: 4.5,
      price: "$9.99",
      img: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"
    }
  ];
  
  const bookList = document.getElementById('bookList');
  
  function displayBooks(filteredBooks) {
    bookList.innerHTML = '';
    filteredBooks.forEach(book => {
      const genresHTML = book.genres.map(g => `<span>${g}</span>`).join('');
      bookList.innerHTML += `
        <div class="book-card">
          <img src="${book.img}" alt="${book.title}" />
          <div class="info">
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="rating">★ ${book.rating}</div>
            <div class="genre-labels">${genresHTML}</div>
            <div class="price">${book.price}</div>
            <button onclick="addToCart('${book.title}')">Add to Cart
            </button>
          </div>
        </div>`;
    });
  }
  
  function addToCart(bookTitle) {
    alert(`${bookTitle} added to cart!`);
  }
  
  document.querySelectorAll('.genre-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const genre = btn.dataset.genre;
      if (genre === 'all') displayBooks(books);
      else displayBooks(books.filter(book => book.genres.includes(genre)));
    });
  });
  
  document.getElementById('searchInput').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const genre = document.querySelector('.genre-btn.active').dataset.genre;
    let filtered = books.filter(book => book.title.toLowerCase().includes(term));
    if (genre !== 'all') {
      filtered = filtered.filter(book => book.genres.includes(genre));
    }
    displayBooks(filtered);
  });
  
  displayBooks(books);
  