var xhr = new XMLHttpRequest();
xhr.open('get', '/employee/checkRootLogin', false);
xhr.send(null);
var result = JSON.parse(xhr.responseText);
if (!result.success) {
  location.href = 'login.html'
}

