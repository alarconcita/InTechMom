import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { port } from './config/index.js';
import { connectDB } from './config/dbConnection.js';
import router from './router.js';
import { openApiSpecification } from './config/swagger.js';

async function main() {
  const app = express();
  app.use(express.json());
  app.get('/', (request, response, error) => {
    response.send('status: ok');
  });
  app.use('/docs', swaggerUi.serve);
  app.get('/docs', swaggerUi.setup(openApiSpecification)); 
  app.use('/', router);

  await connectDB();

  app.listen(port, (error) => {
    if (error) {
      console.log('Server error: Failed');
      process.exit(1);
    }
    console.log(`Server listening in port ${port}`)
  })
};

main();