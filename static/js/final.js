const submitbtn = document.getElementById('submitButton')
submitbtn.addEventListener('click',()=>{
    console.log("hi")
    const phone = document.getElementById('phone').value
    const address = document.getElementById('address').value
    const name = document.getElementById('name').value
    
    localStorage.setItem('userdetails',JSON.stringify({'name':name,'phone':phone,'address':address}))
})


submitbtn.addEventListener('click',()=>{
  var data = {};
  var dishlist=[]
  price=localStorage.getItem('totprice')
  if(price==null) window.location.href=`/restaurant/${restid}`
  restid=localStorage.getItem('restid')
  userdetails=localStorage.getItem('userdetails')
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if(!(key.charAt(0)<='9' && key.charAt(0)>='0') ) continue;
    var value = localStorage.getItem(key);
    dishlist.push(value)
}
data['user']=userdetails
data['restid']=restid
data['dishlist']=dishlist
data['finalprice']=price
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