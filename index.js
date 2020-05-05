module.exports = {
    formatTable: function(data, columns, styles, nameColumn) {
        var body = [];

        if (nameColumn.length > 0) {
            body.push(nameColumn);
        }



        data.forEach(function(row) {

            var dataRow = [];
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].constructor === Array) {
                    var rows = '';
                    var objColumns = {};
                    columns[i].forEach(function(content) {

                        rows = rows + row[content].toString() + '\n';

                        var objColumn = {};
                        var arrays = [];
                        objColumn['text'] = rows.toString();
                        objColumn['style'] = styles[i].toString();
                        if (objColumn['text'].trim() == 'null') {
                            objColumn['text'] = ''
                        }
                        objColumns = objColumn;
                    })

                    dataRow.push(objColumns);
                } else {
                    var objColumn = {};

                    objColumn['text'] = row[columns[i]].toString();
                    objColumn['style'] = styles[i].toString();
                    if (objColumn['text'].trim() == 'null') {
                        objColumn['text'] = ''
                    }
                    dataRow.push(objColumn);
                }

            }
            body.push(dataRow);
        });

        return body;
    },

    formatTable2: function(data, columns, styles, colSpan, nameColumn) {
        var body = [];

        if (nameColumn.length > 0) {
            body.push(nameColumn);
        }



        data.forEach(function(row) {

            var dataRow = [];
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].constructor === Array) {
                    var rows = '';
                    var objColumns = {};
                    columns[i].forEach(function(content) {

                        rows = rows + row[content].toString() + '\n';

                        var objColumn = {};
                        var arrays = [];
                        objColumn['text'] = rows.toString();
                        objColumn['style'] = styles[i].toString();
                        objColumn['colSpan'] = colSpan[i];
                        if (objColumn['text'].trim() == 'null') {
                            objColumn['text'] = ''
                        }
                        objColumns = objColumn;
                    })

                    dataRow.push(objColumns);
                } else {
                    var objColumn = {};

                    objColumn['text'] = row[columns[i]].toString();
                    objColumn['style'] = styles[i].toString();
                    objColumn['colSpan'] = colSpan[i];
                    if (objColumn['text'].trim() == 'null') {
                        objColumn['text'] = ''
                    }
                    dataRow.push(objColumn);
                }

            }
            body.push(dataRow);
        });

        return body;
    },

    formatRow: function(listJson, nmstyle, indexCondition, condition) {
        for (let index = 1; index < listJson.length; index++) {
            const element = listJson[index][indexCondition].text;
            if (element == condition) {
                var dataRow = [];
                for (let index2 = 0; index2 < listJson[0].length; index2++) {
                    var objColumn = {};
                    objColumn['text'] = listJson[index][index2].text;
                    objColumn['style'] = nmstyle[index2];
                    dataRow.push(objColumn);
                }
                listJson.splice(index, 1, dataRow)
            }
        }
        return listJson
    },

    formatThousand: function(number) {
        var number_string = number.toString(),
            split = number_string.split('.'),
            rest = split[0].length % 3,
            numeric = split[0].substr(0, rest),
            thousand = split[0].substr(rest).match(/\d{1,3}/gi);

        if (thousand) {
            let separator = rest ? '.' : '';
            numeric += separator + thousand.join('.');
        }
        numeric = split[1] != undefined ? numeric + ',' + split[1] : numeric;
        return numeric
    },


    formatColSpan: function(listJson, kolomKe, jmlKolom) {
        for (let index = 1; index < listJson.length; index++) {
            var objColumn = {};
            objColumn['text'] = listJson[index][kolomKe].text;
            objColumn['style'] = listJson[index][kolomKe].style;
            objColumn['colSpan'] = jmlKolom;
            listJson[index][kolomKe] = objColumn;
            objColumn = {};
            objColumn['text'] = '';
            listJson[index][kolomKe + 1] = objColumn;
        }
        return listJson
    },

    formatDate: function(strDate) {
        var str = strDate;
        var xyear = str.substr(0, 4);
        var xmonth = str.substr(5, 2);
        var xdate = str.substr(8, 2);

        return xdate + '-' + xmonth + '-' + xyear;
    }
}