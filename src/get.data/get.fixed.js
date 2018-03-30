// 获取售药或进药的title
function getFixed(type){
    let shopInTitle = ['药品编码','药品名称','采购数量','生产厂家','采购日期','供应商','采购价','零售价','规格']
    let shopOutdataTitle = ['药品编码','销售数量','药品名称','日期','单价']
    // let rightType = [text,input]//右边组件的类型
    let title=[]
    let data=type==='shopIn'?shopInTitle:shopOutdataTitle

    title= data.map((item,index)=>{
            let obj = {}
            // if(item ==='药品编码'||'销售数量'||'')
            obj.title = item
            obj.key = index
            obj.type = type
            return obj
        })
    return title
}

/**
 * inputData
 * "销售数量" => "1", "药品编码" => "12", "药品名称" => "哈哈", 
 * "日期" => "12.30",
 *  "单价" => "15"
 * 
 * 
 * data 
 * 
 *  "name" 
    "money" : 120,
    "isSelect" : false,
    "img" : "https://img14.360buyimg.com/n7/jfs/t3151/314/5710217395/97069/4a6f06ef/5881a134Nb7bd8f57.jpg",
    "count" : 1
 */
    

    let  countinueData  = []//如果继续添加返回数组
    function setshopCarData(recieveData){
        if(recieveData&&recieveData.inputData) {
        let {inputData,type} = recieveData
        let data={
            type:type,
            id:inputData.get('药品编码'),
            name:inputData.get('药品名称'),
            money:parseInt(inputData.get('单价')) ,
            description:'治感冒，不含糖',
            isSelect:false,
            img:"https://img14.360buyimg.com/n7/jfs/t3151/314/5710217395/97069/4a6f06ef/5881a134Nb7bd8f57.jpg",
            count: parseInt(inputData.get('销售数量')),
        }
        if(type ==='finsh'){
            if(data.id)countinueData.push(data)
            return countinueData
        }
        if(type ==='countinue'){
            if(data.id)countinueData.push(data)
            }
        }else if(recieveData.type ==='noInputData'){
            //不做处理任何
        }else{
            countinueData = []
        return  countinueData
        }
         
}
    function retShopCarData(){
        return countinueData
    }

export {
    getFixed,
    setshopCarData,
    retShopCarData
}

   