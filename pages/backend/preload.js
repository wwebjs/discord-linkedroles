window.onload = function () {
  const style = (window.getComputedStyle(document.body) || document.body.currentStyle);
  if (style.display === "none") {
    document.body.style.display = "block";
  }
}