// Category Page JavaScript

import Swiper from "swiper/bundle"
import "swiper/css/bundle"

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Category Banner Slider
  const categorySwiper = new Swiper(".category-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".category-swiper .swiper-pagination",
      clickable: true,
    },
  })

  // Initialize Featured Items Slider
  const featuredSwiper = new Swiper(".featured-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".featured-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".featured-swiper .swiper-button-next",
      prevEl: ".featured-swiper .swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  })

  // Filter toggle for mobile
  const filterToggle = document.querySelector(".filter-toggle")
  const filterBody = document.querySelector(".filter-body")

  if (filterToggle && filterBody) {
    filterToggle.addEventListener("click", () => {
      filterBody.classList.toggle("active")
      filterToggle.classList.toggle("active")
    })
  }

  // Price range slider
  const priceRange = document.getElementById("price-range")
  const priceMin = document.getElementById("price-min")
  const priceMax = document.getElementById("price-max")

  if (priceRange && priceMin && priceMax) {
    priceRange.addEventListener("input", () => {
      const value = priceRange.value
      priceMax.textContent = `$${Number.parseInt(value).toLocaleString()}`
    })
  }

  // Category filter checkboxes
  const categoryCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]')
  const auctionCards = document.querySelectorAll(".auction-card[data-category]")

  if (categoryCheckboxes.length > 0 && auctionCards.length > 0) {
    function updateFilters() {
      const selectedCategories = Array.from(categoryCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value)

      auctionCards.forEach((card) => {
        const category = card.getAttribute("data-category")
        if (selectedCategories.includes(category)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })

      // Update item count
      const visibleItems = document.querySelectorAll('.auction-card[data-category]:not([style*="display: none"])')
      const itemsCount = document.getElementById("items-count")
      if (itemsCount) {
        itemsCount.textContent = visibleItems.length
      }
    }

    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateFilters)
    })
  }

  // Reset filters button
  const resetFiltersButton = document.getElementById("reset-filters")

  if (resetFiltersButton) {
    resetFiltersButton.addEventListener("click", () => {
      // Reset checkboxes
      categoryCheckboxes.forEach((checkbox) => {
        checkbox.checked = true
      })

      // Reset price range
      if (priceRange) {
        priceRange.value = priceRange.max
        priceMax.textContent = `$${Number.parseInt(priceRange.max).toLocaleString()}`
      }

      // Show all items
      auctionCards.forEach((card) => {
        card.style.display = "block"
      })

      // Update item count
      const itemsCount = document.getElementById("items-count")
      const totalItems = document.getElementById("total-items")
      if (itemsCount && totalItems) {
        itemsCount.textContent = totalItems.textContent
      }
    })
  }

  // Apply filters button
  const applyFiltersButton = document.getElementById("apply-filters")

  if (applyFiltersButton) {
    applyFiltersButton.addEventListener("click", () => {
      if (categoryCheckboxes.length > 0 && auctionCards.length > 0) {
        updateFilters()
      }

      // If on mobile, close the filter panel
      if (window.innerWidth < 768 && filterBody && filterBody.classList.contains("active")) {
        filterBody.classList.remove("active")
        filterToggle.classList.remove("active")
      }
    })
  }

  // Pagination
  const paginationButtons = document.querySelectorAll(".pagination-button")

  if (paginationButtons.length > 0) {
    paginationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        paginationButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        button.classList.add("active")

        // In a real application, this would load the next page of items
        // For this demo, we'll just scroll to the top of the items grid
        const itemsGrid = document.querySelector(".items-grid")
        if (itemsGrid) {
          window.scrollTo({
            top: itemsGrid.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  }
})

