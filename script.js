const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

async function searchSong(searchTerm) {
  const resposne = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await resposne.json();
  showData(data);
}


function showData(data) {
  result.innerHTML = `
     <ul class="songs">
     ${data.data.map(song => `<li>
       <span><strong>${song.artist.name}</strong> -${song.title}</span>
       
     </li>`).join("")}
     
     </ul>
  `;
   if (data.prev || data.next) {
     more.innerHTML = `
     ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">prev</button>` : ''}
     ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">next</button> ` : '' }
     `;
   } else {
     more.innerHTML = "";
   }


};


async function getMoreSongs(url) {
console.log(url);
const reponse = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
const data = resposne.json();
showData(data);
}



form.addEventListener("submit", e => {
e.preventDefault();
const searchTerm = search.value.trim();
if(!searchTerm) {
  alert("enter name")
} else {
  searchSong(searchTerm);
}
} );


