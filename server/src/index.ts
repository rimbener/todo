import Server from './server/server';
import router from './router';
import initMiddlewares from './middewares/index';

const server = Server.init(3000);
initMiddlewares(server.app);
server.use(router);

server.start(() => console.log('Server corriendo en el puerto 3000'));
