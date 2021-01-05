export const getBody = `<?xml version="1.0"?>
    <request>
    <login>${process.env.REACT_APP_PREVIO_LOGIN}</login>
    <password>${process.env.REACT_APP_PREVIO_PASSWORD}</password>
</request>`;
