let giveprompt=()=>{
    console.log("your previous order will be deleted")
    return 1;
  }

const submit = ()=>{
    const selectedOption = document.querySelector('input[name="same"]:checked').value;
    const url = window.location.href;
    const segments = url.split('/');
    const stringsBetweenSlashes = [];
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (segment !== '' && segment !== 'http:' && segment !== 'https:' && segment !== '') {
          stringsBetweenSlashes.push(segment);
        }
      }
      
    let restid = stringsBetweenSlashes[2]
    let dishid= stringsBetweenSlashes[3]
    let dep= parseInt(stringsBetweenSlashes[4])-1
    if(dep==0){
        // variants are done.

        let opt1=parseInt(stringsBetweenSlashes[5])
        let item={
            'itemId' : dishid,
            'itemName' : "",
            'itemPrice' : 0,
            'opt1':opt1,
            'opt2':selectedOption
        }
        let status=-1
    if(localStorage.getItem("restid")!=null){
      if(localStorage.getItem("restid")!=restid) {status = giveprompt();}
    }
    console.log(status)
    if(status==-1){
      localStorage.setItem("restid",restid)
      localStorage.setItem(`temp`, JSON.stringify(item));
      }
    else if(status==1){
    localStorage.clear();
    localStorage.setItem("restid",restid)
    localStorage.setItem(`temp`, JSON.stringify(item));
    }
    
    if(!isNaN(opt1)) {
        window.location.href = `/restaurant/${restid}/${dishid}/${opt1}/${selectedOption}/addons`}
    else window.location.href = `/restaurant/${restid}/${dishid}/${selectedOption}/addons`
    }
    
    else window.location.href = `/restaurant/${restid}/${dishid}/${dep}/${selectedOption}`
    
}