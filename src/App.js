import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer';
import { useEffect, useState } from 'react';
import NewQuote from './Components/NewQuote';
import Socials from './Components/Socials';

function App() {

  const colors = [
    "#DC143C", // Crimson
    "#001F3F", // Navy Blue
    "#228B22", // Forest Green
    "#7851A9", // Royal Purple
    "#FF4500", // Burnt Orange
    "#708090", // Slate Gray
    "#00BFFF", // Deep Sky Blue
    "#B8860B", // Dark Goldenrod
    "#800000", // Maroon
    "#008080", // Teal
    "#6A5ACD", // Slate Blue
    "#A52A2A", // Brown
    "#B22222", // Firebrick
    "#4682B4", // Steel Blue
    "#D2691E", // Chocolate
    "#556B2F", // Dark Olive Green
    "#8B4513", // Saddle Brown
    "#9932CC", // Dark Orchid
    "#FF8C00", // Dark Orange
    "#2F4F4F", // Dark Slate Gray
    "#800080", // Purple
  ];

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quotesData, setQuotesData] = useState([]);

  const getQuotes = async () => {
    try {
      const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonQuotes = await response.json();
      setQuotesData(jsonQuotes.quotes);
      getRandomQuote(jsonQuotes.quotes);
    } catch (error) {
      console.error("Error fetching quotes: ", error);
      // Fallback to a default quote in case of an error
      setQuote("Life is what happens when you're busy making other plans.");
      setAuthor("John Lennon");
    }
  };

  const getRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setQuote(randomQuote.quote);
    setAuthor(randomQuote.author);
    setRootColors(getRandomColor());
  };

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  useEffect(() => {
    getQuotes();
  }, []);

  const setRootColors = (colorToUse) => {
    document.documentElement.style.setProperty('--random-color', colorToUse);
  };

  return (
    <div className="App" >
      <div id="wrapper">
        <div id="quote-box">
          <p id="text"><i class="fa fa-quote-left"> </i> {quote}</p>
          <h5 id="author">-{author}</h5>
          <div className='Buttons'>
            <Socials quote={quote} author={author} />
            <NewQuote onClick={() => getRandomQuote(quotesData)} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
