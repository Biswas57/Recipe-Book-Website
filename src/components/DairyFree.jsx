import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Wrapper, Card, Gradient } from './StyledComponents';

function Dairy() {
  const [dairy, setDairy] = useState([]);

	useEffect(() => {
    getDairy();
  }, []);		
	

  const getDairy = async () => {
    const storedData = localStorage.getItem('dairyData');
    const storedTimestamp = localStorage.getItem('dairyTimestamp');

    if (storedData && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const currentTime = new Date().getTime();

      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        setDairy(JSON.parse(storedData));
        return;
      }
    }

    const api = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&intolerances=dairy&number=9`
    );
    const data = await api.json();

    localStorage.setItem('dairyData', JSON.stringify(data.recipes));
    localStorage.setItem('dairyTimestamp', new Date().getTime().toString());

    setDairy(data.recipes);
  };
  



  return (
    <div>
      <Wrapper>
        <h3>Dairy Free Choices</h3>
        <Splide 
				options={{ 
					perPage: 3,
					pagination: false,
					drag: 'free',
					gap: "5rem",  
				}}>
          {dairy.map((recipe) => {
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

export default Dairy