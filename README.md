# dynamic-logger

![npm version](https://img.shields.io/npm/v/dynamic-logger)
![npm downloads](https://img.shields.io/npm/dt/dynamic-logger)
![license](https://img.shields.io/npm/l/dynamic-logger)
![GitHub commits](https://img.shields.io/github/commit-activity/m/reversalxx/dynamic-logger)
![GitHub stars](https://img.shields.io/github/stars/reversalxx/dynamic-logger?style=social)

A professional, flexible logger for Node.js with colorful output, dynamic log types, and customizable timestamp formats.

---

## Installation

Install via npm:

`npm install dynamic-logger`

---

## Features

- **Color-coded logging** for clarity in console output  
- **Built-in log types**: `log`, `info`, `warn`, `error`, `debug`, `success`  
- **Custom log types**: add new loggers with your own labels and colors  
- **Timestamp customization**: choose between `big` or `small` formats  
- **Optional integration** with Discord.js clients  
- **Automatic type handling**: strings, objects, and Error objects are formatted automatically  

---

## Usage

### Importing

`const { logger } = require('dynamic-logger');`

### Basic Logging

```javascript
logger.info('Server started on port 3000');
logger.warn('Memory usage is high');
logger.error('Database connection failed');
logger.debug({ user: 'john', action: 'login' });
logger.success('Operation completed successfully');
```

### Timestamp Customization

```javascript
// Default big format: [05-05-2025 05:05:05]
logger.info('This has a big timestamp');

// Switch to small format: [5-5-25 5:5]
logger.setTimestampStyle('small');
logger.info('This has a small timestamp');

// Switch back to big format
logger.setTimestampStyle('big');
logger.info('Back to big timestamp');
```

### Customization

```javascript
// Change the color of an existing logger
logger.setColor('warn', '#FF00FF');

// Add a new logger type with optional display name
logger.addNewLogger('audit', '#FFD700', 'AUDIT');
logger.audit('User permissions updated');

// List all available loggers and their colors
console.log(logger.listTypes());
```

### Discord.js Integration (Optional)

```javascript
const { Client } = require('discord.js');
const { logger } = require('dynamic-logger');

const client = new Client();

// Attach logger to client (optional)
logger.init(client);

// Use logger via client.logs
client.logs.info('Bot is starting up...');

// Set timestamp style for all logs
logger.setTimestampStyle('small');
```

> ⚠️ Note: `logger.init(client)` is **only required for Discord.js projects**. For web apps, games, or other Node.js applications, you can use the logger directly without `init`.

### Error Handling

The logger handles various data types automatically:

```javascript
// Strings
logger.error('Simple error message');

// Error objects
logger.error(new Error('Something broke'));

// Objects
logger.debug({ user: 'john', action: 'login' });
```

---

## API Reference

### Built-in Loggers

`logger.log()`  
`logger.info()`  
`logger.warn()`  
`logger.error()`  
`logger.debug()`  
`logger.success()`

### Methods

- `addNewLogger(name, color, display)` – Add a new custom logger type  
- `setColor(type, color)` – Change the color of an existing logger  
- `setTimestampStyle(style)` – Set timestamp format (`big` or `small`)  
- `listTypes()` – Returns an object of all logger types and their colors  
- `init(client)` – Attach all loggers to a client object (optional)

### Timestamp Styles

- `big` (default): `[05-05-2025 05:05:05]` – Padded, full date/time with seconds  
- `small`: `[5-5-25 5:5]` – Minimal, no padding, no seconds

---

## Notes

- The `init(client)` method is optional and mainly useful for Discord.js bots  
- This logger works in **any Node.js application**, not just Discord bots  
- Colors can be changed anytime with `setColor()`  
- Timestamp style applies to all subsequent log messages
