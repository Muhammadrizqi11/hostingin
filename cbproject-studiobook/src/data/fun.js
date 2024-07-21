export const getImageSrc = (image) => {
    if (isBase64(image)) {
        return `data:image/jpeg;base64,${image}`;
    }
    return `${image}`; // Assuming images are served from /images directory on your server
};

export const isBase64 = (str) => {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
};