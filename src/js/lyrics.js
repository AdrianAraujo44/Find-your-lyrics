let artist = document.getElementById("artist")
let songName = document.getElementById("song")
let lyrics = document.getElementById('lyrics')
let btn = document.getElementById('search')
let key = '3a31cdecea93e5b4ff0b11d15337de8f'


btn.onclick = function searchLyrics(e) {
    e.preventDefault()
    const url = `https://api.vagalume.com.br/search.php?art=${artist.value}&mus=${songName.value}&extra=artpic&apikey={${key}}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.type != 'song_notfound' && data.type !='"notfound"') {
                buildLyricsContent(data.art.name,data.mus,data.art.pic_medium)
            }else {
                lyrics.innerHTML = 'This song was not found'
                
            }
        })
        .catch(error => console.log(error))
}

function buildLyricsContent(data_art_name,data_mus,data_art_pic_medium) {
    document.getElementById('nameArtist').innerHTML = `Artist: ${data_art_name}`
    document.getElementById('nameSong').innerHTML = `Song: ${data_mus[0].name}`
    document.getElementById('artistImg').src = data_art_pic_medium

    
    lyrics.innerHTML = data_mus[0].text
    artist.value = ''
    songName.value = ''
}
