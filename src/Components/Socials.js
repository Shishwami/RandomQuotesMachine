function Socials({ quote, author }) {
    const encodedQuote = encodeURIComponent(quote);
    const encodedAuthor = encodeURIComponent(author);
    return (
        <div className="social-container">
            <a 
                href={`https://twitter.com/intent/tweet?text="${encodedQuote}" - ${encodedAuthor}&url=https://shishwami.github.io/RandomQuotesMachine/`} 
                target="_blank" 
                rel="noopener noreferrer" 
                id="tweet-quote"
            >
                <i className="fa fa-twitter"></i>
            </a>
            <a 
                className="button" 
                id="tumblr-quote" 
                title="Post this quote on Tumblr!" 
                target="_blank" 
                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodedAuthor}&content=${encodedQuote}&canonicalUrl=https://shishwami.github.io/RandomQuotesMachine/&shareSource=tumblr_share_button`} 
               
            >
                <i className="fa fa-tumblr"></i>
            </a>
        </div>
    );
}

export default Socials;
