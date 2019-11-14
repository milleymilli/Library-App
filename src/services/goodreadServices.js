const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadServices');

const parser = xml2js.Parser({ explicitArray: false });

function goodread() {
  function getbookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=atqE5tU03QD2p3asFONPA`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  return { getbookById };
}

module.exports = goodread();
