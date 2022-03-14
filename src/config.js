'use strict'

const { from } = require('env-var');

module.exports = (env) => {
    const { get } = from(env);

    return {
        PORT: get('PORT').default(8080).asPortNumber(),
        BUCKET: get('BUCKET').default('tweets').asString(),
        USERNAME: get('USERNAME').default('Administrator').asString(),
        PASSWORD: get('PASSWORD').default('password').asString(),
        CB_ENDPOINT: get('CB_ENDPOINT').default('cb-example').asString()
    }
}