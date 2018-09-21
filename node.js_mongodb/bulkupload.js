const DBHelper=require('./DB_helper');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Attempting to upload all files in '/data' directory to mongoDB cloud.")
  rl.question('Are you sure you want to upload and overwrite all data? (Y/N) ', async (reply) => {
      if(reply.indexOf("Y")>=0){
         await bulkUpload();
      }
      rl.close();
  });

async function bulkUpload(){
    let jsonFileName, collectionName;
    jsonFileName=["AllUpazilaData", "AllZilaData","UpazilaChildhealth","UpazilaEmployment","UpazilaHousehold","UpazilaLiteracy","UpazilaAttendance","UpazilaPopulation",
    "UpazilaPoverty", "ZilaChildhealth","ZilaEmployment","ZilaHousehold","ZilaLiteracy","ZilaAttendance","ZilaLocation","ZilaPopulation","ZilaPoverty"];
    collectionName=["AllUpazilaData", "AllZilaData","UpazilaDataChildHealth","UpazilaDataEmployment","UpazilaDataHousehold","UpazilaDataLiteracy","UpazilaDataAttendance","UpazilaDataPopulation",
    "UpazilaDataPoverty","ZilaDataChildHealth","ZilaDataEmployment","ZilaDataHousehold","ZilaDataLiteracy","ZilaDataAttendance","ZilaLocation","ZilaPopulation","ZilaPoverty"];
    for(var i=0;i<jsonFileName.length; i++){
        let db="rsquared_zilla_upazilla_db";
        var all_data = require('./data/'+jsonFileName[i]+".json");
        let deleteExisting= await DBHelper.deleteData(db,collectionName[i],{});
        console.log("Existing data from "+collectionName[i]+" deleted.", deleteExisting);
        var newData_id=await DBHelper.addData(db,collectionName[i],all_data);
        console.log("Data added to collection: "+collectionName[i]+" from: "+jsonFileName[i], newData_id);
    }
    console.log('TASK COMPLETED');
}