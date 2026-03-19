import * as React from "react";
import Button from 'react-bootstrap/Button';
import { Alert, Card } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {timeZone: "UTC"})
};

export function MeetDetails() {

  const [currentMeet, setCurrentMeet] = React.useState<any>(null);
  const [results, setResults] = React.useState<any[]>([]);
  const [error, setError ] = React.useState<string>("");
  const meetId = window.location.hash.slice(13);
  const data = React.useRef<any[]>([]);

  React.useEffect(() => {
    async function fetchCurrentMeet(){
      const meet = await fetch(`/meet/${meetId}`)
      setCurrentMeet(await meet.json());
    };
    fetchCurrentMeet()
  },[]);

  React.useEffect(() => {
    async function fetchResults(){
      const allResults = await fetch(`/raceResults/${meetId}`);
      setResults(await allResults.json());
    };
    fetchResults()
  },[]);

  return (
    <section id="meetDetails" className="flex-grow-1">
      <h1 className="display-1">Meet Details:</h1>
      {error ?
        <Alert variant="warning">
          {error}
        </Alert> : null}
      <h2 className="m-2">{currentMeet?.hostTeam} v. {currentMeet?.travellingTeam}</h2>
      <h2 className="m-2">Date: {formatDate(currentMeet?.meetDate)}</h2>
      <Accordion className="row m-2 align-items-center justify-content-center" >
        {Object.entries(results)?.map(([eventId, raceResult])=> {
          return(
            <Table hover bordered className="mb-0">
              <Accordion.Item eventKey={eventId}>
                <Accordion.Header>Race #{raceResult.event.eventNumber}: {raceResult.event.raceId.gender} {raceResult.event.raceId.ageGroup} {raceResult.event.raceId.name}</Accordion.Header>
                <Accordion.Body className="table" >
                  {raceResult.raceResults?.[0]._id? (
                    <>
                      <thead>
                        <tr>
                          <th>Place</th>
                          <th>Swimmer Name:</th>
                          <th>Race time:</th>
                        </tr>
                      </thead>
                      <tbody>
                        {raceResult.raceResults?.map((obj:any, i:number) =>(
                          obj.swimmerName.length>0 && <tr key={i}>
                            <td>{obj.disqualified ? "DQ" : i+1}</td>
                            <td>{obj.swimmerName}</td>
                            <td>{obj.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                    ) : (
                      <>
                        <thead>
                          <tr>
                            <th>Lane #:</th>
                            <th>Swimmer Name:</th>
                          </tr>
                        </thead>
                        <tbody>
                          {raceResult.event.swimmerNames?.map((name:string, i:number) =>(
                            name.length>0 && <tr key={i}>
                              <td>{i+1}</td>
                              <td>{name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )
                  }                  
                </Accordion.Body>
              </Accordion.Item>
            </Table>
          )
        })}
      </Accordion>
      
    </section>
  )
};