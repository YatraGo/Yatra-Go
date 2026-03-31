const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;
const PASSTHROUGH_PREFIXES = ['data:', 'blob:', 'mailto:', 'tel:', '#'];
export const asset = (path) => {
    if (!path || typeof path !== 'string') {
        return path;
    }
    if (ABSOLUTE_URL_PATTERN.test(path) || PASSTHROUGH_PREFIXES.some((prefix) => path.startsWith(prefix))) {
        return path;
    }
    const baseUrl = import.meta.env.BASE_URL || '/';
    let normalized = path.replace(/\\/g, '/').replace(/^\.?\//, '');
    if (normalized.startsWith('public/')) {
        normalized = normalized.slice('public/'.length);
    }
    return `${baseUrl}${normalized}`;
};
const normalizeMediaValue = (value, key) => {
    if (typeof value === 'string' && /^(img|image|src|gallery)/i.test(key)) {
        return asset(value);
    }
    if (Array.isArray(value)) {
        return value.map((item) => normalizeMediaValue(item, key));
    }
    if (value && typeof value === 'object') {
        return normalizeAssetFields(value);
    }
    return value;
};
export const normalizeAssetFields = (entry) =>
    Object.fromEntries(
        Object.entries(entry).map(([key, value]) => [key, normalizeMediaValue(value, key)])
    );