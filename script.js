const $ = document.querySelector.bind(document);
let entries = {}

const toggleBtn = $('toggle');

toggleBtn.addEventListener('click', (e)=>{
    if(toggleBtn.innerText == 'LIGHT'){
        toggleBtn.innerText = 'DARK';
        document.documentElement.setAttribute('theme', 'light')
        toggleBtn.style.backgroundColor = "black";
        toggleBtn.style.color = "white";
    }else{
        toggleBtn.innerText = 'LIGHT';
        document.documentElement.removeAttribute('theme');
        toggleBtn.style.backgroundColor = "white";
        toggleBtn.style.color = "black";
    }
})

async function getTvShowData(title){
    try{
        let res = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${title}`);
        let data = await res.json();
        document.getElementById("show-title").innerHTML = data.name;
        document.getElementById("show-cover").src = data.image.original;
        document.getElementById("show-summary").innerHTML = data.summary;
        document.getElementById("show-type").innerHTML = data.type;
        document.getElementById("show-language").innerHTML = data.language;
        document.getElementById("date").innerHTML = data.premiered;
    }catch(err){
        console.error(err)
    }
}

const params = new URLSearchParams(location.search);
params.forEach((value, key)=>{
    console.log(`Key: ${key}, Value: ${decodeURIComponent(value)}`);
    if(key === "show_name"){
        entries.show_name = value;
    }
});

const {show_name} = entries;
getTvShowData(show_name);

