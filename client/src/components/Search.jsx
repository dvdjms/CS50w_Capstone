import styled from 'styled-components';


const Search = (props) => {

      return (
            <>
            <SearchContainer>
                  <Input 
                        onChange={event => props.handleSearchValue(event.target.value)}
                        onKeyDown={event => props.handleKeyDown(event)}
                        placeholder="Search City"
                        ref={props.searchBox}
                        type="text"
                  />

                  <ListContainer>
                        <UL>
                        {props.searchData.map((searchData, index) => { 
                              return <Li onClick={event => props.handleClick(searchData.cityid)} key={index}>
                                          <SpanCity>{searchData.city_ascii}</SpanCity>&nbsp;&nbsp;
                                          <SpanCity2>{searchData.admin_name.toUpperCase()}</SpanCity2>,&nbsp;  
                                          <SpanCity3>{searchData.country.toUpperCase()}</SpanCity3>
                                    </Li>
                        })} 
                        </UL>
                  </ListContainer>
            </SearchContainer>
            </>
      );
};


const SpanCity = styled.span`
      font-family: 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;
      font-size: 20px;
      font-weight: 600;
`;

const SpanCity2 = styled.span`
      font-family: 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;
      font-size: 14px;
      font-style: italic;
      color: #484848;
`;

const SpanCity3 = styled.span`
      font-family: 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;
      font-size: 14px;
      color: #484848;
`;

const Input = styled.input`
      border-radius: 4px;
      border: solid 1px goldenrod;
      margin-bottom: 10px;
      padding-left: 7px;
      min-width: 200px;
      height: 35px;
      width: 75%;
`;

const SearchContainer = styled.div`
      background-color: #e9cefc;
      border: solid 2px goldenrod;
      border-radius: 10px;
      height: 250px;
      width: 500px;
      padding: 10px;
      @media (max-width: 568px) {
            width: 350px;
      }
`;

const ListContainer = styled.div`
      height: 170px;
      overflow-y: scroll; 
`;

const UL = styled.ul`
      list-style: none;
      padding-left: 7px;
`;

const Li = styled.li`
    &:hover{
      cursor: pointer;
    }
`;


export default Search;
