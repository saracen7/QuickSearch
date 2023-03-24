import React from 'react';
import { useSelector } from 'react-redux';
import { selectSearchResults, selectSearchLoading, selectSearchError } from '../features/search/searchSlice';
import styled from "styled-components";

interface ResultsOverlayProps {}

const OverlayContainer = styled.div`
  position: absolute;
  top: 70px;
  right: 25px;
  max-width: 500px;
  
  
  z-index: 10;
  height: 50%;
  


 

`;


const AllBooks = styled.div`
    height: 100%;
    overflow: scroll;
    border: 1px solid #ccc;
    background-color: #e3e3e3;

     &:before {
    content:"";
    position: absolute;
    height: 0px;
    width: 0px;
    top: -29px;
    left: 80%; /* 1px buffer for zooming problems while rendering*/
    border-width: 15px;
    border-color: transparent #e3e3e3 transparent transparent;
    border-style: solid;
    transform: rotate(90deg) 
}
}
`;




const ListofBooks = styled.ul`
    padding-left: 10px;
`

const ResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #fff;
  display: grid;
  grid-template-columns: 10% 60% 30%;
  grid-template-rows: auto auto;

  &:last-child {
    border-bottom: none;
  }
`;

const Image = styled.img`
  grid-row: 1/3;
  grid-column: 1;
  max-width: 90%;
`;

const ResultItemDiv = styled.div`
 grid-column: 2;
 color: #333
`;

const AmzButtonDiv = styled.div`
grid-column: 3;
grid-row:2
border-radius: 8px;
box-shadow: 0 2px 5px 0 rgba(213,217,217,.5);
align-items: center;
display: flex;
justify-content: center;
background: #FFD814;
border-color: #FCD200;
text-align: center;
font-size: 14px;
padding: 10px; 
height: 10px;


& a{
    color: rgb(15, 17, 17);
    text-decoration: none
}
`;

const ResultsOverlay: React.FC<ResultsOverlayProps> = () => {
  const results = useSelector(selectSearchResults);
  const isLoading = useSelector(selectSearchLoading);
  const error = useSelector(selectSearchError);
  const resultsLength = results.length > 0;

  return (
     <OverlayContainer data-testid="results-overlay">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      {results && resultsLength && (
        <AllBooks>
        <ListofBooks>
          {results.map((book: any) => (
            <ResultItem  key={book.id}>
                {book.coverid && 
               <Image src={"https://covers.openlibrary.org/b/id/"+book.coverid+"-S.jpg"} alt={"Cover of " + book.title} />
                }
                 {!book.coverid && 
               "No Image"
                }
              <ResultItemDiv>{book.title}</ResultItemDiv>
              <ResultItemDiv>{book.author_name}</ResultItemDiv>
             
                {book.amazonId && 
                
                 <AmzButtonDiv>
                <a href={"http://www.amazon.co.uk/dp/"+book.amazonId[0]} target="blank">Buy on Amazon</a>
               </AmzButtonDiv>
                    }
                
            </ResultItem>
          ))}
        </ListofBooks>
        </AllBooks>
      )}
      
      
    </OverlayContainer>
  );
  
};

export default ResultsOverlay;