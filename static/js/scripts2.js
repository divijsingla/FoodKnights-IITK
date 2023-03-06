
var addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      console.log("hi");
    var itemId = button.dataset.id;
    var itemName = button.dataset.name;
    var itemPrice = button.dataset.price;
    console.log(itemId,itemName,itemPrice)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/add-to-cart');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send(JSON.stringify({id: itemId, name: itemName, price: itemPrice}));
  });
});