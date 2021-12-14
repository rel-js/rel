"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxRetries = void 0;
const defaultMaxRetryValue = 3;
/**
 * Get the MAX_RETRIES value used in conflict resolution
 * This can be loaded through an environment variable process.env.CONFLICT_RESOLUTION_MAX_RETRIES
 * or uses a default value
 */
const getMaxRetries = () => {
    if (!process.env.CONFLICT_RESOLUTION_MAX_RETRIES) {
        return defaultMaxRetryValue;
    }
    const parsedEnvValue = parseInt(process.env.CONFLICT_RESOLUTION_MAX_RETRIES, 10);
    if (isNaN(parsedEnvValue)) {
        return defaultMaxRetryValue;
    }
    return parsedEnvValue;
};
exports.getMaxRetries = getMaxRetries;
//# sourceMappingURL=getMaxRetries.js.map