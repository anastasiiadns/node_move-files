const fs = require('fs');
const path = require('path');

function app(source, destination) {
  if (!fs.existsSync(source)) {
    throw new Error('Source does not exist');
  }

  if (destination.endsWith('/') && !fs.existsSync(destination)) {
    throw new Error('Destination directory does not exist');
  }

  if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
    const fileName = path.basename(source);
    const newPath = path.join(destination, fileName);

    fs.renameSync(source, newPath);
  } else {
    fs.renameSync(source, destination);
  }
}

if (require.main === module) {
  const [source, destination] = process.argv.slice(2);

  try {
    app(source, destination);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error: ${error.message}`);
  }
}

module.exports = { app };
