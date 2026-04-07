import * as React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

export function InputRaceTimes() {

  const swimmer1 = React.useRef<HTMLInputElement>(null);
  const swimmer2 = React.useRef<HTMLInputElement>(null);
  const swimmer3 = React.useRef<HTMLInputElement>(null);
  const swimmer4 = React.useRef<HTMLInputElement>(null);
  const swimmer5 = React.useRef<HTMLInputElement>(null);
  const swimmer6 = React.useRef<HTMLInputElement>(null);

  const dq1 = React.useRef<HTMLInputElement>(null);
  const dq2 = React.useRef<HTMLInputElement>(null);
  const dq3 = React.useRef<HTMLInputElement>(null);
  const dq4 = React.useRef<HTMLInputElement>(null);
  const dq5 = React.useRef<HTMLInputElement>(null);
  const dq6 = React.useRef<HTMLInputElement>(null);

  const [error, setError ] = React.useState<string>("");
  const [pageNum, setPageNum] = React.useState(-1);
  const [events, setEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
      async function fetchEvents(){
        const allEvents = await fetch(`/event/${meetId}`);
        setEvents(await allEvents.json());
        setPageNum(0);
      };
      fetchEvents()
    },[]);

  const meetId = window.location.hash.slice(16);
  const data = React.useRef<any[]>([]);

  const saveData = React.useCallback(() => {
    data.current[pageNum] = {
      eventId: events[pageNum]._id, 
      swimmerResults: [
        {swimmerName: events[pageNum].swimmerNames[0], time: swimmer1.current?.value, disqualified: dq1.current?.checked},
        {swimmerName: events[pageNum].swimmerNames[1], time: swimmer2.current?.value, disqualified: dq2.current?.checked},
        {swimmerName: events[pageNum].swimmerNames[2], time: swimmer3.current?.value, disqualified: dq3.current?.checked},
        {swimmerName: events[pageNum].swimmerNames[3], time: swimmer4.current?.value, disqualified: dq4.current?.checked},
        {swimmerName: events[pageNum].swimmerNames[4], time: swimmer5.current?.value, disqualified: dq5.current?.checked},
        {swimmerName: events[pageNum].swimmerNames[5], time: swimmer6.current?.value, disqualified: dq6.current?.checked}
      ]
    };
  }, [pageNum]);

  React.useEffect(() => {
    swimmer1.current && (swimmer1.current.value = data.current[pageNum]?.swimmerResults?.[0].time??"");
    swimmer2.current && (swimmer2.current.value = data.current[pageNum]?.swimmerResults?.[1].time??"");
    swimmer3.current && (swimmer3.current.value = data.current[pageNum]?.swimmerResults?.[2].time??"");
    swimmer4.current && (swimmer4.current.value = data.current[pageNum]?.swimmerResults?.[3].time??"");
    swimmer5.current && (swimmer5.current.value = data.current[pageNum]?.swimmerResults?.[4].time??"");
    swimmer6.current && (swimmer6.current.value = data.current[pageNum]?.swimmerResults?.[5].time??"");
    dq1.current && (dq1.current.checked = data.current[pageNum]?.swimmerResults?.[0].disqualified??false);
    dq2.current && (dq2.current.checked = data.current[pageNum]?.swimmerResults?.[1].disqualified??false);
    dq3.current && (dq3.current.checked = data.current[pageNum]?.swimmerResults?.[2].disqualified??false);
    dq4.current && (dq4.current.checked = data.current[pageNum]?.swimmerResults?.[3].disqualified??false);
    dq5.current && (dq5.current.checked = data.current[pageNum]?.swimmerResults?.[4].disqualified??false);
    dq6.current && (dq6.current.checked = data.current[pageNum]?.swimmerResults?.[5].disqualified??false)
  },[pageNum]);

  const onPrevClick = React.useCallback(() => {
    saveData();
    setPageNum(pageNum -1);
  },[saveData, pageNum]);

  const onNextClick = React.useCallback(() =>{
    saveData();
    setPageNum(pageNum +1);
  },[saveData, pageNum]);
  
  const submitAllRaceResults = React.useCallback(async () => {
    saveData();
    const payload = data.current;
    const resp = await fetch("/raceResults", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    if (resp.ok) {
      window.location.hash = "#meets"
    } else {
      setError((await resp.json()).message);
    }
  }, [saveData]);

  return(
    <section id="addEvents">
      <h1 className="display-3 pt-2 my-2 mx-3 mb-3">Input Race Results</h1>
      {error ?
        <Alert variant="warning">
          {error}
        </Alert> : null}
      <h2 className="m-2">Race: {events[pageNum]?.raceId.gender} {events[pageNum]?.raceId.ageGroup} - {events[pageNum]?.raceId.name}</h2>
      <div className="m-1">
        <Table hover bordered>
          <thead>
            <tr>
              <th>Lane #</th>
              <th>Swimmer Name</th>
              <th>Race Time</th>
              <th>DQ?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{events[pageNum]?.swimmerNames[0]}</td>
              <td><Form.Control type="text" ref={swimmer1} /></td>
              <td><Form.Check type="checkbox" ref={dq1} /></td>
            </tr>
            <tr>
              <td>2</td>
              <td>{events[pageNum]?.swimmerNames[1]}</td>
              <td><Form.Control type="text" ref={swimmer2} /></td>
              <td><Form.Check type="checkbox" ref={dq2} /></td>
            </tr>
            <tr>
              <td>3</td>
              <td>{events[pageNum]?.swimmerNames[2]}</td>
              <td><Form.Control type="text" ref={swimmer3} /></td>
              <td><Form.Check type="checkbox" ref={dq3} /></td>
            </tr>
            <tr>
              <td>4</td>
              <td>{events[pageNum]?.swimmerNames[3]}</td>
              <td><Form.Control type="text" ref={swimmer4} /></td>
              <td><Form.Check type="checkbox" ref={dq4} /></td>
            </tr>
            <tr>
              <td>5</td>
              <td>{events[pageNum]?.swimmerNames[4]}</td>
              <td><Form.Control type="text" ref={swimmer5} /></td>
              <td><Form.Check type="checkbox" ref={dq5} /></td>
            </tr>
            <tr>
              <td>6</td>
              <td>{events[pageNum]?.swimmerNames[5]}</td>
              <td><Form.Control type="text" ref={swimmer6} /></td>
              <td><Form.Check type="checkbox" ref={dq6} /></td>
            </tr>
          </tbody>
        </Table>
      </div>
      
      <Button className="m-1" disabled={pageNum === 0} onClick={onPrevClick}>Previous</Button>
      <Button className="m-1" disabled={pageNum === events?.length-1} onClick={onNextClick}>Next</Button><br />
      <Button className="m-1 btn-lg btn btn-success" onClick={submitAllRaceResults} >Save All</Button>
    </section>
  )
}