import { logger } from '../infra';

export const errorResponse = (message, error) => {
    logger.error(message, error);
    return {
        error: message,
        data: {},
    };
};
