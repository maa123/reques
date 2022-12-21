import fetch from 'node-fetch'

module.exports = async (options, callback) => {
    if (!("url" in options)) {
        throw new Error("url is required")
    }
    const url = new URL(options.url)
    if ("qs" in options) {
        url.search = new URLSearchParams(options.qs)
    }
    let body = null;
    if ("form" in options) {
        body = new URLSearchParams(options.form)
    }
    try {
        const res = await fetch(url, {
            method: options.method ?? 'GET',
            headers: options.headers ?? {'User-Agent': ''},
            body,
        })
        const text = await res.text()
        callback(null, {
            statusCode: res.status,
            headers: res.headers.raw(),
        }, text)
    } catch (e) {
        callback(e, null, null)
    }
}