const http = require("node:http");
const { readFile } = require("../lib/fileReader.js");
const { testDb } = require("../../config.js");

console.log(testDb);

const hostname = "127.0.0.1";
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

// Create a simple HTTP server
const server = http.createServer((req, res) => {

  // Post Api to send message using raw node
  if (req.method === "POST" && req.url === "/api/send/message") {
    // Array to store incoming data chunks
    const dataChunks = [];

    // Event listener to handle data chunks
    //it works like  const {dates}=req.body.dates (express)=>body-parser
    req.on("data", (chunk) => {
      dataChunks.push(chunk);
    });

    // Event listener to handle the end of the request
    req.on("end", () => {
      // Combine data chunks into a single buffer
      const postData = Buffer.concat(dataChunks).toString();

      let message;
      try {
        message = JSON.parse(postData).message;
        testDb.db.msgs.push({ message });
        console.dir(testDb, { depth: 3 });
      } catch (error) {
        return res.statusCode(400).end("Invalid JSON data.");
      }

      if (!message) {
        return res.statusCode(400).end("Message is required.");
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `You said: ${message}` }));
    });
  } 
  // GET Api to get message using raw node
  else if (req.method === "GET" && req.url === "/api/get/message") {
    // let newResul=testDb.db.msgs[0]
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(testDb));
  } 
  //To Show the index.html file in the root url
  else if (req.method === "GET") {
    let finalData;
    const contentPath = "../../client/index.html";
    const cssPath = "../../client/style.css";
    const scriptPath = "../../client/script.js";

    if (req.url === "/style.css") {
      res.writeHead(200, { "Content-Type": "text/css" });
      finalData = readFile(cssPath);
    } else if (req.url === "/script.js") {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      finalData = readFile(scriptPath);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      finalData = readFile(contentPath);
    }

    res.write(finalData);
    res.end();

    /*Sending response*/
    // res.write(content)
    // res.write(contentCSS)
    // res.write(contentScript)
    // res.end()
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
