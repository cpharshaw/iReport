
const portfolio = (req, res) => {
    const params = req.params;
    const id = req.params.id;

    console.log("portfolio - params... ", params);
    // console.log("id... ", id);
    res.send('hello - portfolio');
}

const portfolio_id = (req, res) => {
    const params = req.params;
    const id = req.params.id;

    console.log("portfolio_id - params... ", params);
    console.log("id... ", id);
    res.send(`hello - portfolio_id, id = ${id}`);
}


module.exports = {
    portfolio,
    portfolio_id
}