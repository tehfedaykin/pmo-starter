const {registerPlugin, routeSplit} = require('@scullyio/scully');
const {httpGetJson} = require('@scullyio/scully/utils/httpGetJson');

const restaurantRoutes = async(route, config) => {
  const list = await httpGetJson(config.url);
  const {createPath} = routeSplit(route);
  const handledRoutes = list.data.map((item) => {
    return {
      route: createPath(item.slug)
    }
  });
  return handledRoutes;
};

const restaurantRoutesValidator =  async conf => [];

registerPlugin('router', 'restaurantRoutes', restaurantRoutes, restaurantRoutesValidator);
exports.restaurantRoutes = restaurantRoutes;
