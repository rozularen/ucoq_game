function Constants() {
  throw new Error('Constants should not be instantiated!');
};

/**
 * The world will always be a square, so there's no need for an x and y max.
 */
Constants.WORLD_MIN = 0;
Constants.WORLD_MAX = 2500;
Constants.WORLD_PADDING = 30;

module.exports = Constants;