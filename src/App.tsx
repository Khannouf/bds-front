import Router from "./routes/index.tsx";
import Providers from "./providers";
import MenuAppBar from "./components/AppBar.tsx";

// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<Title />
//   },
//   {
//     path:'/inscription',
//     element:<div> inscription</div>
//   },
//   {
//     path:'/connexion',
//     element:<div>Connexion </div>
//   }
// ])

function App() {
  return (
    <Providers>
      <MenuAppBar />
      <Router />
    </Providers>
  );
}

export default App;

/* Polygon 3 */
