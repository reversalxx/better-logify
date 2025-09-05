const chalk = require('chalk');

class FlexiLogger {
  constructor() {
    this.logTypes = new Map();
    this.displayNames = new Map();
    this.timestampStyle = 'big'; // Default to big format
    this.initDefaults();
  }

  // Initialize default log types
  initDefaults() {
    const defaults = {
      log: { color: '#AAAAAA', display: 'LOG' },
      info: { color: '#3498DB', display: 'INFO' },
      warn: { color: '#F39C12', display: 'WARN' },
      error: { color: '#E74C3C', display: 'ERROR' },
      debug: { color: '#2ECC71', display: 'DEBUG' },
      success: { color: '#27AE60', display: 'SUCCESS' }
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
      this.log(data, type);
    };
  }

  // Format timestamp based on current style
  getTimestamp() {
    const now = new Date();
    
    if (this.timestampStyle === 'small') {
      // Small format: [5-5-25 5:5]
      const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear().toString().slice(-2)}`;
      const time = `${now.getHours()}:${now.getMinutes()}`;
      return `${date} ${time}`;
    }
    
    // Default big format: [05-05-2025 05:05:05]
    const pad = (n) => n.toString().padStart(2, '0');
    const date = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    return `${date} ${time}`;
  }

  /**
   * Core logging function
   * @param {any} data - Data to log (string, Error, object, etc.)
   * @param {string} type - Logger type
   */
  log(data, type = 'log') {
    const timestamp = this.getTimestamp();
    const color = this.logTypes.get(type) || '#AAAAAA';
    const display = this.displayNames.get(type) || type.toUpperCase();

    // Format message based on input type
    let message;
    if (data instanceof Error) {
      message = `${data.message}\n${data.stack}`;
    } else if (typeof data === 'object') {
      try {
        message = JSON.stringify(data, null, 2);
      } catch {
        message = String(data);
      }
    } else {
      message = String(data);
    }

    // Create colured output
    const timeStr = chalk.gray(timestamp);
    const prefix = chalk.bgHex(color).black(` ${display} `);
    
    console.log(`[ ${timeStr} ] [${prefix}] ${message}`);
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
      client.logs[type] = (data) => this.log(data, type);
    }
  }
}

// Export
const logger = new FlexiLogger();
module.exports = { logger };
