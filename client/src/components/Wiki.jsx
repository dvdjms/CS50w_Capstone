import styled from 'styled-components';
import React, { useState } from 'react';


const Wiki = () => {

      const [wikiData, setWikiData] = useState([]);
      const [wikiImage, setWikiImage] = useState([]);

      const handleSubmit = (e) => {
            e.preventDefault()
            const wikisearch = e.target.search.value;

            fetch('/wiki', {
                  method: "POST",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                        search: wikisearch
                  }),
                  credentials: 'include',
            })
            .then(res => res.json())
            .then(data => {
                  if (data.summary === 'Not found.'){
                        setWikiData(data.message);
                  }
                  setWikiData(data.summary);
                  setWikiImage(data.image);
            })
            .catch(err => console.error(err))
      };


      return (
            <>
            <WikiContainer>
                  <form onSubmit={handleSubmit} >
                        <InputContainer >
                              <label hidden htmlFor="search">Search Wikipedia</label>
                              <Input name="search" type="text" id="search" placeholder="Search Wikipedia" required></Input>
                        </InputContainer> 

                        <ButtonContainer className="col-12">
                              <Button type="submit">Search</Button>
                        </ButtonContainer>
                  </form>

                  <SearchResults>
                       <p>{wikiData}</p>
                       <img alt="" src={wikiImage} style={{width: "200px"}}></img>
                  </SearchResults>
            </WikiContainer>
            </>
      );

};


const InputContainer = styled.div`
      float: left;
      height: 37px;
      width: 75%;
`;

const ButtonContainer = styled.div`
      float: left;
      height: 37px;
      padding-top: 3px;
      width: 25%;
`;

const Button = styled.button`
      background-color:#f9dbdb;
      border: solid #8e0a0a;
      border-radius: 5px;
      color: #8e0a0a;
      font-size: 14px;
      font-weight: 600;
      height: 30px;
      width: 80px;
      &:hover {
            background-color: #8e0a0a;
            border: solid 1px #8e0a0a;
            color: #f9dbdb;
            cursor: pointer;
      }
      &:focus {
            box-shadow: 1px 1px #ba4c4c;
            outline: #8e0a0a;
            border: solid 2px #8e0a0a;
      }
      @media (max-width: 568px) {
            width: 60px;
      }
`;

const SearchResults = styled.div`
      margin-top: 45px;
      padding: 7px; 
`;

const WikiContainer = styled.div`
      background-color: #f9dbdb;
      border: solid 2px goldenrod;
      border-radius: 10px;
      width: 500px;
      padding: 10px;
      @media (max-width: 568px) {
            width: 350px;
      }
`;

const Input = styled.input`
      border-radius: 4px;
      border: solid 1px goldenrod;
      margin-bottom: 10px;
      padding-left: 7px;
      min-width: 200px;
      height: 35px;
      width: 100%;
`;

export default Wiki;