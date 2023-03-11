const submit = () =>{
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

// Loop through each checked checkbox
let item = localStorage.getItem('temp')
let restid = localStorage.getItem('restid')
var newitem={};
if(item!=null){
  newitem=JSON.parse(item)
  localStorage.removeItem('temp')
  newitem['addons']=[]

checkboxes.forEach((checkbox) => {
  // Do something with the checked checkbox
  newitem['addons'].push(checkbox.value)
  console.log(`Checkbox with value ${checkbox.value} is checked.`);
});

const myHash = newitem.addons.reduce((hash, element) => {
    hash[element] = element.length;
    return hash;
  }, {});
  console.log(myHash)
localStorage.setItem(`${newitem.itemId}${newitem.opt1}${newitem.opt2}${myHash}`,JSON.stringify(newitem))
}
window.location.href = `/restaurant/${restid}`
}