// Enhanced Home Page JavaScript

import Swiper from "swiper/bundle"
import "swiper/css/bundle"

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Hero Slider
  const heroSwiper = new Swiper(".hero-swiper", {
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
      el: ".hero-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".hero-swiper .swiper-button-next",
      prevEl: ".hero-swiper .swiper-button-prev",
    },
  })

  // Initialize Featured Auctions Slider
  const auctionSwiper = new Swiper(".auction-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".auction-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".auction-swiper .swiper-button-next",
      prevEl: ".auction-swiper .swiper-button-prev",
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

  // Initialize Trending Items Slider
  const trendingSwiper = new Swiper(".trending-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".trending-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".trending-swiper .swiper-button-next",
      prevEl: ".trending-swiper .swiper-button-prev",
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

  // Initialize Testimonials Slider
  const testimonialSwiper = new Swiper(".testimonial-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonial-swiper .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  })

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".step, .category-card, .auction-card, .testimonial-card")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementBottom = element.getBoundingClientRect().bottom

      // Check if element is in viewport
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add("animate-fade-in")
      }
    })
  }

  // Run animation check on load and scroll
  animateOnScroll()
  window.addEventListener("scroll", animateOnScroll)
})

