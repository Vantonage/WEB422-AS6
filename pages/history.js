import { useRouter } from 'next/router'
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { Button, Card, ListGroup } from 'react-bootstrap';
import styles from '../styles/History.module.css';

import { removeFromHistory } from '../lib/userData'

export default function History() {


    const router = useRouter();


    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index) {
        router.push(`/artwork?title=${searchHistory[index]}`)
    }


    async function removeHistoryClicked(e, index) {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }

    if(!searchHistory) return null;

    if (parsedHistory.length > 0) {
        return (
            <>
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item className={styles.historyListItem} key={index} onClick={() => historyClicked(historyItem, index)}>
                            {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                            
                            
                        </ListGroup.Item>
                    ))}
                    
                </ListGroup>
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



}