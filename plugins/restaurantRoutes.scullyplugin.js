const {registerPlugin, routeSplit} = require('@scullyio/scully');
const {httpGetJson} = require('@scullyio/scully/utils/httpGetJson');

const restaurantSlugPlugin = async(route, config = {}) => {
  const list = await httpGetJson(config.url);
  const {createPath} = routeSplit(route);
  const handledRoutes = list.data.map((item) => {
    return {
      route: createPath(item.slug)
    }
  })
  return handledRoutes;
}

// DO NOT FORGET TO REGISTER THE PLUGIN
const validator = async conf => [];
registerPlugin('router', 'restaurantRoutes', restaurantSlugPlugin, validator);
module.exports.restaurantSlugPlugin = restaurantSlugPlugin;

