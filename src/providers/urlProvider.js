const urlProvider = ({ url, query = {}}) => {
    const encondedUrl = url instanceof URL ? url : new URL(url)

    for (const key of Object.keys(query)) {
        encondedUrl.searchParams.append(key, query[key])
    }

    return encondedUrl
}

export default urlProvider