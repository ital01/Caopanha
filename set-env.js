import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const targetPath = 'src/app/shared/environment/environment.ts';

const envConfigFile = (
`const environment = {
  apiUrl: '${process.env.API}',
};

export default environment;`
);

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Environment file generated at ${targetPath}`);
  }
});
