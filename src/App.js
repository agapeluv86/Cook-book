import Footer from "./Recipe_components/Footer";
import Banner from "./Recipe_components/Banner";
import Copy from "./Recipe_components/Copy";
import List from "./Recipe_components/List";
import Nav from "./Recipe_components/Nav";
import { useEffect, useState } from "react"
import axios from "axios";



const RecipeApp = () => {

    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [frecipe, setFrecipe] = useState([]);
    const [keyword, setKeyword] = useState('');

 
    useEffect(()=>{
        makeApiCall()
    },[])
//this function will do the filtering
    const handleFilter = () => {
        const filtered_recipes = recipes.filter((recipe)=>{

            return recipe.name.toLowerCase().includes(keyword.toLowerCase())
        })
        setFrecipe(filtered_recipes)


    }
    function makeApiCall(){

       axios.get("https://dummyjson.com/recipes")
       .then(function(resp){
        console.log(resp.data.recipes)
        setloading(false)
        setRecipes(resp.data.recipes)
       })
       .catch(function(err){
        console.log(err)
        setloading(false);
        setError(true)
       })
       
    }

    return (
        <div className="container-fluid">
            <Nav />
            <Banner setKeyword={setKeyword} handleFilter={handleFilter}/>
            <List  loading={loading} error={error} recipes={recipes} frecipe={frecipe} keyword={keyword}/>
            <Footer/>
            <Copy/>
        </div>
    )
}
export default RecipeApp;