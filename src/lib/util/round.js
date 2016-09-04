function round(places) {
    let factor = Math.pow(10, places);
    return Math.round(this * factor) / factor;
}

export {
    round as default
}

