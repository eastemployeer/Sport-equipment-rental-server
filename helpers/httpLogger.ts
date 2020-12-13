import { format, transports } from 'winston';
import colors from 'colors';
import expressWinston from 'express-winston';

export default () =>
	expressWinston.logger({
		transports: [
			new transports.Console({
				format: format.combine(
					format.timestamp({
						format: 'HH:mm:ss',
						alias: 'time'
					}),
					format.errors({ stack: true }),
					format.colorize(),
					format.splat(),
					format.simple(),
					format.printf(
						info => `${info.timestamp} ${colors.green('http')}: ${info.message}`
					)
				)
			})
		],
		expressFormat: true,
		colorize: true,
		requestWhitelist: ['url', 'headers', 'method', 'httpVersion', 'originalUrl', 'query', 'body'], 
		bodyBlacklist: ['password']
	});
