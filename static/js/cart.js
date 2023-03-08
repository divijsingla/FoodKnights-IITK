let box = document.getElementsByClassName('cartWrap')[0];
let totalprice=0;


for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  if( !(key.charAt(0)<='9' && key.charAt(0)>='0') ) continue;
  var value = localStorage.getItem(key);
  value = JSON.parse(value);
  console.log(value);
  totalprice+=parseFloat(value.itemPrice);
  box.innerHTML+=`<li class="items odd">
  <div class="infoWrap"> 
<div class="cartSection">
 
<img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
<p class="itemNumber">#QUE-007544-002</p>
<h3>${value.itemName}</h3>

<p> <input type="text"  class="qty" placeholder="3"/> Rs. ${value.itemPrice}</p>


</div>  


<div class="prodTotal cartSection">
<p></p>
</div>
         <div class="cartSection removeWrap">
<a href="#" class="remove">x</a>
</div>
   </div>
</li>`

}

let total = document.getElementById('totalprice')
total.innerText='Rs. '+ totalprice.toFixed(2);

let final = document.getElementById('checkout')
final.addEventListener('click',()=>{
  var data = {};
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if( !(key.charAt(0)<='9' && key.charAt(0)>='0') ) continue;
    var value = localStorage.getItem(key);
    data[key] = value;
}

// Send data to server
fetch('/save_data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    console.log(response);
})
.catch(error => {
    console.error(error);
});
})