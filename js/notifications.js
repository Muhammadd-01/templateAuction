// Notifications Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
    // Filter notifications
    const filterButtons = document.querySelectorAll(".filter-btn")
    const notificationItems = document.querySelectorAll(".notification-item")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        const filterValue = button.getAttribute("data-filter")
  
        // Show/hide notifications based on filter
        notificationItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-type") === filterValue) {
            item.style.display = "flex"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  
    // Mark notifications as read when clicked
    notificationItems.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.remove("unread")
      })
    })
  
    // Load more button functionality
    const loadMoreButton = document.querySelector(".load-more .btn")
  
    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", () => {
        // In a real application, this would load more notifications from the server
        // For this demo, we'll just show a message
        loadMoreButton.textContent = "No more notifications"
        loadMoreButton.disabled = true
  
        setTimeout(() => {
          loadMoreButton.textContent = "Load More"
          loadMoreButton.disabled = false
        }, 2000)
      })
    }
  })
  
  