const notFound = (req, res) => {
    const params = req.params;
    // const id = req.params.id;

    console.log("Not Found... ", params);
    // console.log("id... ", id);
    res.send('API not found...');
}


module.exports = {
    notFound
}