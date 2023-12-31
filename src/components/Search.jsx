import styled from "styled-components"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Search() {

	const [search, setSearch] = useState("");
  const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
    navigate(`/searched/${search}`);
	};

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
				<FaSearch></FaSearch>
        <input 
				onChange={(e) => setSearch(e.target.value)}
				type="text" 
        value={search}
        placeholder="Search"/>
      </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0.5rem 20rem;

    div {
        position: relative;
        width: 100%;
    }

    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%; 
    }

    svg {
        position: absolute;
        top: 37.5%;
        left: 3.5%;
        transform: translateY(100%, -50%);
        color: white;
    }
`;

export default Search