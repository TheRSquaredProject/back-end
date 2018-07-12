const DBHelper=require('./DB_helper');
RunProgram();

var database_name="rsquared_data";
async function RunProgram(){
    //bulkUpload();

    //---USING 'DB_helper' EXAMPLES---

    //add data
    var newData_id=await DBHelper.addData(database_name,"crud_data",[{username:'xyz', login:Math.random()}]);
    console.log("Data added: "+newData_id);

    //read all data
    var data = await DBHelper.getData(database_name,"crud_data");
    console.log("Data read: ",data);
    
    //update data
    var updateStat= await DBHelper.updateData(database_name,"crud_data",{_id:newData_id},{username:'shanzid', login:Math.random()});
    console.log("Data updated: "+updateStat+ " row(s) affected.");

    //search data
    var searchResults= await DBHelper.searchData(database_name,"crud_data",{username:'shanzid'});
    console.log("Data searched: ",searchResults);

    //delete data
    var deleteStat= await DBHelper.deleteData(database_name,"crud_data",{username:'shanzid'});
    console.log("Data deleted: "+deleteStat+ " row(s) affected.");
}

//---UPLOADING DATA IN BULK TO COLLECTION / DATA IMPORT---
/* async function bulkUpload(){
    var all_data = require('./data/zila_data.json');
    var newData_id=await DBHelper.addData(database_name,"zila_data",all_data);
    console.log("Data added: ",newData_id);
} */