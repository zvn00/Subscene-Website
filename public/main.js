$(document).ready(function () {
  if ($(".search__input").length > 0) {
    function performSearch() {
      const query = $(".search__input").val();

      if (query.trim() !== "") {
        $(".search__input").removeClass("error");
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      } else {
        $(".search__input").addClass("error");
      }
    }

    $(".search__input").on("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
      }
    });

    $(".SearchBtn").on("click", function (event) {
      event.preventDefault();
      console.log("clicked");
      performSearch();
    });

  }

  if ($("#dataTable").length > 0) {
    var table = $("#dataTable").DataTable({
      pageLength: 100,
      pagingType: "simple_numbers",
      responsive: true,
    });

    function populateLanguageFilter() {
      var languageFilter = $("#language-select");
      languageFilter.empty().append('<option value="">All</option>');

      table
        .column(0)
        .data()
        .unique()
        .sort()
        .each(function (language) {
          languageFilter.append(
            '<option value="' + language + '">' + language + "</option>"
          );
        });
    }

    populateLanguageFilter();

    $("#language-select").on("change", function () {
      var selectedLanguage = $(this).val();

      if (selectedLanguage === "") {
        table.column(0).search("").draw();
      } else {
        table.column(0).search(selectedLanguage).draw();
      }
    });
  }

  // Recent Subtitles Table
  if ($("#recentDataTable").length > 0) {
    $("#recentDataTable").DataTable({
      paging: false,
      searching: false,
      responsive: true,
    });
  }

  // Navigation Bar Code 
  const navbarMenu = document.getElementById("menu");
  const burgerMenu = document.getElementById("burger");
  const bgOverlay = document.querySelector(".overlay");

  if (burgerMenu && bgOverlay) {
    burgerMenu.addEventListener("click", () => {
      navbarMenu.classList.add("is-active");
      bgOverlay.classList.toggle("is-active");
    });

    bgOverlay.addEventListener("click", () => {
      navbarMenu.classList.remove("is-active");
      bgOverlay.classList.toggle("is-active");
    });
  }

  // Close Navbar Menu on Links Click
  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("is-active");
      bgOverlay.classList.remove("is-active");
    });
  });

  if ($(".search-input").length > 0) {
    function performSearch() {
      const query = $(".search-input").val();

      if (query.trim() !== "") {
        $(".search-input").removeClass("error");
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      } else {
        $(".search-input").addClass("error");
      }
    }

    $(".search-input").on("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
      }
    });

  }

  // Open and Close Search Bar Toggle
  const searchBlock = document.querySelector(".search-block");
  const searchToggle = document.querySelector(".search-toggle");
  const searchCancel = document.querySelector(".search-cancel");

  if (searchToggle && searchCancel) {
    $(document).on("click", ".search-toggle", function () {
      searchBlock.classList.add("is-active");
    });

    $(document).on("click", ".search-cancel", function () {
      searchBlock.classList.remove("is-active");
    });
  }
});
