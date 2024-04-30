const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            // File name where the results will be saved
            const fileName = 'results.txt';

            // Check if the file exists, if not, create it
            if (!fs.existsSync(fileName)) {
                fs.writeFileSync(fileName, '');
            }

            // Write the data to the file
            fs.appendFileSync(fileName, data + '\n');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
