import "./mediaplayer.css"
import "./media.css"
import PlayList from "./PlayList";
import MediaSearch from "./MediaSearch";
import { useState, useEffect } from "react";

const Media = ({ userPlayLists, setSongInfo2, setCurrPlayListId }) => {

    const [search, setSearch] = useState('')
    const [collapse, setCollapse] = useState(true)
    
    const [songInfoAll, setSongInfoAll] = useState([])
    const [songInfo3, setSongInfo3] = useState({})

    useEffect ( () => {
        const fetchAllong = async() => {
            const req = await fetch("http://localhost:4001/songs");
            const res = await req.json(); 

            let val = []
            for(let i = 0; i < res.length; i++){
                val.push(res[i].name)
            }
            return setSongInfoAll(val)
        }
        fetchAllong()
    }, [])


    console.log(songInfo3)

    const handleMediaPlayer = () => {
        setSongInfo2(songInfo3)
        console.log('clicked', songInfo3)
    }

    const handleCollapse = () => {
        setCollapse((collapse) => !collapse)
        //console.log(collapse)
    }

   

    const handleSearch = songInfoAll.filter((opt) => {
        if(search === '') {
            return false
        } else {
            return opt.toLowerCase().includes(search.toLowerCase())
        }
    })


    return (
        <div className="media-container">
            <div className="nav-container">
                <div id="library-option">
                    <img src='./assets/multi_mixtape_icon.png' className="nav-icon"/>
                    Library
                </div>
                <div id="search-option" onClick={handleCollapse}>
                    <img src='./assets/search_icon.png' className="nav-icon"/>
                    Search
                    
                </div>
                <div className="userpage-button-search-container">
                    {collapse ? null : <input type="text" placeholder="search" value={search} className="userpage-button-search" onChange={(e) => setSearch(e.target.value)}/>}
                    {handleSearch.map((opt, index) => {
                       return <MediaSearch key={index} handleMediaPlayer={handleMediaPlayer} opt={opt}/>
                    })}
                </div>
            </div>
            <div className="var-container">
                <PlayList
                userPlayLists={userPlayLists} 
                setSongInfo2={setSongInfo2}
                setCurrPlayListId={setCurrPlayListId}
                setSongInfo3={setSongInfo3}
                />
            </div>
        </div>
    );
}

export default Media;
