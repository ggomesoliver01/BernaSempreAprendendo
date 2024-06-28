const XLSX  = require("xlsx"); 
const filePath = process.argv.slice(2)[0];
const workbook =  XLSX.readFile("billing-orders-all.xls");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const posts = [];
let post = {};
for (let cell in worksheet) { 
   const cellAsString = cell.toString();
   if(cellAsString[1] !==  'r' && cellAsString !== 'm' && cellAsString[1] > 1){
        if(cellAsString[0] === 'A'){
            posts.title = worksheet[cell].v;
            post.oc = worksheet[cell].v;
            posts.push(post);
            post = {};
        }
    }
}
console.log(posts);

