const log = (logLevel, displayAppendix, message, payload = {}) => {
    // tslint:disable-next-line:no-console
    (['error', 'fatal'].find(level => level === logLevel) ? console.error : console.log)(
        displayAppendix,
        message,
        payload,
    );
};

export const logger = {
    error: (message, error) => {
        log('error', '=== ERROR ===', message, error);
    },

    info: (message, payload = {}) => {
        log('info', '===', message, payload);
    },

    debug: (message, payload) => {
        log('debug', '=== DEBUG ===', message, payload);
    },

    fatal: (message, error) => {
        log('error', '=== FATAL ===', message, error);
    },
};
