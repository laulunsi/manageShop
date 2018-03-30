const GROUPS = [
    '查询方式'
  ]
  const FIND_WAY = [
    '库存查询',
    '进药查询',
    '售药查询'
  ]
  const mockData = GROUPS.map((groupName) => {
  
    let obj = {};
  
    // construct the group header data
    obj.groupHeaderData = {
      title: groupName
    };
  
    // construct the list data
    obj.groupListData =FIND_WAY.map((item)=>{return {findWay:item} })
    return obj;
  });
  
  export {
    mockData
  };