const fs = require('fs');
const path = require('path');

const dataFolderPath = path.join(__dirname, 'data');
const files = ['file1.txt', 'file2.txt', 'file3.txt'];

// Create data folder if it doesn't exist
if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
}

// Create sample data files
files.forEach(file => {
    const filePath = path.join(dataFolderPath, file);
    fs.writeFileSync(filePath, `Contents of ${file}`);
});

// Callback version
function readAndAggregateDataCallback(files, callback) {
    let aggregatedData = '';

    function readFile(index) {
        if (index >= files.length) {
            callback(null, aggregatedData);
            return;
        }

        const filePath = path.join(dataFolderPath, files[index]);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                callback(err);
                return;
            }

            aggregatedData += data;
            readFile(index + 1);
        });
    }

    readFile(0);
}

readAndAggregateDataCallback(files, (err, data) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Aggregated Data (Callback):', data);
});


// Promise version
function readAndAggregateDataPromise(files) {
  return new Promise((resolve, reject) => {
      let aggregatedData = '';

      function readFile(index) {
          if (index >= files.length) {
              resolve(aggregatedData);
              return;
          }

          const filePath = path.join(dataFolderPath, files[index]);
          fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                  reject(err);
                  return;
              }

              aggregatedData += data;
              readFile(index + 1);
          });
      }

      readFile(0);
  });
}






// Async/Await version
async function readAndAggregateDataAsyncAwait(files) {
    let aggregatedData = '';

    for (const file of files) {
        const filePath = path.join(dataFolderPath, file);
        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            aggregatedData += data;
        } catch (err) {
            throw err;
        }
    }

    return aggregatedData;
}

(async () => {
    try {
        const data = await readAndAggregateDataAsyncAwait(files);
        console.log('Aggregated Data (Async/Await):', data);
    } catch (err) {
        console.error('Error:', err);
    }
})();
