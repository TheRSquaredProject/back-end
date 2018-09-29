const DBHelper=require('./DB_helper');
const readline = require('readline');
PromptAndUpload();

/* Adds a new collection if it does not exist. If collection exists, replaces it with the given collection */
async function PromptAndUpload() {
    const input_reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      input_reader.question('File name: ', async (jsonFileName) => {
        var all_data;
        try{
            all_data = require('./data/'+jsonFileName);
        }catch(e){
            console.error('File not found');
            return null;
        }
        input_reader.question('Collection name: ', async (collectionName) => {
            let db="rsquared_zilla_upazilla_db";
            var allExistingCollections=await DBHelper.getAllCollectionNames();
            if(allExistingCollections.indexOf(collectionName)>=0){
                console.log("Overwriting data..");
                let deleteExisting= await DBHelper.deleteData(db,collectionName,{});
                console.log("Existing data from "+collectionName+" deleted.", deleteExisting);
            }else{
                console.log("Creating new collection: ", collectionName);
            }
            await DBHelper.addData(db,collectionName,all_data);
            console.log("Data added to collection '"+collectionName+"' from '"+jsonFileName+"'");
            console.log("TASK COMPLETE");
            input_reader.close();
        });
      });
}
