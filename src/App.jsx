import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import background from "../src/assets/background.png";
import { SidebarProvider } from "./contexts/sidebarProvider";

/*
const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

const response = await fetch(
    `https://api.unsplash.com/topics/wallpapers/photos?orientation=landscape&client_id=${apiKey}`
);
const photographs = await response.json(); */

function App() {
    //const [image, setImage] = useState(photographs[0].urls.full);

    return (
        <section
            className="w-screen min-h-screen h-auto bg-cover bg-no-repeat flex"
            style={{ backgroundImage: `url(${background})` }}
        >
            <AuthProvider>
                <SidebarProvider>
                    <RoutesApp></RoutesApp>
                </SidebarProvider>
            </AuthProvider>
        </section>
    );
}

export default App;
