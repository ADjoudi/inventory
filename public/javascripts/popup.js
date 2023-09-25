const popupcontainer = document.getElementsByClassName("popup-container")[0];
const popup = document.getElementsByClassName("popup")[0];

popupcontainer.addEventListener("click", (e) => {
  if (e.target === e.currentTarget)
    window.open(`/${popupcontainer.getAttribute("name")}/`, "_self");
});
