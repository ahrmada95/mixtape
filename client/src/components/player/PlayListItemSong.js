
import { useEffect, useState } from "react"

const PlayListItemSong = ({ track, setSongInfo2, setSongInfo3 }) => {
    const [songName, setSongName] = useState('')
    const [songInfo, setSongInfo] = useState({})
    //const [songInfo2, setSongInfo2] = useState([])
    
    //console.log('What AM I', track)
    useEffect(() => {
        const fetchSongNames = async () => {
        let req = await fetch(`http://localhost:4001/songs/${track}`)
        let res = await req.json()
        //console.log('Somethingelse', res)
        setSongName(res.name)
        setSongInfo(res)
        setSongInfo3(res)
        //setSongInfo()
    }
    fetchSongNames()
    }, [])

    if (!songName) {return}
    


    const handleMediaPlayer2 = () => {
        setSongInfo2(songInfo)
    }


    //console.log(songInfo)
    return (
        <div>
        <li onClick={handleMediaPlayer2}>{songName}</li>
        </div>
    )
}



export default PlayListItemSong;