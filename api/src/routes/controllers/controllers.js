const axios = require('axios');
const {Character, Episode} = require('../../db');
CHARACTERS_URL = 'https://rickandmortyapi.com/api/character';
EPISODES_URL = 'https://rickandmortyapi.com/api/episode';

//TRAIGO LOS CHARACTERS DE LA API
async function getApiCharacters(){
    const resultAxios = await axios.get(CHARACTERS_URL)

    const apiCharacters = resultAxios.data?.results.map(ch=>{

        return {
            id: ch.id,
            name: ch.name,
            status: ch.status,
            species: ch.species,
            type: ch.type,
            gender: ch.gender,
            origin: ch.origin.name,
            image: ch.image
        }
    })
    return apiCharacters;
}

//TRAIGO LOS CHARACTERS DE LA DB
async function getDbCharacters (){
    return await Character.findAll({
        include: Episode,
        attributes: ['name' , 'id', 'status', 'species', 'origin', 'image', 'createdInDb'], //estas propiedades las mando al front
        through:{
            attributes: []
        }
    })
}

//TRAIGO TODOS LOS CHARACTERS (api y db)
async function allCharacters(){
    const [apiCharacters, dbCharacters] = await Promise.all([getApiCharacters(), getDbCharacters()]);
    return [...apiCharacters, ...dbCharacters]; 
}

//PRECARGO LOS EPISODIOS EN LA DB
async function apiEpisodesToDb(){
    const apiEpisodes = await axios.get(EPISODES_URL);

    const episodesData = await apiEpisodes.data.results.map(e=> e.name)

    const objEpisodes = episodesData.map(e => {return {name: e}})
    await Episode.bulkCreate(objEpisodes);
}



module.exports = {
    allCharacters,
    apiEpisodesToDb,
}