

function priorityClick(button){
  if (button.value === "YES"){
    document.getElementById("low").style.display = "block"; //hide or show
    document.getElementById("medium").style.display = "block";
    document.getElementById("high").style.display = "block";
    document.getElementById("low-label").style.display = "block"; //hide or show
    document.getElementById("medium-label").style.display = "block";
    document.getElementById("high-label").style.display = "block";
  }
  if (button.value === "NO"){
    document.getElementById("low").style.display = "none"; //hide or show
    document.getElementById("medium").style.display = "none";
    document.getElementById("high").style.display = "none";
    document.getElementById("low-label").style.display = "none"; //hide or show
    document.getElementById("medium-label").style.display = "none";
    document.getElementById("high-label").style.display = "none";
  }
}
