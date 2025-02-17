const inputfield = document.getElementById("user_input");
const datalist = document.getElementById("dogs");
const search = document.getElementById("searchBtn")
const container = document.getElementById("container");

inputfield.addEventListener('input', async () => {
    try {
        
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const breeds = await response.json();
        datalist.innerHTML = '';
        const query = inputfield.value.toLowerCase();
        const filterBreeds = Object.keys(breeds.message).filter(breed => breed.toLowerCase().includes(query));

        filterBreeds.forEach(breed => {
            // console.log(breed); 

            const option = document.createElement("option"); 
            option.value = breed;
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching breeds:", error);
    }
});

search.addEventListener('click', async(e)=>{
    e.preventDefault();
    const {value} = inputfield 
    try{
        // container.innerHTML = `<div id='img-container'><img id="dreed-img" src="./placeholder.jpg" alt="${value}"> <h1>${value}</h1></div>`
        const response = await fetch(`https://dog.ceo/api/breed/${value}/images`);
        // console.log(await response.json());
        const bread = await response.json();
        console.log(bread.message)
        if(bread.code === 404){
            container.innerHTML = `<h1>${value} doesn't exsit</h1>`
        }else{
            let index = 0;
            let htmlContainer = `<div id='img-container'><img id="dreed-img" src="${bread.message[index]}" alt="${value}"></div><h1>${value}</h1>`;
            container.innerHTML = htmlContainer;
            setInterval(()=>{
                index = Math.floor(Math.random() * bread.message.length) + 1;
                console.log(index);
                container.innerHTML = `<div id='img-container'><img id="dreed-img" src="${bread.message[index]}" alt="${value}"></div><h1>${value}</h1>`;
            },5000)
            
        }

    }catch(err){
        console.error(err.message)
    }
});
