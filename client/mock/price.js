const Mock = require('mockjs');

const price = Mock.mock({
    'data':
        {
            Mean: 123,
            Conf: 1.1
        }
});

module.exports = {
    ['GET /api/price'](req, res) {
        let data = price.data;
        res.status(200).json({
            data: data
        });
    },
    ['POST /api/price'](req, res) {
        console.log(req.body)
        let data = price.data;
        res.status(200).json(
            data
        );
    },
};
