import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState([]);
    const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async (name) => {
		const data = await fetch(
			`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
		);
        const dataDetails = await data.json();
        setDetails(dataDetails);
        console.log(dataDetails);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name])

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <ImageWrapper>
                    <img src={details.image} alt="" />
                </ImageWrapper>
            </div>
            <Info>
                <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
                    Instructions
                </Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>
                    Ingredients
                </Button>
                <TextWrapper>
                    {activeTab === 'instructions' && (
                        <div>
                            <h3>Overview: </h3>
                            <h3 className="summary" dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                            <h3>Procedure: </h3>
                            <ol className="instructions" dangerouslySetInnerHTML={{ __html: details.instructions }}></ol>
                        </div>
                    )}
                    {activeTab === 'ingredients' && (
                        <ul>
                            <h3>Ingredients: </h3>
                            {details.extendedIngredients?.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>
                    )}
                </TextWrapper>
            </Info>
        </DetailWrapper >
    );
}

const DetailWrapper = styled.div`
    margin-top: 8rem;
    margin-bottom: 4rem;
    display: flex;
    align-items: start; // align content to the top

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    .summary {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 2rem;
        margin-top: 0.3rem;
        line-height: 2.2rem;
    }

    h2 {
        margin-bottom: 1.5rem; // reduced the margin
    }

    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul {
        margin-top: 1.5rem; // reduced the margin
    }
`;

const ImageWrapper = styled.div`
    transform: translateX(-4rem); 
`;

const TextWrapper = styled.div`
    width: calc(100% + 8rem); 
    transform: translateX(-6rem);
    margin-top: 1.5rem; 
`;

const Button = styled.button`
    background: white;
    padding: 1rem 2rem;
    color: #313131;
    border: 1.5px solid black; // reduced border width
    margin-right: 1.5rem; // reduced the margin
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 8rem; // reduced the margin
`;

export default Recipe