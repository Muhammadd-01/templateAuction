// Enhanced Main JavaScript File

// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")
const backToTopButton = document.getElementById("back-to-top")
const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")
const searchResults = document.getElementById("search-results")
const mobileDropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle")

// Sample data for search functionality
const auctionItems = [
  {
    id: 1,
    title: "Vintage Leica Camera",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    price: 1250,
  },
  {
    id: 2,
    title: "Antique Pocket Watch",
    category: "Collectibles",
    image: "https://via.placeholder.com/400x300",
    price: 850,
  },
  {
    id: 3,
    title: "Rare First Edition Book",
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    price: 1250,
  },
  {
    id: 4,
    title: "Vintage Leather Sofa",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    price: 850,
  },
  {
    id: 5,
    title: "Smart 4K TV - 55 inch",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
    price: 520,
  },
  {
    id: 6,
    title: "Antique Writing Desk",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80",
    price: 1800,
  },
]

// Theme Toggle
function initThemeToggle() {
  // Check for saved theme preference or use system preference
  const savedTheme =
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

  // Apply the saved theme
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark")
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    localStorage.setItem("theme", currentTheme)
  })
}

// Mobile Menu Toggle
function initMobileMenu() {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")
  })

  // Mobile dropdown toggles
  mobileDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault()
      const dropdownMenu = toggle.nextElementSibling
      dropdownMenu.classList.toggle("active")

      // Toggle icon rotation
      const icon = toggle.querySelector("i")
      if (icon) {
        icon.style.transform = dropdownMenu.classList.contains("active") ? "rotate(180deg)" : "rotate(0)"
      }
    })
  })
}

// Back to Top Button
function initBackToTop() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Search Functionality
function initSearch() {
  if (!searchForm || !searchInput || !searchResults) return

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim()

    if (query.length < 2) {
      searchResults.classList.remove("active")
      return
    }

    const filteredItems = auctionItems.filter(
      (item) => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query),
    )

    if (filteredItems.length > 0) {
      renderSearchResults(filteredItems)
      searchResults.classList.add("active")
    } else {
      searchResults.classList.remove("active")
    }
  })

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target)) {
      searchResults.classList.remove("active")
    }
  })

  // Handle search form submission
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const query = searchInput.value.trim()

    if (query) {
      window.location.href = `search-results.html?query=${encodeURIComponent(query)}`
    }
  })
}

// Render search results
function renderSearchResults(items) {
  searchResults.innerHTML = ""

  items.slice(0, 5).forEach((item) => {
    const resultItem = document.createElement("a")
    resultItem.href = `item-details.html?id=${item.id}`
    resultItem.className = "search-result-item"

    resultItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="search-result-image">
            <div class="search-result-info">
                <h4>${item.title}</h4>
                <p>${item.category} - $${item.price.toLocaleString()}</p>
            </div>
        `

    searchResults.appendChild(resultItem)
  })
}

// Update countdown timers
function updateCountdowns() {
  const countdowns = document.querySelectorAll(".countdown")

  countdowns.forEach((countdown) => {
    const endDate = countdown.getAttribute("data-end")
    if (!endDate) return

    const endTime = new Date(endDate).getTime()
    const now = new Date().getTime()
    const diff = endTime - now

    if (diff <= 0) {
      countdown.textContent = "Ended"
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) {
      countdown.textContent = `${days}d ${hours}h`
    } else if (hours > 0) {
      countdown.textContent = `${hours}h ${minutes}m`
    } else {
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      countdown.textContent = `${minutes}m ${seconds}s`
    }
  })
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle()
  initMobileMenu()
  initBackToTop()
  initSearch()

  // Update countdowns every second
  updateCountdowns()
  setInterval(updateCountdowns, 1000)
})

