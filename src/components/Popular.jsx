import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { TextWrapper, Wrapper, Card, Gradient } from './StyledComponents';
import { Link } from 'react-router-dom';

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const storedData = localStorage.getItem('popularData');
      const storedTimestamp = localStorage.getItem('popularTimestamp');

      if (storedData && storedTimestamp) {
        const timestamp = parseInt(storedTimestamp, 10);
        const currentTime = new Date().getTime();

        if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
          setPopular(JSON.parse(storedData));
          return;
        }
      }

      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();

      if (data && data.recipes) {
        localStorage.setItem('popularData', JSON.stringify(data.recipes));
        localStorage.setItem('popularTimestamp', new Date().getTime().toString());
        setPopular(data.recipes);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
    }
  };

  return (
    <div>
      <Wrapper>
        <TextWrapper>
          <h3>Trending</h3>
        </TextWrapper>
        <Splide
          options={{
            perPage: 3,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}>
          {popular.map((recipe) => {
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

export default Popular;
