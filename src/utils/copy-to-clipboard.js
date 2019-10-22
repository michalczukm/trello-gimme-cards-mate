/**
 * `navigator.clipboard.writeText` cannot be used here,
 *   since we're running our scripts in iframe, and `navigator.clipboard.writeText`
 *   requires access to clipboard via Permissions API.
 *   So we have to do this old way.
 */
export const copyToClipboard = text => {
    const element = document.createElement('textarea');
    element.value = text;
    element.setAttribute('readonly', '');

    // prevent "blinking" textarea, we cannot made it hidden or 'display:none' because those elements
    //   are not-selectable
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.zIndex = '-10000';

    document.body.appendChild(element);

    element.select();

    document.execCommand('copy');

    document.body.removeChild(element);
};
