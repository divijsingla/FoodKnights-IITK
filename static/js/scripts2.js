let giveprompt=()=>{
  console.log("your previous order will be deleted")
  return 1;
}

var addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      console.log("hi");
      let restid=button.dataset.restid
      var item = {
        'itemId' : button.dataset.id,
        'itemName' : button.dataset.name,
        'itemPrice' : button.dataset.price
      }
    
    console.log(item.itemId,item.itemName,item.itemPrice)
    let status=-1
    if(localStorage.getItem("restid")!=null){
      if(localStorage.getItem("restid")!=restid) {status = giveprompt();}
    }
    console.log(status)
    if(status==-1){
      localStorage.setItem("restid",restid)
      localStorage.setItem(item.itemId, JSON.stringify(item));
      }
    else if(status==1){
    localStorage.clear();
    localStorage.setItem("restid",restid)
    localStorage.setItem(item.itemId, JSON.stringify(item));
    }
    })
  })




  const addtodatabase= (itemId,itemName,itemPrice) => {
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
  }

  const cartbutton = document.getElementById('cart');


  cartbutton.addEventListener('click',(event)=>{
    event.preventDefault()
    console.log("Hii");
    window.location.href = '/cart';
  })