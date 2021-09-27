console.log("Welcome to Nodejs crash-course!");

// Node module
// const color = require('cli-color');
// console.log(color.red('Hello from node module'));
// console.log(color.yellow('Hello from node module'));
// console.log(color.green('Hello from node module'));

//Local modules
// const service=require('./modules/module');
// console.log("Sum of given number is:-  " + service.sumOfTwo(19,34));
// console.log("Sub of given number is:-  " + service.subOfTwo(19,34));

//Core modules
const path = require('path');
//dirname
// console.log('Gives folder name: ',path.dirname(__filename));
//basename
// console.log('Gives file name:',path.basename(__filename));
//Extention
// console.log('Extention:',path.extname(__filename))
//parse
// console.log('All details:',path.parse(__filename));

//join
// console.log('join',path.join(__dirname,'filename','app.js'));

// file system
const fs = require('fs')

// fs.mkdir(path.join(__dirname,'/test'),(err)=>{
//     if(err){
//         console.log('err are faced');
//         return
//     }
//     console.log('Folder created...');
// })

//write file
// fs.writeFile(path.join(__dirname,'test','text.txt'),'More data added..',(err)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log('file created...');
// })

//read file
// fs.readFile(path.join(__dirname,'test','text.txt'),'utf-8',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     // const content=Buffer.from(data);
//     // console.log(content.toString());
//     // console.log(content);
//     console.log(data);
// })

//Os module
const os = require('os')
// console.log('os type',os.type());
// console.log('os platform',os.platform());
// console.log('cpu details',os.cpus());
// console.log('free memory',os.freemem());
// console.log('total memory',os.totalmem());
// console.log('Uptime',os.uptime());

//http module

const http = require('http');

const app = http.createServer((req, res) => {
    // if(req.url=='/index.html'){
    //     fs.readFile(path.join(__dirname,'static','index.html'),(err,data)=>{
    //         if(err){
    //             throw err
    //         }
    //         res.end(data);
    //     })
    // }else if(req.url=='/about.html'){
    //     fs.readFile(path.join(__dirname,'static','about.html'),(err,data)=>{
    //         if(err){
    //             throw err
    //         }
    //         res.end(data);
    //     })
    // }
    let filePath = path.join(__dirname, 'static', req.url == '/' ? 'index.html' : req.url);
    let ext = path.extname(filePath);
    let textType = 'text/html';
    if (!ext) {
        filePath += '.html'
    }
    switch (ext) {
        case '.css':
            textType = 'text/css'
            break
        case '.js':
            textType = 'text/js'
            break
        default:
            textType = 'text/html'
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'static', 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error!!!')
                } else {
                    res.writeHead(500, {
                        'Content-Type': textType
                    });
                    res.end(data);
                }
            })
        } else {
            res.writeHead(200, {
                'Content-Type': textType
            })
            res.end(data);
        }
    })


})
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})