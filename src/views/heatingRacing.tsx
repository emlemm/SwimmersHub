import * as React from "react";
import { Button, Alert, Card, Form } from "react-bootstrap";
import { ProfileContext } from "./profileContext";

export function HeatingRacing() {

    const [error, setError ] = React.useState<string>("");
    const accountData = React.useContext(ProfileContext);
    const meetId = window.location.hash.slice(16);

    const [heatingData, setHeatingData] = React.useState<any>();
    const [racingData, setRacingData] = React.useState<any>();
    const [showHeatingForm, setShowHeatingForm] = React.useState(false);
    const [showRacingForm, setShowRacingForm] = React.useState(false);
    const onUpdateHeating = React.useCallback(() => {
      setShowHeatingForm(true)
    },[]);
    const onUpdateRacing = React.useCallback(() => {
      setShowRacingForm(true)
    },[]);
    
    const [version, setVersion] = React.useState(0);
    const heatingForm = React.useRef<HTMLFormElement>(null);
    const racingForm = React.useRef<HTMLFormElement>(null);

    const submitHeating = React.useCallback(async ()=> {
      const payload = Object.fromEntries(new FormData(heatingForm.current ?? undefined).entries()) as any;
      const resp = await fetch("/heating", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        setVersion((v)=> v+1);
        setShowHeatingForm(false);
      } else {
        setError((await resp.json()).message);
      }
    },[]);

    const submitRacing = React.useCallback(async ()=> {
      const payload = Object.fromEntries(new FormData(racingForm.current ?? undefined).entries()) as any;
      const resp = await fetch("/racing", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        setVersion((v)=> v+1);
        setShowRacingForm(false);
      } else {
        setError((await resp.json()).message);
      }
    },[]);
    
    React.useEffect(() => {
      async function fetchHeatingData(){
        const currentHeating = await fetch(`/heating/${meetId}`);
        setHeatingData(await currentHeating.json());
      }
      fetchHeatingData()
    },[version]);

    React.useEffect(() => {
      async function fetchRacingData(){
        const currentRacing = await fetch(`/racing/${meetId}`);
        setRacingData(await currentRacing.json());
      }
      fetchRacingData()
    },[version]);

  return(
    <section id="heatingRacing">
      <h1 className="display-1">Heating and Racing Info:</h1>
        {error ?
          <Alert variant="warning">
            {error}
          </Alert> : null}
          <Card className="mb-3 mx-2">
            <Card.Header>Currently Heating:</Card.Header>
            <Card.Body>
              {heatingData?.heatingNumber ? (
                <Card.Title className="mb-3">Event Number: {heatingData?.heatingNumber}</Card.Title>
              ) : (
                <Card.Title className="mb-3">Not currently heating</Card.Title>
              )}
              {accountData?.coachRole ? (
                <>
                  <Button className="m-2" onClick={onUpdateHeating}>Update Currently Heating</Button>
                  {showHeatingForm ? <Form ref={heatingForm}>
                    <Form.Group className="mb-3" controlId="heatingNumber">
                      <Form.Label>Heating:</Form.Label>
                      <Form.Control type="number" name="heatingNumber" required />
                    </Form.Group>
                    <Form.Group className="d-none" controlId="meetId">
                      <Form.Control type="" readOnly value={meetId} name="meetId"></Form.Control>
                    </Form.Group>
                    <Button className="mb-2 text-center btn-success" onClick={submitHeating} >Submit Heating</Button>
                  </Form>:null}
                </>
              ): ( 
                <>
                </>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3 mx-2">
            <Card.Header>Currently Racing:</Card.Header>
            <Card.Body>
              {racingData?.racingNumber ? (
                <Card.Title className="mb-3">Event Number: {racingData?.racingNumber}</Card.Title>
              ) : (
                <Card.Title className="mb-3">Not currently racing</Card.Title>
              )}
              {accountData?.coachRole ? (
                <>
                  <Button className="m-2" onClick={onUpdateRacing}>Update Currently Racing</Button>
                  {showRacingForm ? <Form ref={racingForm}>
                    <Form.Group className="mb-3" controlId="racingNumber">
                      <Form.Label>Racing:</Form.Label>
                      <Form.Control type="number" name="racingNumber" required />
                    </Form.Group>
                    <Form.Group className="d-none" controlId="meetId">
                      <Form.Control type="" readOnly value={meetId} name="meetId"></Form.Control>
                    </Form.Group>
                    <Button className="mb-2 text-center btn-success" onClick={submitRacing} >Submit Racing</Button>
                  </Form>:null}
                </>
              ): ( 
                <>
                </>
              )}
            </Card.Body>
          </Card>
    </section>
  )
};