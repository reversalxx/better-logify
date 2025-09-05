const { logger } = require('../index.js');

console.log('🚀 Better-Logify Demo - Updated Style\n');

console.log('=== Basic Logging (Default Blue Messages) ===');
logger.log('This is a basic log message');
logger.info('Server started on port 3000');
logger.warn('Memory usage is high');
logger.error('Database connection failed');
logger.debug('Debug information');
logger.success('Operation completed successfully');

console.log('\n=== Custom Message Color ===');
logger.setMessageColor('#FF00FF'); // Change to magenta
logger.log('This message should be magenta');
logger.info('This info message should also be magenta');

logger.setMessageColor('#00FF00'); // Change to green
logger.warn('This warning message should be green');

logger.setMessageColor('#2277FF'); // Back to default blue
logger.success('Back to default blue color');

console.log('\n=== Timestamp Styles ===');
logger.setTimestampStyle('small');
logger.info('This uses small timestamp format');

logger.setTimestampStyle('big');
logger.info('Back to big timestamp format');

console.log('\n=== Error Handling ===');
logger.error('Simple error message');
logger.error(new Error('This is an Error object with stack trace'));

console.log('\n=== Object Logging ===');
logger.debug({ user: 'john', action: 'login', timestamp: new Date() });

console.log('\n=== Custom Logger ===');
logger.addNewLogger('test', '#FFD700', 'AUDIT');
logger.test('Tested Logger');

console.log('\n=== List Available Types ===');
console.log('Available logger types:', logger.listTypes());

console.log('\n✅ Demo completed! The logger now matches your original style while keeping all BetterLogify features.');
