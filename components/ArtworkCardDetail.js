import useSWR from 'swr'
import Error from 'next/error'
import {Button, Card} from 'react-bootstrap'


import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { useState, useEffect } from 'react'

import { addToFavourites, removeFromFavourites } from '../lib/userData'

export default function ArtworkCardDetail(props){
    
    //const { product } = props;

    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    //props.objectID was the problem. I did props which did not keep the state when going back.
    const [showAdded, setAdded] = useState(false);

    useEffect(()=>{
        setAdded(favouritesList?.includes(props.objectID))
       }, [favouritesList])


    async function favouritesClicked(){

        console.log(showAdded);
        
        if (showAdded){
            setFavouritesList(await removeFromFavourites(props.objectID));
            setAdded(false);
            console.log("Removed");
        }
        else{
            console.log("adding favourite: " + props.objectID);
            setFavouritesList(await addToFavourites(props.objectID));
            setAdded(true);
            console.log("Added");
            console.log(favouritesList);
        }
        console.log("Clicked")
        
       
    }

    if (data == null || data == undefined){

        return null;
    }
    if (data){
       if (data.length <= 0) {
        return (<Error statusCode={404} />);
       }
       else{
        return (
            <>
            <Card>
                
                {data?.primaryImage && <Card.Img variant="top" src={data?.primaryImage} />}
                <Card.Body>
                    <Card.Title>{data?.title ?? "N/A"}</Card.Title>
                    <Card.Text>
                        <strong>Date:</strong> {data?.objectDate ?? "N/A"}
                        <br />
                        <strong>Classification:</strong> {data?.classification ?? "N/A"}
                        <br />
                        <strong>Medium:</strong> {data?.medium ?? "N/A"}
                        <br />
                        <br />
                        <strong>Artist:</strong> {data?.artistDisplayName ? data?.artistDisplayName : "N/A"}
                        &nbsp;
                        ({data.artistDisplayName && <a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>})
                        
                        <br />
                        <strong>Credit Line:</strong> {data?.creditLine}
                        <br />
                        <strong>Dimensions:</strong> {data?.dimensions}
                        <br />
                        <br />
                        <Button variant="primary" onClick={e=> favouritesClicked(props.objectID)}>{showAdded ? "+ Favourite (added)" : "+ Favourite"} </Button>
                    </Card.Text>
                    
                </Card.Body>
       
            </Card>
            </>
        )
            
       } 
    }
        
}