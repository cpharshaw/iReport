const test = (req, res) => {
    const params = req.params;
    // const id = req.params.id;

    console.log("TEST - params... ", params);
    // console.log("id... ", id);
    res.send('hello - test');
}

const test_id = (req, res) => {
    const params = req.params;
    const id = req.params.id;

    console.log("TEST_ID - params... ", params);
    console.log("id... ", id);
    res.send(`hello - test_id, id = ${id}`);
}


module.exports = {
    test,
    test_id
}