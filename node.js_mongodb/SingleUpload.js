const DBHelper=require('./DB_helper');
const readline = require('readline');
PromptAndUpload();

async function PromptAndUpload() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question('File name: ', async (jsonFileName) => {
        rl.question('Collection name: ', async (collectionName) => {
            console.log("Overwriting data..");
            let db="rsquared_zilla_upazilla_db";
            var all_data = require('./data/'+jsonFileName);
            let deleteExisting= await DBHelper.deleteData(db,collectionName,{});
            console.log("Existing data from "+collectionName+" deleted.", deleteExisting);
            var newData_id=await DBHelper.addData(db,collectionName,all_data);
            console.log("Data added to collection '"+collectionName+"' from '"+jsonFileName+"'");
            console.log("TASK COMPLETE");
            rl.close();
        });
      });
}
