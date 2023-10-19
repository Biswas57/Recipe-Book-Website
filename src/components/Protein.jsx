import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Wrapper, Card, Gradient } from './StyledComponents';

function Protein() {
  const [protein, setProtein] = useState([]);

	useEffect(() => {
    getProtein();
  }, []);		
	

  const getProtein = async () => {
    const storedData = localStorage.getItem('proteinData');
    const storedTimestamp = localStorage.getItem('proteinTimestamp');

    if (storedData && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const currentTime = new Date().getTime();

      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        setProtein(JSON.parse(storedData));
        return;
      }
    }

    const api = await fetch(
		`https://api.spoonacular.com/recipes/findByNutrients?apiKey=${process.env.REACT_APP_API_KEY}&minProtein=35&number=9`
    );
    const data = await api.json();

    localStorage.setItem('proteinData', JSON.stringify(data.recipes));
    localStorage.setItem('proteinTimestamp', new Date().getTime().toString());

    setProtein(data.recipes);
  };

  return (
    <div>
      <Wrapper>
        <h3>Post-Workout Meals</h3>
        <Splide 
				options={{ 
					perPage: 4,
					pagination: false,
					drag: 'free',
					gap: "5rem",  
				}}>
          {protein.map((recipe) => {
						return (
							<SplideSlide key={recipe.id}>
              	<Card>
                	<p>{recipe.title}</p>
                	<img src={recipe.image} alt={recipe.title} />
									<Gradient />
              	</Card>
            	</SplideSlide>
						);
					})}
        </Splide>
      </Wrapper>
    </div>
  )
}

export default Protein