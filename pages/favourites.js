import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Card } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ArtworkCard from '../components/ArtworkCard';



export default function Favourites(props) {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);


    console.log(favouritesList);
    if (!favouritesList) return null;

    if (favouritesList) {

        if (favouritesList.length > 0) {
            return (
                <>
                    <Row className="gy-4 row">
                        {favouritesList.map(arts => (
                            <Col lg={3}>
                                <ArtworkCard key={arts} objectID={arts} />
                            </Col>
                        ))}
                    </Row>

                </>
            )
        }
        else {
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

    } else {

        return null;
    }
}