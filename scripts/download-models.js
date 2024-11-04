const https = require('https');
const fs = require('fs');
const path = require('path');

const models = [
  { name: 'skull', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Skull/glTF/Skull.gltf' },
  { name: 'damaged_helmet', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf' },
  { name: 'floating_crystal', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GlamVelvetSofa/glTF/GlamVelvetSofa.gltf' },
  { name: 'scifi_helmet', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SciFiHelmet/glTF/SciFiHelmet.gltf' },
  { name: 'steampunk_telescope', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.gltf' },
  { name: 'vintage_camera', url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF/AntiqueCamera.gltf' },
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (error) => {
      fs.unlink(dest, () => reject(error));
    });
  });
};

async function downloadModels() {
  const modelsDir = path.join(process.cwd(), 'public', 'models');

  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  for (const model of models) {
    const modelDir = path.join(modelsDir, model.name);
    if (!fs.existsSync(modelDir)) {
      fs.mkdirSync(modelDir);
    }

    const filePath = path.join(modelDir, 'scene.gltf');
    console.log(`Downloading ${model.name}...`);
    try {
      await downloadFile(model.url, filePath);
      console.log(`${model.name} downloaded successfully.`);
    } catch (error) {
      console.error(`Error downloading ${model.name}:`, error);
    }
  }
}

downloadModels().then(() => console.log('All models downloaded successfully.'));