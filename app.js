// XML request:
setTimeout(()=>{

    
    const firstReq = new XMLHttpRequest();
    firstReq.addEventListener('load', function(){
        console.log('xml data main request: ', `its work on status:${this.status}`);
        const data = JSON.parse(this.responseText);
        console.log('xml data main request: ', data);
        const firstFilmReq = data.films[0];
        console.log('xml data main request: ', firstFilmReq);
        const firstFilm = new XMLHttpRequest();
        firstFilm.addEventListener('load', function(){
            console.log('xml data nested request: ', `its work on status:${this.status}`);
            const filmData = JSON.parse(this.responseText);
            console.log('xml data nested request: ', filmData.title);
        });
        firstFilm.addEventListener('error', function(){
            console.log('its not work', e);
        });
        firstFilm.open('Get', firstFilmReq);
        firstFilm.send();
    });
    firstReq.addEventListener('error', function(e){
        console.log('its not work', e);
    });
    
    firstReq.open('Get', 'https://swapi.dev/api/people/1/');
    firstReq.send();
    

}, 1000);



//fetch request:
setTimeout(()=>{


    fetch('https://swapi.dev/api/people/1/')
    .then((response)=>{
        console.log('fetch data main request: ', `its work on status:${response.status}`);
         return response.json();
    })
    .then((data)=>{
        console.log('fetch data main request:', data)
        const datatxt = data.films[0];
        console.log('fetch data main request: ', datatxt)

        return fetch(datatxt);
    })
    .then((responsefilm)=>{
        console.log('fetch data nested request: ', `its work on status:${responsefilm.status}`);
        return responsefilm.json();
    })
    .then((filmdata)=>{
        console.log('fetch data nested request:', filmdata.title)
    })

    .catch((err)=>{
        console.log(err);
    })


},6000);



//axios request:


setTimeout(()=>{


    axios
    .get('https://swapi.dev/api/people/1/')
    .then((res)=>{
        console.log('axios data main request: ', `its work on status:${res.status}`);
        console.log('axios data main request:', res.data);
        const datafilm = res.data.films[0];
        console.log('axios data main request: ', datafilm)
        return axios.get(datafilm);
    })
    .then((resp)=>{
        console.log('axios data nested request: ', `its work on status:${resp.status}`);
        return resp;
    })
    .then((filmdatat)=>{
        console.log('axios data nested request:', filmdatat.data.title)
    })


}, 11000);
