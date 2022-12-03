import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import {Card} from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { Pagination } from 'react-bootstrap'
import ArtworkCard from '../../components/ArtworkCard';
import validObjectIDList from '../../public/data/validObjectIDList.json'


const PER_PAGE = 12;

export default function ArtworkIndex(){

    const [page, setPage] = useState(1);
    const [artworkList, setArtworkList] = useState();

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];


    // THE REASON ROCK HAND WAS SEARCH EVERYTHING WAS BECAUSE I HAD 
    // search?finalQuery=${finalQuery
    // instead of search?${finalQuery
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
   

    useEffect(() => {
        if (data != null || data != undefined) {
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

            var results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
               }
            setArtworkList(results);
            setPage(1);
        }
       }, [data]);

    function previous(){
        if (page > 1){
            setPage(prev => prev - 1);
        }
    }
    
    function next(){
        if (page < artworkList.length){
            setPage(prev => prev + 1);
        }
    }


    // THE CODE FROM BELOW WAS GIVEN BY THE PROFESSOR DURING THE LAB SESSION



    if(error){
        return <Error statusCode={404} />
    }
    
    if(artworkList){

        if (artworkList.length > 0){
            return (
                <>  
                    <Row className="gy-4 row">
                        {artworkList[page - 1].map(art => (
                            <Col lg={3}>
                                <ArtworkCard key={art} objectID={art} />
                            </Col>
                        ))}
                    </Row>
                    
                    <Pagination>
                        <Pagination.Prev onClick={previous}/>
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={next}/>
                    </Pagination>
                </>
            )
        }
        else{
            return (
                <>
                    <Card>
                        <div className="card-body">
                            <h4>Nothing Here</h4>Try searching for something else. 
                        </div>
                    </Card>
                </>
            )
        }  
        
    }else{
        return null;
    }
  
   
       
       
    

}