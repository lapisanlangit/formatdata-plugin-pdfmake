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
        "no": "01",
        "month": "January        "
    },
    {
        "no": "02",
        "month": "Pebruary       "
    },
    {
        "no": "03",
        "month": "March          "
    },
    {
        "no": "04",
        "month": "April          "
    },
    {
        "no": "05",
        "month": "May            "
    },
    {
        "no": "06",
        "month": "June           "
    }
]


let columns = ['no', 'month',]; // column json
let styles = ['noSytle', 'monthStyle'] // column style
let columnHeaders = [{ text: 'No', style: 'headerStyle' }, { text: 'Month', style: 'headerStyle' }]; // style column header
let resultTable = formatData.formatTable(listJson, columns, styles, columnHeaders); // create array from json

var dd = {
    content: [
        {
            table: {
                widths: [30, 60],
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
        noSytle: {
            alignment: 'center'
        },
        monthStyle: {
            alignment: 'left'
        },
        
    },
}

var pdfDoc = printer.createPdfKitDocument(dd);
pdfDoc.pipe(fs.createWriteStream('basic.pdf'));
pdfDoc.end();




