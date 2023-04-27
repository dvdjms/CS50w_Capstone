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
                  <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-12">
                              <label className="form-label" hidden htmlFor="search">Search</label>
                              <input name="search" type="text" className="form-control" id="search" placeholder="Search" required></input>
                        </div> 

                        <div className="col-12">
                              <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                  </form>

                  <div>
                       <UL>
                        {/* {wikiData.map((wikiData) => { 
                              return <Li key={wikiData.data.id}><NewsItem>{wikiData.data.title}</NewsItem></Li>
                        })}  */}
                       </UL>
                       <p>{wikiData}</p>
                       <img alt="" src={wikiImage} style={{width: "200px"}}></img>
                  </div>
            </WikiContainer>
            </>
      );

};

const WikiContainer = styled.div`
      background-color: #f9dbdb;
      border: solid 2px goldenrod;
      border-radius: 10px;
      width: 500px;
      padding: 7px;
      @media (max-width: 568px) {
            width: 350px;
      }
`;

const UL = styled.ul`
      list-style: none;    
`;



export default Wiki;