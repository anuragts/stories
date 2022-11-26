import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data);
    setLoading(true);

    const response = await fetch("/api/getStory", {
      method: "POST",
      body: JSON.stringify({ prompt: dataObj.prompt,genre:dataObj.genre,words:dataObj.words}), 
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json(); 
    if (result.error) {
      setLoading(false);
      setError(result.error);
    } else {
      setLoading(false);
      setData(result);
    }
  };

  return (
    <div className="">
      <Head>
        <title>Stories</title>
        <meta name="description" content="Get Short Stories in one click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <h1 className="text-center text-2xl md:text-4xl mt-[5rem]">
          <Link href="/">
          Get Short Story 📖 
          </Link> 
          <button title="currently in beta , responses may vary" className="border-2 text-xl rounded-full mx-5 px-3 py-1 text-[#00ffc8] border-[#00ffc8] beta">beta
          </button>
        </h1>
     
        <form onSubmit={handleSubmit} className="my-5 text-center">
          <input
            type="text"
            className="text-center text-sm md:text-2xl py-4 px-2 md:px-8 mt-10 mb-5 mx-2 md:mx-5"
            name="prompt"
            required
            placeholder="Alien Invasion on Earth"
          />
          <select name="genre" id="genre" className="text-xl py-2 px-2 text-center mx-5">
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="drama">Drama</option>
            <option value="Action">Action</option>
            <option value="Adventurous">Adventurous</option>
            <option value="Fairy Tale">Fairy Tale</option>  
            <option value="Fantasy">Fantasy</option>
            <option value="Sad">Sad</option>
            <option value="Motivation">Motivation</option>
            <option value="Comedy">Comedy</option>
            <option value="Fiction">Fiction</option>
          </select>
          {/* <select name="words" id="words" className="text-xl py-2 px-2 text-center my-5">
          <option value="100">100 words</option>
            <option value="150">150 words</option>
            <option value="300">300 words</option>
            <option value="500">500 words</option>
            <option value="800">800 words</option>
            <option value="1000">1000 words</option>
       
          </select> */}
          <br />
          <button
            type="submit"
            className="my-5 bg-white text-black py-3 px-7 sm:text-xl rounded-full font-bold border-2 border-white hover:bg-black hover:text-white text-sm"
          >
            Submit
          </button>
        </form>
        {loading && (
          <p className="text-center my-5 10">Generating a story...</p>
        )}
           {error && (
          <div className="text-center text-red-500 text-xl">
            <p>{error}</p>
          </div>
        )}

        <div className="text-center mb-5 mt-[2rem] md:mt-[4rem] mx-[1rem] md:mx-[20rem] ">{data}</div>
    </div> 
  );
}
