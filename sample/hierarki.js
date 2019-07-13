var fonts = {
    Roboto: {
        normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
        bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
        italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
        bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'

    }
};

var PdfPrinter = require('pdfmake/src/printer');
var formatData = require('formatdata-plugin-pdfmake');

var printer = new PdfPrinter(fonts);
var fs = require('fs');

// SET JSON
let listJson = [
    {
        "code": "01",
        "key":"1",
        "name": "Category A",
        "total":"10000"
      
    },
    {
        "code": "0101",
        "key":"2",
        "name": "Product A1",
        "total":"5000"
        
    },
    {
        "code": "0101001",
        "key":"3",
        "name": "Product A11",
        "total":"2500"
        
    },
    {
        "code": "0101002",
        "key":"3",
        "name": "Product A12",
        "total":"2500"
    },
    
    {
        "code": "0102",
        "key":"2",
        "name": "Product A2",
        "total":"5000"
       
    },
    {
        "code": "0102001",
        "key":"3",
        "name": "Product A21",
        "total":"1000"
      
    },
    {
        "code": "0102002",
        "key":"3",
        "name": "Product A22",
        "total":"4000"
        
    },

]

//change total format with thousand separator
for (let index = 0; index < listJson.length; index++) {
    listJson[index].totalThousand = formatData.formatThousand(listJson[index].total);
}

let columns = ['code', 'key','name','totalThousand']; 
let styles = ['genStyle', 'genStyle','genStyle','genStyle'] // set styles to general style, will be replaced by style1,style2 and style3
let columnHeaders = [{ text: 'CODE', style: 'headerStyle',colSpan: 2  },{},{ text: 'NAME', style: 'headerStyle' },{ text: 'TOTAL', style: 'headerStyle' }]; // column header style

let styles1 = ['blueCode','blueCode', 'blueName', 'blueTotal']
let styles2 = ['boldCode','boldCode', 'boldName', 'boldTotal']
let styles3 = ['normalCode','normalCode', 'normalName', 'normalTotal']

let resultTable = formatData.formatTable(listJson, columns, styles, columnHeaders);  // create array from json

// after creating array, replace style every column with style1,style2 and style3 
// 1 : number index of "key" (column number 2 but in array index is number 1)
// "1","2","3" : key
resultTable=formatData.formatRow(resultTable,styles1,1,"1") 
resultTable=formatData.formatRow(resultTable,styles2,1,"2")
resultTable=formatData.formatRow(resultTable,styles3,1,"3")

//key column is not display in report, so use ColSpan
//0 : start array index = code
//2 : 2 column = code + key =>(merge)
resultTable=formatData.formatColSpan(resultTable, 0, 2);

var dd = {
    content: [
        {
            table: {
                widths: [60,5,100,80],
                body: resultTable
            }
        }
    ],

    styles: {
        headerStyle: {
            bold: true,
            color: 'black',
            alignment: 'center'
        },
        genStyle:{
            color: 'black',
        },
        blueCode: {
            alignment: 'center',
            bold: true,
            color: 'blue',
            italics: true
        },
        blueName: {
            alignment: 'left',
            bold: true,
            color: 'blue',
            italics: true
        },
        blueTotal: {
            alignment: 'right',
            bold: true,
            color: 'blue',
            italics: true
        },

        boldCode: {
            alignment: 'center',
            bold: true,
            color: 'black',
            italics: true
        },
        boldName: {
            alignment: 'left',
            bold: true,
            color: 'black',
            italics: true
        },
        boldTotal: {
            alignment: 'right',
            bold: true,
            color: 'black',
            italics: true
        },

        normalCode: {
            alignment: 'center',
            color: 'black',
            fontSize: 9
        },
        normalName: {
            alignment: 'left',
            color: 'black',
            fontSize: 9
        },
        normalTotal: {
            alignment: 'right',
            color: 'black',
            fontSize: 9
        },
       
    },
}

var pdfDoc = printer.createPdfKitDocument(dd);
pdfDoc.pipe(fs.createWriteStream('hierarki.pdf'));
pdfDoc.end();




