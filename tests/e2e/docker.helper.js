const Docker = require('dockerode');
const docker = new Docker();

const KEYCLOAK_IMAGE = 'quay.io/keycloak/keycloak:21.1.1';
const KEYCLOAK_CONTAINER_NAME = 'keycloak-e2e-test';

let container;

async function startKeycloak() {
  console.log('Starting Keycloak container...');

  // Ensure image is available
  await pullImage(KEYCLOAK_IMAGE);

  container = await docker.createContainer({
    Image: KEYCLOAK_IMAGE,
    name: KEYCLOAK_CONTAINER_NAME,
    Env: [
      'KEYCLOAK_ADMIN=admin',
      'KEYCLOAK_ADMIN_PASSWORD=admin',
    ],
    HostConfig: {
      PortBindings: {
        '8080/tcp': [{ HostPort: '8080' }],
      },
    },
    Cmd: ['start-dev'],
  });

  await container.start();

  // Wait for Keycloak to be ready
  await new Promise(resolve => setTimeout(resolve, 30000)); // Simple wait

  console.log('Keycloak container started.');
  return container;
}

async function stopKeycloak() {
  if (container) {
    console.log('Stopping Keycloak container...');
    await container.stop();
    await container.remove();
    console.log('Keycloak container stopped and removed.');
  }
}

async function pullImage(imageName) {
  console.log(`Pulling image: ${imageName}`);
  return new Promise((resolve, reject) => {
    docker.pull(imageName, (err, stream) => {
      if (err) return reject(err);
      docker.modem.followProgress(stream, (err, output) => {
        if (err) return reject(err);
        resolve(output);
      });
    });
  });
}

module.exports = { startKeycloak, stopKeycloak };
