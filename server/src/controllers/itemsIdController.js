require('dotenv').config();
const axios = require('axios');

exports.itemsId = async (req, res) => {
  try {
    const code = req.params.id;
    const apiMeliItemsId = process.env.URL_ITEM_ID;
    let uri = apiMeliItemsId + code;
    const AUTHOR_OBJ = {
      author: {
        name: `${process.env.AUTHOR_NAME}`,
        lastname: `${process.env.AUTHOR_LASTNAME}`,
      },
    };
    let uriDetails = `${apiMeliItemsId}${code}/description`;

    await axios.all([axios.get(uri), axios.get(uriDetails)]).then(
      axios.spread((item, description) => {
        const result = {
          ...AUTHOR_OBJ,
          item: {
            id: item.data.id,
            title: item.data.title,
            price: {
              currency: item.data.currency_id,
              amount: item.data.price,
              decimals: item.data.price,
            },
            picture: item.data.pictures[0].url,
            condition: item.data.condition,
            free_shipping: item.data.shipping.free_shipping,
            sold_quantity: item.data.sold_quantity,
            description: description.data.plain_text,
          },
        };
        return res.status(200).send(result);
      })
    );
  } catch (err) {
    return res.status(404).send(err);
  }
};
