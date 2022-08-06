const mongoose = require("mongoose");
const axios = require("axios");

exports.getMaps = (req, res) => {

    loc = req.body.loc;


    // const options = {
    //     method: 'GET',
    //     url: 'https://google-maps28.p.rapidapi.com/maps/api/place/findplacefromtext/json',
    //     params: {
    //         inputtype: 'textquery',
    //         fields: 'business_status,formatted_address,geometry,icon,icon_mask_base_uri,icon_background_color,name,permanently_closed,photo,place_id,plus_code,type,opening_hours,price_level,rating,user_ratings_total',
    //         input: loc,
    //         language: 'en'
    //     },
    //     headers: {
    //         'X-RapidAPI-Key': '86956af8acmsh383fd4b0e6df975p1b9b00jsnfaff0c8f3e52',
    //         'X-RapidAPI-Host': 'google-maps28.p.rapidapi.com'
    //     }
    // };

    // axios.request(options).then(function(response) {
    //     console.log(response.data);
    //     res.json(response.data)
    // }).catch(function(error) {
    //     console.error(error);
    //     res.json(err)
    // });



    // const axios = require("axios");

    // const options = {
    //     method: 'GET',
    //     url: 'https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json',
    //     params: { query: loc, region: 'en', language: 'en' },
    //     headers: {
    //         'X-RapidAPI-Key': '86956af8acmsh383fd4b0e6df975p1b9b00jsnfaff0c8f3e52',
    //         'X-RapidAPI-Host': 'google-maps28.p.rapidapi.com'
    //     }
    // };

    // axios.request(options).then(function(response) {
    //     console.log(response.data);
    //     res.json(response.data)
    // }).catch(function(error) {
    //     console.error(error);
    // });

    res.sendFile(__dirname + `\\index.html`);
}