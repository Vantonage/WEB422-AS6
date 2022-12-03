import { useRouter } from 'next/router'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArtworkCardDetail from '../../components/ArtworkCardDetail'

export default function Art(){
    const router = useRouter();

    const { objectID } = router.query;
    return (
        <>
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
        </>
    )

}