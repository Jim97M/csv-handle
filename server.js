const https = require('https');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const runner = require('child_process');
const { stderr } = require('process');
const url = require('url');
const host = "localhost";
const port = 5000;

//Lets store all our files in a variable so that it can be served  on startup rather that on  request
let indexFile;

//Lets create certain endpoints so that the user can access a particular resource when the user hits the particular end point.
const developers = JSON.stringify([
    {name: "Dev 1", web: "React Nodejs", mobile:"React Native", experience: 2},
    {name: "Dev 2", web: "Django React", mobile: "Flutter", experience: 3 },
    {name: "Dev 3", web:"SpringBoot Angular", mobile: "Native", experience: 2}
]);

const webservers = JSON.stringify([
    {webserver: "Apache", description: "Process Driven Approach"},
    {webserver: "Nginx", description: "Event Driven Approach"}
]);

const options = {
    cert: fs.readFileSync("/home/jim/example.crt"),
    key: fs.readFileSync("/home/jim/example.key"),
    dhparam: fs.readFileSync("/usr/share/ssl-cert/dh-strong.pem")
}

const errorMessage = (errCode, errString, response) => {
    response.writeHead(errCode, {"Content-Type": "text/plain;charset=utf-8",'Content-Length':response.toString().length+''});
    response.write(errString + "\n");
    response.end();
    return false;
}

const sendData = (err, stdout, stderr, response) => {
    if (err) return errorMessage(500, stderr, response);
    response.writeHead(200,{"Content-Type": "text/plain;charset=utf-8", 'Content-Length':response.toString().length+''});
    response.write(stdout);
    response.end();
}

const runScript = (exists, file, param, response) => {
    if(!exists) return errorMessage(404, 'File Not Found', response);
    runner.exec("php " + file + " " + param, 
      function(err, stdout, stderr){sendData(err, stdout, stderr, response);});
}

const php = (request, response) => {
    var urlpath = url.parse(request.url).pathname;
    var param = url.parse(request.url).query;
    var localpath = path.join(process.cwd(), urlpath);
    fs.exists(localpath, function(result) {runScript(result, localpath, param, response)});
}

const serveFirstPage = function(req, res){
    if(req.method === "GET"){
      res.setHeader("Content-Type", "index.html");
      res.writeHead(200);
      res.end(indexFile);
    }else if(req.method === POST){
        var body = "";
        req.on("data", function(chunk){
            body += chunk;
        });

        req.on("end", function(){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(body);
        });
    }
    };

    fsPromise.readFile(path.join(__dirname, 'html', 'index.html'))
        .then(contents => {
          indexFile = contents;
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });

const server = https.createServer(options, serveFirstPage);
server.on(options, php);


server.listen(port, host, () => {
    console.log(`Server is running on https://${host}:${port}`);
})