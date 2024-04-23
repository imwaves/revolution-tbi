import fs from 'fs';
import pth from 'path';
import { spawn } from 'child_process';

const FLD = './src/assets/posters/';
// const FLD = './test/';

export default function getPostersMeta () {
  fs.readdir(FLD, (err, fileNames) => {
    const meta = [];

    fileNames.forEach(async fileName => {
      if (fileName.endsWith('.heic')) {
        const path = FLD + fileName;
        const nextFileName = await convertToWebp(path);
        fs.unlink(path, () => console.log(`Delete: ${ fileName }`));
        fileName = nextFileName;
      }
      meta.push(fileName);
    });

    fs.writeFileSync('posters.meta.json', JSON.stringify(meta));
  });
}

export async function convertToWebp (fileName, opts = {

}) {
  const { name, ext } = pth.parse(fileName);
  const nextFileName = FLD + name + '.webp';

  const args = [
    fileName,
    '-m', '6',
    '-q', '90',
     '-o', nextFileName,
  ];
  console.log('cwebp', args.join(' '));
  const proc = spawn('cwebp', args);

  const out = [];
  const err = [];
  proc.stdout.on('data', (data) => out.push(data));
  proc.stderr.on('data', (data) => err.push(data));

  return new Promise((r, j) => {
    proc.on('close', (code) => {
      if (!code) {
        console.log(`Done!`)
        r(nextFileName);
      } else {
        console.log(`child process exited with code ${code}`);
        console.log(out.join('\n'));
        console.log(err.join('\n'));
        j();
      }
    });
  })
}

getPostersMeta();