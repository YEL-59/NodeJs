// const hello = "Hello world"
// console.log(hello)
///blocking synchronous
const fs = require("fs");
const http = require("http");
const url = require("url");

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
//Server
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    return output;

    //console.log(product);


}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
//console.log(data);
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    //console.log(req);
    //Routing
    const pathName = req.url;
    //overview page

    if (pathName === "/" || pathName === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });
        const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
        res.end(output);

       
       
        //res.end(tempOverview);



        //product page
    } else if (pathName === "/product") {
        res.end("This is product");
        //api
    } else if (pathName === "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
        // } else if (pathName === "/api") {
        //     fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
        //         const productData = JSON.parse(data);
        //         res.writeHead(200, { "Content-type": "application/json" });
        //         res.end(data);
        //     });

        // res.writeHead(200,{'Content-type':'application/json'})
        // res.end('Api')
        //not found
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world",
        });
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listining to request on port 8000");
});
