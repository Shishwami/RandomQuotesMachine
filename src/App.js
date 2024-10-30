import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer';
import { useEffect, useState } from 'react';
import NewQuote from './Components/NewQuote';

function App() {

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [colorToUse, setColor] = useState('');
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
      setColor('#000');
    }
  };

  const getRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setQuote(randomQuote.quote);
    setAuthor(randomQuote.author);
    setColor(getRandomColor());
    setRootColors();
  };

  function getRandomColor() {
    const r = Math.floor(Math.random() * 127 + 100);
    const g = Math.floor(Math.random() * 127 + 100);
    const b = Math.floor(Math.random() * 127 + 100);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }

  useEffect(() => {
    getQuotes();
    setRootColors();
  }, []);

  const setRootColors = () => {
    document.documentElement.style.setProperty('--random-color', colorToUse);
  };

  return (
    <div className="App" >
      <div id="wrapper">
        <div id="quote-box">
          <p id="text">{quote}</p>
          <h5 id="author">-{author}</h5>
          <div className='Buttons'>
            <NewQuote onClick={() => getRandomQuote(quotesData)} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
