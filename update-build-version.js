// Script para incrementar o número de build em global-config.ts
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src/environments/global-config.ts');

let content = fs.readFileSync(configPath, 'utf8');

// Ajustado para capturar quatro números na versão
const versionRegex = /(version:\s*['"])(\d+)\.(\d+)\.(\d+)\.(\d+)(['"])/;
const match = content.match(versionRegex);

if (match) {
  const major = match[2];
  const minor = match[3];
  const patch = match[4];
  let build = parseInt(match[5], 10) + 1;
  const newVersion = `${major}.${minor}.${patch}.${build}`;
  content = content.replace(versionRegex, `$1${newVersion}$6`);
  fs.writeFileSync(configPath, content, 'utf8');
  console.log(`Versão atualizada para ${newVersion}`);
} else {
  console.error('Não foi possível encontrar a versão em global-config.ts');
  process.exit(1);
}
