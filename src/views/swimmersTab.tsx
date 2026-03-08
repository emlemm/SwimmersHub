import * as React from "react"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {timeZone: "UTC"})
}

export function SwimmersTab() {

  const [showSwimmerForm, setShowSwimmerForm] = React.useState(false);
  const [swimmerData, setSwimmerData] = React.useState<any[]>([]);
  const onAddSwimmer = React.useCallback(() => {
    setShowSwimmerForm(true)
  },[]);

  const [error, setError ] = React.useState<string>("");
  const [version, setVersion] = React.useState(0);
  const form = React.useRef<HTMLFormElement>(null);
  const submitNewSwimmer = React.useCallback(async ()=> {
    if(!form.current?.checkValidity()) {
      form.current?.reportValidity()
      return
    }
    const payload = Object.fromEntries(new FormData(form.current ?? undefined).entries()) as any;
    const resp = await fetch("/swimmer", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });

    if (resp.ok) {
      setVersion((v)=> v+1);
      setShowSwimmerForm(false);
    } else {
      setError((await resp.json()).message);
    }
  }, []);

  React.useEffect(() => {
    async function fetchSwimmerData(){
      const userInfo = await fetch("/swimmer");
      setSwimmerData(await userInfo.json());
    }
    fetchSwimmerData()
  },[version]);

  return(
    <div>
      <h2 className="display-3 mb-3">Your Swimmers:</h2>
      <div className="row my-5 align-items-center justify-content-center">
        {swimmerData?.map((swimmer)=> {
          return(<Card className="mb-3" key={swimmer._id}>
            <Card.Body>
              <Card.Title>{swimmer.firstName} {swimmer.lastName}</Card.Title>
              <Card.Text>Team: {swimmer.team}</Card.Text>
              <Card.Text>Birthday: {formatDate(swimmer.birthday)}</Card.Text>
              <Card.Text>Bio: {swimmer.bio}</Card.Text>
            </Card.Body>
          </Card>)
        })}
      </div>
      <button className="btn btn-primary text-ltBlue2" onClick={onAddSwimmer}>Add a Swimmer</button>
      {error ?
      <Alert variant="warning">
        {error}
      </Alert> : null}
      {showSwimmerForm ? <Form ref={form}><br></br>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First name:</Form.Label>
          <Form.Control type="text" placeholder="Enter first name..." name="firstName" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last name:</Form.Label>
          <Form.Control type="text" placeholder="Enter last name..." name="lastName" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" name="birthday" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="team">
          <Form.Label>Team name:</Form.Label>
          <Form.Control type="text" placeholder="Enter team name..." name="team" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Enter a short bio for your swimmer:</Form.Label>
          <Form.Control as="textarea" rows={3} name="bio" />
        </Form.Group>
        <div className="mb-4 text-center">
          <a onClick={submitNewSwimmer} className="btn btn-dkBlue btn-lg">Submit Swimmer</a>
        </div>
      </Form>:null}
    </div>
  )
}