export const optimizeImage = (
    url: string | undefined,
    w = 800,
    h = 800,
    q = 60
) => {
    if (!url) return '';
    return url.replace('upload/', `upload/w_${w},h_${h},q_${q},c_limit/`);
};
