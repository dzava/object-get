const isArray = value => Object.prototype.toString.call(value) === '[object Array]'
const isObject = value => Object.prototype.toString.call(value) === '[object Object]'

const makePath = value => {
    return isArray(value) ? value : value.toString().split('.')
}

/**
 * @param {Object, Array} collection
 * @param {String, Array} path
 * @param [defaultValue=null]
 * */
const get = (collection, path, defaultValue = null) => {

    if (!path) {
        return collection
    }

    const parts = makePath(path)
    let value = collection

    for (const [index, key] of parts.entries()) {

        if (key === '*') {
            value = isObject(value) ? Object.values(value) : value
            value = value.map((c) => get(c, parts.slice(index + 1), defaultValue))
            break
        }

        if (value[key] === undefined) {
            value = defaultValue
            break
        }

        value = value[key]
    }

    return value
}

export default get
export {
    get,
}
