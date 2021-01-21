let artist = document.getElementById("artist")
let song = document.getElementById("song")
let lyrics = document.getElementById('lyrics')
let btn = document.getElementById('search')
let key = '3a31cdecea93e5b4ff0b11d15337de8f'

let artistName = document.getElementById('artistName')
let artistSong = document.getElementById('artistSong')
let artistImg = document.getElementById('artistImg')


btn.onclick = function searchLyrics(e) {
    e.preventDefault()
    destroyLyrics()
    const url = `https://api.vagalume.com.br/search.php?art=${artist.value}&mus=${song.value}&extra=artpic&apikey={${key}}`
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
    artistName.innerHTML = `Artist: ${data_art_name}`
    artistSong.innerHTML = `Song: ${data_mus[0].name}`
    artistImg.src = data_art_pic_medium

    
    lyrics.innerHTML = data_mus[0].text
    artist.value = ''
    song.value = ''
}

function destroyLyrics() {
    artistName.innerHTML = ''
    artistSong.innerHTML = ''
    artistImg.src = ''
    lyrics.innerHTML = ''
}
