const path = require('path');

const FilePath = (): String => {
  const currentDirectory = process.cwd();
  const relativePath = path.relative(currentDirectory, __filename);
  return `[${relativePath}]: `
}

export default FilePath