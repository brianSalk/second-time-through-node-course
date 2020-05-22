const request = require('request')

const num_of_words_in_dict = 14101

const getURL = random_number => { 
    return `https://lexicala1.p.rapidapi.com/entries/EN_DE000${random_number}`
}

const getRandomNumber = () => {
    const rand = ('00000' + (Math.floor(Math.random() * num_of_words_in_dict)).toString()).slice(-5)
    return rand
}

const getWordAndDefinition = (callback) => {
    const url = getURL(getRandomNumber())
    const options = {
        method: 'GET',
        json: true,
        url,
        headers: {
          'x-rapidapi-host': 'lexicala1.p.rapidapi.com',
          'x-rapidapi-key': 'f1eb98f260msh01d077b468dffd3p11cec8jsnafd0e1d14dad',
          useQueryString: true
        }
      };
    request(options, (err, res) => {
        if (err) {
            callback('could not connect to server... Please check your internet connection')
        } else if (res.body.status) {
            callback(undefined, {status: res.body.status, error: res.body.message})
        } else {
            callback(undefined, { 
                word: res.body.headword.text,
                definition: res.body.senses[0].definition
             })
        }
    })
}

module.exports = getWordAndDefinition