let giveprompt=()=>{
  console.log("your previous order will be deleted")
  return 1;
}


var addToCartButtons = document.querySelectorAll('.delfromcart');
// addToCartButtons.forEach(function(button){
//   button.addEventListener('click',()=>{
//     console.log("delete item")
// } )

const changebutton =(button)=>{
  button.innerText='+'
  firstp=button.parentNode;
  txt = firstp.querySelectorAll('span')[0].innerText; 
  if(txt=='') firstp.querySelectorAll('span')[0].innerText =`  1  `;
  else {
    txt=parseInt(txt)+1
    firstp.querySelectorAll('span')[0].innerText=`  ${txt}  `
  }
  firstp.querySelectorAll('.delfromcart')[0].innerText='-'
  firstp.querySelectorAll('.delfromcart')[0].removeAttribute('hidden')
  // else firstp.querySelectorAll('span')[0].innerText =txt+1;
  // firstp.innerHTML+=`<a class="btn btn-outline-dark mt-auto" data-id="{{ dish.id }}" data-name="{{ dish.name }}" data-price="{{ dish.price }}" data-restid="{{restid}}" data-addons="{{ dish.addons }}" data-variants="{{dish.variants}}" >-</a>`

}

var addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function(button) {
  
  if(localStorage.getItem('restid')!=null && parseInt(localStorage.getItem('restid'))==parseInt(button.dataset.restid)){
      if(localStorage.getItem(button.dataset.id)!=null) changebutton(button)
  }
  
  button.addEventListener('click', function() {
    console.log("hi");
    variants=button.dataset.variants
    addons=button.dataset.addons
    let restid=button.dataset.restid
    var item = {
        'itemId' : button.dataset.id,
        'itemName' : button.dataset.name,
        'itemPrice' : button.dataset.price,
        'quantity': 1
      }
    if(variants!=0) window.location.href = `/restaurant/${restid}/${item.itemId}/${variants}`
    else{
    let status=-1
    if(localStorage.getItem("restid")!=null){
      if(localStorage.getItem("restid")!=restid) {status = giveprompt();}
    }
    console.log(status)
    if(status==-1){
      localStorage.setItem("restid",restid)
      if(localStorage.getItem(item.itemId)!=null) {
        prevdata = JSON.parse(localStorage.getItem(item.itemId))
        qty = parseInt(prevdata.quantity)+1
        prevdata.quantity=qty
        localStorage.setItem(item.itemId,JSON.stringify(prevdata))

      }
      else localStorage.setItem(item.itemId, JSON.stringify(item));
      changebutton(button)
      }
    else if(status==1){
    localStorage.clear();
    localStorage.setItem("restid",restid)
    localStorage.setItem(item.itemId, JSON.stringify(item));
    changebutton(button)
    }
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