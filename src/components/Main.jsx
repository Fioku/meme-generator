import React from "react";

export default function Main() {
    const [meme, setMeme] = React.useState({
        topText: "Top Text",
        bottomText: "Bottom Text",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function changingMeme(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main className="flex flex-col justify-center items-center gap-10">
            <div>
                <label className="mr-10">Top Text
                    <input type="text" name="topText" className="border border-1 border-zinc-950 rounded-md ml-3"  onChange={changingMeme} value={meme.topText} />
                </label>
                <label>Bottom Text
                    <input type="text" name="bottomText" className="border border-1 border-zinc-950 rounded-md ml-3" onChange={changingMeme} value={meme.bottomText} />
                </label>
            </div>
            <button className="rounded-md bg-purple-700 text-white px-4 py-2" onClick={getMemeImage}>Get a new meme image 🖼</button>
            <div className="relative text-center">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-white font-bold text-4xl uppercase text-stroke">{meme.topText}</span>
                <img src={meme.randomImage} alt="Meme Image"/>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-4xl uppercase text-stroke">{meme.bottomText}</span>
            </div>
        </main>
    )
}