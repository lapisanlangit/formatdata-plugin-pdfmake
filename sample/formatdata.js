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
        "location": "Indonesia",
        "plane": "1000000",
        "currency":"IDR",
        "date":"2019-01-02"
    },
    {
        "location": "America",
        "plane": "1000",
        "currency":"USD",
        "date":"2019-01-03"
    },
    {
        "location": "India",
        "plane": "30000",
        "currency":"Rupee",
        "date":"2019-01-04"
    },
  
]

//change plane format with thousand separator, and date format to dd/mm/yyy
for (let index = 0; index < listJson.length; index++) {
    listJson[index].planeThousand = formatData.formatThousand(listJson[index].plane);
    listJson[index].dateddmmyy = formatData.formatDate(listJson[index].date);
}

let columns = ['location', 'planeThousand','currency','dateddmmyy']; //column json
let styles = ['locationStyle', 'planeStyle','currencyStyle','dateStyle'] // column style
let columnHeaders = [{ text: 'Location', style: 'headerStyle' }, { text: 'Plane', style: 'headerStyle' },{ text: 'Currency', style: 'headerStyle' },{ text: 'Date', style: 'headerStyle' }]; // style column header
let resultTable = formatData.formatTable(listJson, columns, styles, columnHeaders); // create array from json

var dd = {
    content: [
        {
            table: {
                widths: [70, 100,60,80],
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
        locationStyle: {
            alignment: 'left'
        },
        planeStyle: {
            alignment: 'right'
        },
        currencyStyle: {
            alignment: 'center',
            bold: true,
        },
        dateStyle: {
            alignment: 'center',
            fontSize: 9,
        },
    },
}

var pdfDoc = printer.createPdfKitDocument(dd);
pdfDoc.pipe(fs.createWriteStream('formatdata.pdf'));
pdfDoc.end();




