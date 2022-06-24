const axios = require('axios');
require('dotenv').config();

exports.itemsQuery = async (req, res) => {
  try {
    const q = req.query.q;
    const apiMeliItems = process.env.URL_ITEMS;
    let uri = apiMeliItems + q;
    const AUTHOR_OBJ = {
      author: {
        name: `${process.env.AUTHOR_NAME}`,
        lastname: `${process.env.AUTHOR_LASTNAME}`,
      },
    };
    await axios.all([axios.get(uri)]).then(
      axios.spread((items) => {
        const result = {
          ...AUTHOR_OBJ,
          category: items.data.filters[0].values[0].path_from_root,
          items: items.data.results.map((item) => {
            return {
              id: item.id,
              title: item.title,
              price: {
                currency: item.prices.prices[0].currency_id,
                amount: item.prices.prices[0].amount,
                decimals: item.prices.prices[0].amount,
              },
              picture: item.thumbnail,
              conditions: item.condition,
              free_shipping: item.shipping.free_shipping,
            };
          }),
        };
        return res.status(200).send(result);
      })
    );
  } catch (err) {
    return res.status(404).send(err);
  }
};
