import * as React from "react"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { ProfileContext } from "./profileContext";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {timeZone: "UTC"})
}

function formatDateForValue(date:string) {
  const d = new Date(date);
  return d.toISOString().substring(0, 10);
}

export function MeetsTab() {

  const [showSwimMeetForm, setShowSwimMeetForm] = React.useState(false);
  const [swimMeetData, setSwimMeetData] = React.useState<any[]>([]);
  const onCreateNewMeet = React.useCallback(() => {
    setShowSwimMeetForm(true)
  },[]);
  
  const [showEditMeetForm, setShowEditMeetForm] = React.useState ("");
  const onEditMeetForm = React.useCallback((meetId: string) => {
    setShowEditMeetForm(meetId)
  },[]);
  
  const [error, setError ] = React.useState<string>("");
  const [version, setVersion] = React.useState(0);
  const form = React.useRef<HTMLFormElement>(null);
  const formEdit = React.useRef<HTMLFormElement>(null);
  const accountData = React.useContext(ProfileContext);

  
  const submitNewSwimMeet = React.useCallback(async ()=> {
    if(!form.current?.checkValidity()) {
      form.current?.reportValidity()
      return
    }
    const payload = Object.fromEntries(new FormData(form.current ?? undefined).entries()) as any;
    const resp = await fetch("/meet", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });

    if (resp.ok) {
      setVersion((v)=> v+1);
      setShowSwimMeetForm(false);
    } else {
      setError((await resp.json()).message);
    }
  }, []);

  const submitEditMeet = React.useCallback(async ()=> {
    if(!formEdit.current?.checkValidity()) {
      formEdit.current?.reportValidity()
      return
    }
    const payload = Object.fromEntries(new FormData(form.current ?? undefined).entries()) as any;
    const resp = await fetch("/meet/edit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });

    if (resp.ok) {
      setVersion((v)=> v+1);
      setShowSwimMeetForm(false);
    } else {
      setError((await resp.json()).message);
    }
  }, []);

  React.useEffect(() => {
    async function fetchSwimMeetData(){
      const userInfo = await fetch("/meet");
      setSwimMeetData(await userInfo.json());
      }
    fetchSwimMeetData()
  },[version]);

  return(
    <div>
      <h2 className="display-3 mb-3">Swim Meets:</h2>
      <div className="row my-5 align-items-center justify-content-center">
        {swimMeetData?.map((meet)=> {
          return(<Card className="mb-3" key={meet._id}>
            <Card.Header>Date: {formatDate(meet.meetDate)}</Card.Header>
            <Card.Body>
              <Card.Title className="mb-3">Host Team: {meet.hostTeam}</Card.Title>
              <Card.Text>Travelling Team: {meet.travellingTeam}</Card.Text>
              <Card.Text>Address: {meet.address}</Card.Text>
              {accountData?.coachRole ? (
                <>
                  <Button id="editMeetBtn" className="m-2" onClick={() => onEditMeetForm(meet._id)}>Edit Meet</Button>
                  <Button className="m-2" href={`#addEvents/${meet._id}`} >Add Events</Button>
                  <Button className="m-2" >Input Results</Button>
                </>
              ): ( 
                <>
                  <Button className="m-2">View Events</Button>
                  <Button className="m-2">View Race Results</Button>
                </>
              )}
              {showEditMeetForm === meet._id? <Form ref={formEdit}><br></br>
                <Form.Group className="mb-3" controlId="meetDate">
                  <Form.Label>Date:</Form.Label>
                  <Form.Control type="date" name="meetDate" value={formatDateForValue(meet.meetDate)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="hostTeam">
                  <Form.Label>Hosting Team:</Form.Label>
                  <Form.Control type="text" value={meet.hostTeam} name="hostTeam" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control type="text" value={meet.address} name="address" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="travellingTeam">
                  <Form.Label>Travelling Team:</Form.Label>
                  <Form.Control type="text" value={meet.travellingTeam} name="travellingTeam" required />
                </Form.Group>
                <Form.Group className="d-none" controlId="meetId">
                  <Form.Control type="" value={meet._id} name="meetId"></Form.Control>
                </Form.Group>
                <div className="mb-4 text-center">
                  <a onClick={submitEditMeet} className="btn btn-dkBlue btn-lg">Submit Edited Swim Meet</a>
                </div>
              </Form>:null}
            </Card.Body>
          </Card>)
        })}
      </div>
      <div>
        {accountData?.coachRole && 
          <button className="btn btn-primary" onClick={onCreateNewMeet}>Create New Swim Meet</button>
        }
      </div>      
        
      {error ?
      <Alert variant="warning">
        {error}
      </Alert> : null}
        {showSwimMeetForm ? <Form ref={form}><br></br>
          <Form.Group className="mb-3" controlId="meetDate">
            <Form.Label>Date:</Form.Label>
            <Form.Control type="date" name="meetDate" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="hostTeam">
            <Form.Label>Hosting Team:</Form.Label>
            <Form.Control type="text" placeholder="Enter name of hosting swim team..." name="hostTeam" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" placeholder="Enter address..." name="address" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="travellingTeam">
            <Form.Label>Travelling Team:</Form.Label>
            <Form.Control type="text" placeholder="Enter name of travelling swim team..." name="travellingTeam" required />
          </Form.Group>
          <div className="mb-4 text-center">
            <a onClick={submitNewSwimMeet} className="btn btn-dkBlue btn-lg">Create Swim Meet</a>
          </div>
        </Form>:null}
    </div>
  )
}