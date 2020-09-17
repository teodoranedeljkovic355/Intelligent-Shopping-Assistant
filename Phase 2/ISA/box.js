
var arr=[];
var imin=false;
var boxes=['','','','',''];
function getRand(min, max) {
  return Math.random() * (max - min) + min;
}
class data {
  constructor(cl,id) {
    this.cl = cl;
    this.id = id;
    this.price=0;
  }
}
  function boxClick(cl,id){
    cl=boxes[id];
    if(imin==false){
      imin=true;
      var str="Products that you picked: ";
      var c=new data(cl,id);
    var elem=undefined;
    for(var i=0;i<arr.length;i++){
      if(arr[i].cl==cl&&arr[i].id==id){
        elem=arr[i];
        break;
      }
    }
    if(elem!=undefined){
    }else{
      c.price=getRand(1,10).toFixed(2);
      arr.push(c);
    }
    setTimeout(function(){
      imin=false;
    }, 0);
    var total=0;
    for(var i=0;i<arr.length;i++){
      total+=parseFloat(arr[i].price);
      str+=arr[i].cl+"("+arr[i].id+")"+"[price: "+arr[i].price+"], ";
    }
    document.getElementById("chosen").textContent=str;
    
    document.getElementById("total").textContent="Total price: "+total+"$";
    
  }
  }

function removeFromArray(j){


}