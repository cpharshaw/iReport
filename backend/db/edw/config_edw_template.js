// needs the report server and username + password, remove '_template' from the filename
const config = {
    user: "",
    password: "",
    server: "",
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        useUTC: false
    }
}

module.exports = {
    config
}
