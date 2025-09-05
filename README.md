# better-logify

![npm version](https://img.shields.io/npm/v/better-logify)
![npm downloads](https://img.shields.io/npm/dt/better-logify)
![license](https://img.shields.io/npm/l/better-logify)
![GitHub commits](https://img.shields.io/github/commit-activity/m/reversalxx/better-logify)
![GitHub stars](https://img.shields.io/github/stars/reversalxx/better-logify?style=social)
![Support](https://img.shields.io/badge/Support-Discord-7289DA?style=flat&logo=discord)](https://discord.gg/your-invite)

> A professional, flexible logger for Node.js with colorful output, dynamic log types, and customizable timestamp formats.

---

## Table of Contents

- [Installation](#installation)  
- [Features](#features)  
- [Usage](#usage)  
  - [Importing](#importing)  
  - [Basic Logging](#basic-logging)  
  - [Timestamp Customization](#timestamp-customization)  
  - [Customization](#customization)  
  - [Discord.js Integration (Optional)](#discordjs-integration-optional)  
  - [Error Handling](#error-handling)  
- [API Reference](#api-reference)  
- [Timestamp Styles](#timestamp-styles)  
- [Comparison: Big vs Small Timestamp](#comparison-big-vs-small-timestamp)  
- [Notes](#notes)  
- [Contributing](#contributing)  
- [License](#license)

---

## Installation

Install via npm:

`npm install better-logify`

or using yarn:

`yarn add better-logify`

---

## Features

- 🌈 **Color-coded logging** for clear and readable console output  
- 🛠 **Built-in log types**: `log`, `info`, `warn`, `error`, `debug`, `success`  
- ✨ **Custom log types**: add new loggers with your own labels and colors  
- ⏰ **Timestamp customization**: choose between `big` or `small` formats  
- 🤖 **Optional integration** with Discord.js clients  
- 📝 **Automatic type handling**: strings, objects, and `Error` objects  

---

## Usage

### Importing

`const { logger } = require('better-logify');`

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
// Change color of an existing logger
logger.setColor('warn', '#FF00FF');

// Add a new logger type
logger.addNewLogger('audit', '#FFD700', 'AUDIT');
logger.audit('User permissions updated');

// List all available loggers
console.log(logger.listTypes());
```

### Discord.js Integration (Optional)

```javascript
const { Client } = require('discord.js');
const { logger } = require('better-logify');

const client = new Client();

// Attach logger to client (optional)
logger.init(client);

// Use logger via client.logs
client.logs.info('Bot is starting up...');

// Set timestamp style for all logs
logger.setTimestampStyle('small');
```

> ⚠️ **Note**: `logger.init(client)` is only needed if you are using a Discord.js bot. For any other Node.js application, you can use `logger` directly.

### Error Handling

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

- `addNewLogger(name, color, display)` – Add a custom logger type  
- `setColor(type, color)` – Change color of an existing logger  
- `setTimestampStyle(style)` – Set timestamp format (`big` or `small`)  
- `listTypes()` – List all logger types and their colors  
- `init(client)` – Attach logger to a client object (optional)

---

## Timestamp Styles

- **big** (default): `[05-05-2025 05:05:05]` – padded, full date/time  
- **small**: `[5-5-25 5:5]` – minimal, shorter format  

---

## Comparison: Big vs Small Timestamp

| Style | Example |
|-------|---------|
| **Big** | `[05-05-2025 05:05:05]` |
| **Small** | `[5-5-25 5:5]` |

---

## Notes

- Works in **any Node.js application**, not just Discord bots  
- Colors and timestamp style can be changed anytime with `setColor()`  
- `init(client)` is optional and only relevant for Discord.js integration  

---

## License

[MIT License](https://opensource.org/licenses/MIT)
