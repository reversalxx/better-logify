const chalk = require('chalk');
const moment = require('moment');

class BetterLogify {
  constructor() {
    this.logTypes = new Map();
    this.displayNames = new Map();
    this.timestampStyle = 'big'; 
    this.messageColor = '#2277FF'; 
    this.initDefaults();
  }

  // Initialize default log types
  initDefaults() {
    const defaults = {
      log: { color: '#AAAAAA', display: 'LOGGER' },
      info: { color: '#AAAAAA', display: 'INFOS' },
      warn: { color: '#FFFF00', display: 'WARNS' },
      error: { color: '#FF0000', display: 'ERROR' },
      debug: { color: '#90EE90', display: 'DEBUG' },
      success: { color: '#FF60CC', display: 'SUCCESS' },
      system: { color: '#AAAAAA', display: 'SYSTEM' },
    };

    for (const [type, config] of Object.entries(defaults)) {
      this.logTypes.set(type, config.color);
      this.displayNames.set(type, config.display);
      this[type] = this.createLogMethod(type);
    }
  }

  // Create a log method for a specific type
  createLogMethod(type) {
    return (data) => {
      this._log(data, type);
    };
  }

  // Format timestamp using moment.js like original
  getTimestamp() {
    if (this.timestampStyle === 'small') {
      // Small format: [5-5-25 5:5]
      const now = new Date();
      const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear().toString().slice(-2)}`;
      const time = `${now.getHours()}:${now.getMinutes()}`;
      return `${date} ${time}`;
    }
    
    // Use moment.js with your original format: HH-DD-MM-YY
    return moment().utcOffset('+05:30').format('HH-DD-MM-YY');
  }

  /**
   * Core logging function - updated to match original style
   * @param {any} data - Data to log (string, Error, object, etc.)
   * @param {string} type - Logger type
   */
  _log(data, type = 'log') {
    // Format message based on input type (same as original)
    let message = data;
    if (data instanceof Error) {
      message = `${data.message}\n${data.stack}`;
    } else if (typeof data === 'object') {
      try {
        message = JSON.stringify(data, null, 2);
      } catch {
        message = String(data);
      }
    } else if (typeof data !== 'string') {
      message = String(data);
    }

    const date = this.getTimestamp();
    const time = chalk.hex('#AAFF22')(date); // Green timestamp like original
    
    const color = this.logTypes.get(type) || '#AAAAAA';
    const display = this.displayNames.get(type) || type.toUpperCase();
    const prefix = chalk.bgHex(color)(display);
    
    // Output in original format: [ time ] [prefix] message (blue)
    console.log(`[ ${time} ] [${prefix}] ${chalk.hex(this.messageColor)(message)}`);
  }

  /**
   * Set the color for log messages
   * @param {string} color - Hex color code for messages
   */
  setMessageColor(color) {
    this.messageColor = color;
  }

  /**
   * Add a new custom logger type
   * @param {string} name - Logger name
   * @param {string} color - Hex color code
   * @param {string} [display] - Optional display name
   */
  addNewLogger(name, color, display) {
    if (this.logTypes.has(name)) {
      throw new Error(`Logger "${name}" already exists. Use setColor() instead.`);
    }

    this.logTypes.set(name, color);
    this.displayNames.set(name, display || name.toUpperCase());
    this[name] = this.createLogMethod(name);
  }

  /**
   * Change the color of an existing logger
   * @param {string} type - Logger type to modify
   * @param {string} color - New hex color code
   */
  setColor(type, color) {
    if (!this.logTypes.has(type)) {
      throw new Error(`Logger "${type}" doesn't exist. Use addNewLogger() first.`);
    }

    this.logTypes.set(type, color);
  }

  /**
   * Set timestamp display style
   * @param {string} style - "big" for detailed or "small" for minimal
   */
  setTimestampStyle(style) {
    if (style !== 'big' && style !== 'small') {
      throw new Error('Timestamp style must be "big" or "small"');
    }
    this.timestampStyle = style;
  }

  /**
   * List all available logger types and their colors
   * @returns {Object} Object with logger types and their colors
   */
  listTypes() {
    const types = {};
    for (const [type, color] of this.logTypes) {
      types[type] = color;
    }
    return types;
  }

  /**
   * Attach logger methods to a client object (optional)
   * @param {object} client - The client object to attach to
   */
  init(client) {
    if (!client) return;
    
    client.logs = {};
    for (const [type] of this.logTypes) {
      client.logs[type] = (data) => this._log(data, type);
    }
  }
}

// Export
const logger = new BetterLogify();
module.exports = { logger };
