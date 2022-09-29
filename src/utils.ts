/**
 *
 * @param value
 */
export const getSeverityColor = (value: number): string => {
    const hue = ((1 - value) * 104).toString(10);

    return `hsl(${hue},85%,43%)`;
};
