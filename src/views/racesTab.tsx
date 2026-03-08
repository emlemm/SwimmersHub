import * as React from "react"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { ProfileContext } from "./profileContext";

export function RacesTab() {
  const [error, setError ] = React.useState<string>("");
    const [version, setVersion] = React.useState(0);
    const form = React.useRef<HTMLFormElement>(null);
  
    const submitNewRace = React.useCallback(async ()=> {
      if(!form.current?.checkValidity()) {
        form.current?.reportValidity()
        return
      }
      const payload = Object.fromEntries(new FormData(form.current ?? undefined).entries()) as any;
      const resp = await fetch("/race", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
  
      if (resp.ok) {
        setVersion((v)=> v+1);
      } else {
        setError((await resp.json()).message);
      }
    }, []);

  return(
    <div>
      <Form ref={form}><br></br>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter race name..." name="name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ageGroup">
          <Form.Label>Age Group:</Form.Label>
          <Form.Control type="text" placeholder="Enter age group..." name="ageGroup" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender:</Form.Label>
          <Form.Control type="text" placeholder="Enter gender..." name="gender" required />
        </Form.Group>
        <div className="mb-4 text-center">
          <a onClick={submitNewRace} className="btn btn-dkBlue btn-lg">Create New Race</a>
        </div>
      </Form>
    </div>
  )
}