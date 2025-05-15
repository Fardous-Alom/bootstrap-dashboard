$(document).ready(function () {
  const isCollapsed = localStorage.getItem("sidebar-collapsed") === "true";

  if (isCollapsed) {
    $(".sidebar").addClass("collapsed");
    $(".main-content").addClass("collapsed");
    $(".footer").addClass("collapsed");
    $(".sm-logo").removeClass("d-none");
    $(".lg-logo").addClass("d-none");
  }

  $(".toggle-sidebar").click(function () {
    $(".sidebar").toggleClass("collapsed");
    $(".main-content").toggleClass("collapsed");
    $(".footer").toggleClass("collapsed");
    $(".sm-logo").toggleClass("d-none");
    $(".lg-logo").toggleClass("d-none");

    const isNowCollapsed = $(".sidebar").hasClass("collapsed");
    localStorage.setItem("sidebar-collapsed", isNowCollapsed);
  });

  $(".nav-link").click(function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
    const page = $(this).data("page");
    loadPage(page);
  });

  loadPage("dashboard");
});

function loadPage(page) {
  $(".breadcrumb .active").text(capitalize(page));
  $("h1").text(capitalize(page));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
