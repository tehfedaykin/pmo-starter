require('./plugins/restaurantRoutes.plugin');

exports.config = {
  projectRoot: "./src",
  projectName: "place-my-order",
  outDir: './dist/static',
  routes: {
    '/restaurants/:slug': {
      type: 'restaurantRoutes',
      url: 'http://localhost:7070/restaurants'
    },
    '/restaurants/:slug/order': {
      type: 'restaurantRoutes',
      url: 'http://localhost:7070/restaurants'
    }
  }
};
