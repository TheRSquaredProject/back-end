const DBHelper=require('./DB_helper');
const readline = require('readline');
const input_reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Attempting to upload all files in '/data' directory to mongoDB cloud.")
  input_reader.question('Are you sure you want to upload and overwrite all data? (Y/N) ', async (reply) => {
      if(reply.indexOf("Y")>=0){
         await bulkUpload();
      }
      input_reader.close();
  });

async function bulkUpload(){
    let jsonFileName, collectionName;
    jsonFileName=["AllUpazilaData", "AllZilaData","UpazilaChildhealth","UpazilaEmployment","UpazilaHousehold","UpazilaLiteracy","UpazilaAttendance","UpazilaPopulation",
    "UpazilaPoverty", "ZilaChildhealth","ZilaEmployment","ZilaHousehold","ZilaLiteracy","ZilaAttendance","ZilaLocation","ZilaPopulation","ZilaPoverty"];
    collectionName=["AllUpazilaData", "AllZilaData","UpazilaDataChildHealth","UpazilaDataEmployment","UpazilaDataHousehold","UpazilaDataLiteracy","UpazilaDataAttendance","UpazilaDataPopulation",
    "UpazilaDataPoverty","ZilaDataChildHealth","ZilaDataEmployment","ZilaDataHousehold","ZilaDataLiteracy","ZilaDataAttendance","ZilaLocation","ZilaPopulation","ZilaPoverty"];
    
    var allExistingCollections=await DBHelper.getAllCollectionNames();
     for(var i=0;i<jsonFileName.length; i++){
        var all_data;
        try{
            all_data = require('./data/'+jsonFileName[i]);
        }catch(e){
            console.error('File not found. Skipping update for this collection: ', jsonFileName[i]);
            continue;
        }
        let db="rsquared_zilla_upazilla_db";
        if(allExistingCollections.indexOf(collectionName[i])>=0){
            console.log("Overwriting data in: ", collectionName[i]);
            let deleteExisting= await DBHelper.deleteData(db,collectionName[i],{});
            console.log("Existing data from "+collectionName[i]+" deleted.", deleteExisting);
        }else{
            console.log("Creating new collection: ", collectionName[i]);
        }
        await DBHelper.addData(db,collectionName[i],all_data);
        console.log("Data added to collection '"+collectionName[i]+"' from '"+jsonFileName[i]+"'");
    }
    console.log('TASK COMPLETED');
}