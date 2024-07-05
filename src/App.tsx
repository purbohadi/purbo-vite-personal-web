import "./App.css";
import { Navbar } from "./components";
import { Home, Education, Experience, Contact, Footer } from "./sections";

function App() {
    return (
        <div className="flex flex-col items-center sm:p-10 p-4 text-black">
            <Navbar />
            <Home />
            <Education />
            <Experience />
            <Contact />
            <Footer />
            {/* TODO:
          - Huawei e certificados,
          - Dark mode
          */}
        </div>
    );
}

export default App;
