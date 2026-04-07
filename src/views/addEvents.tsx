import * as React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

export function AddEvents() {

  const swimmer1 = React.useRef<HTMLInputElement>(null);
  const swimmer2 = React.useRef<HTMLInputElement>(null);
  const swimmer3 = React.useRef<HTMLInputElement>(null);
  const swimmer4 = React.useRef<HTMLInputElement>(null);
  const swimmer5 = React.useRef<HTMLInputElement>(null);
  const swimmer6 = React.useRef<HTMLInputElement>(null);
  
  const [error, setError ] = React.useState<string>("");
  const [pageNum, setPageNum] = React.useState(-1);
  const [races, setRaces] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchRaces(){
      const allRaces = await fetch("/race");
      setRaces(await allRaces.json());
      setPageNum(0);
    };
    fetchRaces()
  },[]);

  const meetId = window.location.hash.slice(11);
  const data = React.useRef<any[]>([]);

  const saveData = React.useCallback(() => {
    data.current[pageNum] = {
      raceId: races[pageNum]._id, 
      swimmerNames: [
        swimmer1.current?.value, 
        swimmer2.current?.value,
        swimmer3.current?.value,
        swimmer4.current?.value,
        swimmer5.current?.value,
        swimmer6.current?.value
      ]
    };
  }, [pageNum]);

  React.useEffect(() => {
    swimmer1.current && (swimmer1.current.value = data.current[pageNum]?.swimmerNames?.[0]??"");
    swimmer2.current && (swimmer2.current.value = data.current[pageNum]?.swimmerNames?.[1]??"");
    swimmer3.current && (swimmer3.current.value = data.current[pageNum]?.swimmerNames?.[2]??"");
    swimmer4.current && (swimmer4.current.value = data.current[pageNum]?.swimmerNames?.[3]??"");
    swimmer5.current && (swimmer5.current.value = data.current[pageNum]?.swimmerNames?.[4]??"");
    swimmer6.current && (swimmer6.current.value = data.current[pageNum]?.swimmerNames?.[5]??"");
  },[pageNum]);

  const onPrevClick = React.useCallback(() => {
    saveData();
    setPageNum(pageNum -1);
  },[saveData, pageNum]);

  const onNextClick = React.useCallback(() =>{
    saveData();
    setPageNum(pageNum +1);
  },[saveData, pageNum]);
  
  const submitAllEvents = React.useCallback(async () => {
    saveData();
    const payload = {data: data.current, meetId};
    const resp = await fetch("/event", {
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
      <div className="container mx-auto">
        <h1 className="display-3 my-2 mx-3 mb-3">Add events to Meet</h1>
        {error ?
          <Alert variant="warning">
            {error}
          </Alert> : null}
        <h2 className="m-2">Race: {races[pageNum]?.gender} {races[pageNum]?.ageGroup} - {races[pageNum]?.name}</h2>
        <div className="m-1">
          <Table hover bordered>
            <thead>
              <tr>
                <th>Lane #</th>
                <th>Swimmer Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><Form.Control type="text" ref={swimmer1} /></td>
              </tr>
              <tr>
                <td>2</td>
                <td><Form.Control type="text" ref={swimmer2} /></td>
              </tr>
              <tr>
                <td>3</td>
                <td><Form.Control type="text" ref={swimmer3} /></td>
              </tr>
              <tr>
                <td>4</td>
                <td><Form.Control type="text" ref={swimmer4} /></td>
              </tr>
              <tr>
                <td>5</td>
                <td><Form.Control type="text" ref={swimmer5} /></td>
              </tr>
              <tr>
                <td>6</td>
                <td><Form.Control type="text" ref={swimmer6} /></td>
              </tr>
            </tbody>
          </Table>
        </div>
        
        <Button className="m-1" disabled={pageNum === 0} onClick={onPrevClick}>Previous</Button>
        <Button className="m-1" disabled={pageNum === races?.length-1} onClick={onNextClick}>Next</Button><br />
        <Button className="m-1 btn-lg btn btn-success" onClick={submitAllEvents} >Save All</Button>
      </div>
    </section>
  )
}