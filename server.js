const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const ipp = require('ipp');
const pdfkit = require('pdfkit');

const config = require('./config.json');

const PRINTER_URL = config.printerUrl;
const SERVER_PORT = config.serverPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', function(req, res) {
    ejs.renderFile('index.ejs', { fromAddress: config.fromAddress }, (err, str) => {
        res.send(err ? err : str);
    });
});

app.post('/print', function (req, res) {
    const fromAddress = req.body['fromAddress'];
    const toAddress = req.body['toAddress'].split('\r\n');
    print(fromAddress, toAddress);
    res.redirect('/');
});

app.listen(SERVER_PORT, () => {
    console.log(`http://localhost:${SERVER_PORT}`);
});

function print(fromAddress, toAddress) {

    const SCALING_FACTOR = 3;

    let buffer = [];
    let doc = new pdfkit({ layout: 'landscape', size: [36 * SCALING_FACTOR, 89 * SCALING_FACTOR], margin: 0 });

    doc.on('data', buffer.push.bind(buffer));

    doc.on('end', () => {
        let pdf = Buffer.concat(buffer);
        let printer = ipp.Printer(PRINTER_URL, null);
        let msg = {
            "operation-attributes-tag": {
                "requesting-user-name": "print label",
                "job-name": "print label",
                "document-format": "application/pdf"
            },
            data: pdf
        };
        printer.execute("Print-Job", msg, (err, res) => {
            if (err) console.error(err);
            console.log(res);
        });
    });

    doc.fontSize(5.5);
    doc.text(fromAddress, 0, 15);
    doc.fontSize(10);
    doc.text(toAddress[0], 0, 30);

    for (let i = 1; i < toAddress.length; i++) {
        doc.moveDown(0);
        doc.text(toAddress[i]);
    }

    doc.end();
}