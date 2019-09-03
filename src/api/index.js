import testRoutes from './testapis'; 
import prodRoutes from './prodapis'; 

let routes = [];
routes.push(testRoutes);
prodRoutes.forEach(e => {
    routes.push(e);
});

export default routes;