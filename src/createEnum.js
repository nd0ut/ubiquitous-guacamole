module.exports = function createEnum<T: {}>(map: T): T {
  return new Proxy(map, {
    set: () => false,
    get: (target, name) => {
      if(target[name]) {
        return target[name];
      }

      throw new Error(`Property '${name}' not found.`);
    }
  });
};
