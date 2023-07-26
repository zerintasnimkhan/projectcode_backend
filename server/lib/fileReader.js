const fs = require('fs');
const path = require('path');

const readFile = (filePath)=>{
  //check if the file exist 
  if(!filePath){
    throw new Error("Not a path");
  }
  const finalPath = path.join(__dirname,filePath);
  try {
    fs.existsSync(finalPath,fs.constants.F_OK);
    const fileData = fs.readFileSync(finalPath,{encoding:'utf-8'});
    return fileData;
    
  } catch (error) {
    return error;
  }
}


// const server = http.createServer((req, res) => {

//     // Read the HTML file
//     const filePath = path.join(__dirname, 'index.html');
  
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         // Handle errors, e.g., file not found
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('Error reading file');
//       } else {
//         // Set the Content-Type header to indicate it's an HTML file
//         res.writeHead(200, { 'Content-Type': 'text/html' });
  
//         // Send the contents of the HTML file as the response
//         res.end(data);
//       }
//     });
//   });
  


  module.exports = {
    readFile
  }