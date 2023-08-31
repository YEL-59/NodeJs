// const hello = "Hello world"
// console.log(hello)
///blocking synchronous
const fs = require("fs");
const http = require('http')


/////////////////////////////////////File
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)

//Non-Blocking asynchronous

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             console.log(data3);
//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//                 console.log("your file has written ");
//             });
//         });
//     });
// });
// console.log("will read file");
/////////////////////////////////////////
//server
http.createServer((req, res) => {
    res.end("hello from the server")
}
)







