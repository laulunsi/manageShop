 function dateFormat(str,d) {    
    if( checkNull(str)){  //如果格式化字符为空，返回空字符    
            return "";      
    }  
    if(checkNull(d)){  //如果日期为空，自动获取当前日期    
        d=new Date();      
    }else if(d.constructor!=Date){//如果参数不是一个日期对象，就认为是一个标准Long值日期  
        d=new Date(d);  
    }  
     return  str.replace("yyyy",d.getFullYear()).replace("MM",fillZero(d.getMonth()+1)).replace("dd",fillZero(d.getDate())).replace("HH",fillZero( d.getHours())).replace("mm",fillZero(d.getMinutes())).replace("ss",fillZero(d.getSeconds())).replace("sss",d.getMilliseconds());    
    }    
      
    //填充0    
  function fillZero(value){    
    if(value.toString().length<2){    
        return "0"+value;    
    }    
    return value;    
    }    
    //判空    
  function checkNull(value){    
    if(!value||value==null||typeof(value) == "undefined"||value==""){    
    return true;    
    }    
    return false;    
    }   
export {
    dateFormat
}




// this._realm.selectAll('IN')
// .then(({data})=>{
//   // this._inData = data
//     // console.warn(data.length)
//     // this._genData(data)
// })
// .catch(()=>{
//   console.warn('查询失败')
// })
// this._realm.selectAll('OUT')
// .then((data)=>{
//   for(let i in data){
//     let{medicineId,price,outTotal,outDate} = data[i]
//     // this._realm.selectBySome('SHOP','medicineId ==medicineId')
//   }              
//   // setRealmData({data,type:'OUT'})
// })
// .catch((err)=>{
// console.warn('查询失败'+err)
// })
// this._realm.selectAll('SHOP')
// .then((data)=>{
//   // setRealmData({data,type:'SHOP'})
// })
// .catch(()=>{
// console.warn('查询失败')
// })