const DBHelper=require('./DB_helper');
RunProgram();

let database_name="rsquared_zilla_upazilla_db";
async function RunProgram(){
    /* ---USING 'DB_helper' CRUD EXAMPLES--- */

    //add data
    let newData_id=await DBHelper.addData(database_name,"crud_data",[{username:'xyz', login:'123'}]);
    console.log("Data added: "+newData_id);

    //read all data
    let data = await DBHelper.getData(database_name,"crud_data");
    console.log("Data read: ",data);
    
    //update data
    let updateStat= await DBHelper.updateData(database_name,"crud_data",{_id:newData_id},{username:'shanzid', login:'123'});
    console.log("Data updated: "+updateStat+ " row(s) affected.");

    //search data
    let searchResults= await DBHelper.searchData(database_name,"crud_data",{username:'shanzid'});
    console.log("Data searched: ",searchResults);

    //delete data
    let deleteStat= await DBHelper.deleteData(database_name,"crud_data",{username:'shanzid'});
    console.log("Data deleted: "+deleteStat+ " row(s) affected.");
}

//---UPLOADING DATA IN BULK TO COLLECTION / DATA IMPORT---
/* async function bulkUpload(){
    var all_data = require('./data/upazilla_data.json');
    var newData_id=await DBHelper.addData(database_name,"upazilla_data",all_data);
    console.log("Data added: ",newData_id);
} */