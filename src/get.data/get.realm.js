
    function dateFormat(date){
        let y = date.getFullYear()
        let m = date.getMonth()+1
        let d = date.getDate()
        let h = date.getHours()
        let mm = date.getMinutes()
        let ss = date.getSeconds()
        return y+'-'+m+'-'+d +':'+h+':'+mm+':'+ss
    }

    let allData  = []//all data
    function setRealmData(recieveData){
        if(recieveData) {
            let data = recieveData.data
            let type = recieveData.type
        if(type ==='OUT'){
            for(let i in data){
                 let{outId, medicineId,price,outTotal,outDate } = data[i]
                 let obj = {
                        //    type:"出售",
                        //    id:inputData.get('药品编码'),
                        //     name:inputData.get('药品名称'),
                        //     money:parseInt(inputData.get('单价')) ,
                        //     description:'治感冒，不含糖',
                        //     isSelect:false,
                        //     img:"https://img14.360buyimg.com/n7/jfs/t3151/314/5710217395/97069/4a6f06ef/5881a134Nb7bd8f57.jpg",
                        //     count: parseInt(inputData.get('销售数量')),
                 }

             }
            console.warn(allData)
        }
        if(type ==='SHOP'){
             
        }
       
        // let data={
        //     type:type,
        //     id:inputData.get('药品编码'),
        //     name:inputData.get('药品名称'),
        //     money:parseInt(inputData.get('单价')) ,
        //     description:'治感冒，不含糖',
        //     isSelect:false,
        //     img:"https://img14.360buyimg.com/n7/jfs/t3151/314/5710217395/97069/4a6f06ef/5881a134Nb7bd8f57.jpg",
        //     count: parseInt(inputData.get('销售数量')),
        // }
        // if(type ==='finsh'){
        //     if(data.id)countinueData.push(data)
        //     return countinueData
        // }
        // if(type ==='countinue'){
        //     if(data.id)countinueData.push(data)
        //     }
        }else{
            allData = []
        return  allData
        }
         
}
function genAllData(){
        return allData
    }

export {
    genAllData,
    setRealmData,
    dateFormat,
}

   