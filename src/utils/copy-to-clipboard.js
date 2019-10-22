/**
 * `navigator.clipboard.writeText` cannot be used here,
 *   since we're running our scripts in iframe, and `navigator.clipboard.writeText`
 *   requires access to clipboard via Permissions API
 */
export const copyToClipboard = text => {
    const element = document.createElement('textarea');
    element.value = text;

    document.body.appendChild(element);

    element.select();

    document.execCommand('copy');

    document.body.removeChild(element);
};
