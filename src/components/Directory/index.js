// delete this later
import HomePic from "./../../asserts/homepage.png";
import "./styles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "../Recipe";
import Alert from "../Alert";

function Directory({ data }) {
  
  const [searchInput, setSearchInput] = useState([]);
  const handleChange = (event) => 
  {
    const enteredword = event.target.value.toLowerCase();

    const newFilter = data.filter((value) => {
      return value.fields.item_name.toLowerCase().includes(enteredword);
    });

    if (enteredword === "") {
      setSearchInput("");
    } else {
      setSearchInput(newFilter);
    }
  };

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "cc1b9d11";
  const APP_KEY = "5f8bc8e8f8ee04028d53a121fbb0cd8f";

  const url = `https://api.nutritionix.com/v1_1/search/${query}?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=${APP_ID}&appKey=${APP_KEY}`;

  //=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //https://api.nutritionix.com/v1_1/search/${query}?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=${APP_ID}&appKey=${APP_KEY}

  const getData = async () => {
    if (query !== "") 
    {
      const result = await Axios.get(url);
      const items = result.data.hits;
      const mapitems = items.map 
      (
        (item) =>  
        {
          // console.log (item.fields.item_name)} 
          if (!item.fields.item_name)
          {
            return setAlert("No food with such name");
          }
          console.log(item.fields.item_name);
          setRecipes(item.fields.item_name);
          setQuery("");
          setAlert("");
          return (
            <li> Item{item.fields.item_name} </li>
          );
        }
      )

      // if (!result) {
      //   return setAlert("No food with such name");
      // }
      // console.log(result);
      // setRecipes(result.hits.fields.item_name);
      // setQuery("");
      // setAlert("");

    } 
    else 
    {
      setAlert("Please fill the form");
    }

  };

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="directory">
      <div className="wrap">
        {/* <div className="recipes">
          {recipes !== [] &&
            recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
        </div> */}
        <div className="item" style={{ backgroundImage: `url(${HomePic})` }}>
          {/* Search bar */}
          <h1>
            <form onSubmit={onSubmit} className="search-form">
              {alert !== "" && <Alert alert={alert} />}
              <input
                type="text"
                name="query"
                onChange={onChange}
                value={query}
                autoComplete="off"
                placeholder="Search Food"
              />
              <input type="submit" value="Search" />
            </form>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Directory;
