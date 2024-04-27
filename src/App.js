import Home from './pages/Home';
import {Routes,Route,Outlet} from 'react-router-dom'
import recipeDetail from './pages/recipeDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
//using router dom for navigation, want to keep this navbar fixed in all pages 
function Layout() {
  return (
    <>
    <NavBar/>
      <Outlet/>
    <Footer/>
    </>
  )
}
function App() {
  return (
    <div className="bg-black">
        <Routes >
          <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='recipes/:id' element={<recipeDetail />}/>
         </Route>
        </Routes>
    </div>
  );
}

export default App;
