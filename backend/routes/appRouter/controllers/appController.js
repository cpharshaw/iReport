const path = require('path');

const app = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/out/index.html'));
}


module.exports = {
    app
}
