function checkUrl(url) {
    const regex = new RegExp(/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/);
    return regex.test(url);

}

export { checkUrl }
