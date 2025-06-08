import "./App.css";
import Search from "./components/Search";
import hero from "./assets/hero.png";

function App() {
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src={hero} alt="Hero bbanner" />
            <h1>
              Discover <span className="text-gradient">Movies</span>You'll Enjoy
              Without the Hassle
            </h1>
            <h3 className="text-white absolute top-2 left-2 font-bold rounded-full bg-indigo-950 p-2 shadow-2xl">
              TMDB <span className="text-gradient ">COLLECTIONS</span>
            </h3>
          </header>

          <Search />
        </div>
      </div>
    </main>
  );
}

export default App;
