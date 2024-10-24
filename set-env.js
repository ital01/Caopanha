import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const targetPath = 'src/app/shared/environment/environment.ts';

const apiUrl = process.env.API;
const production = process.env.PRODUCTION;

const envConfigFile = (
`const environment = {
  production: ${production},
  apiUrl: '${apiUrl}',
};

export default environment;
`

);

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Environment file generated at ${targetPath}`);
  }
});
