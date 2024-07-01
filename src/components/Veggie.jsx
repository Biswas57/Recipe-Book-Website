import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { TextWrapper, Wrapper, Card, Gradient } from './StyledComponents';
import { Link } from 'react-router-dom';

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    try {
      const storedData = localStorage.getItem('veggieData');
      const storedTimestamp = localStorage.getItem('veggieTimestamp');

      if (storedData && storedTimestamp) {
        const timestamp = parseInt(storedTimestamp, 10);
        const currentTime = new Date().getTime();

        if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
          setVeggie(JSON.parse(storedData));
          return;
        }
      }

      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=vegetarian`
      );
      const data = await api.json();

      if (data && data.recipes) {
        localStorage.setItem('veggieData', JSON.stringify(data.recipes));
        localStorage.setItem('veggieTimestamp', new Date().getTime().toString());
        setVeggie(data.recipes);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching vegetarian recipes:", error);
    }
  };

  return (
    <div>
      <Wrapper>
        <TextWrapper>
          <h3>Vegetarian Choices</h3>
        </TextWrapper>
        <Splide
          options={{
            perPage: 4,
            pagination: false,
            drag: 'free',
            gap: "5rem",
          }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={`/recipe/${recipe.id}`}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

export default Veggie;
