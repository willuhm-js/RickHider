document.getElementById("form").onsubmit = function(e) {
  e.preventDefault();
  let url = `${window.location.origin}/roller?`
  const arr = document.querySelectorAll ("input:not(input[type=submit])");
  for (query of arr) {
    if (query.value) {
      url += `${query.id}=${encodeURIComponent(query.value)}&`
    }
  }

}