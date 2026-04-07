import * as React from "react"; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

interface SwimmerCardProps{
  swimmer:any;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {timeZone: "UTC"})
};

export function SwimmerCard(props:SwimmerCardProps) {
    const {swimmer} = props;
    const swimmerName: string = swimmer.firstName + " " + swimmer.lastName;
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [swimmerRaceStats, setSwimmerRaceStats] = React.useState<any[]>([]);
  
    const fetchRaceStats = React.useCallback(async(swimmerName: string) => {
      const raceStats = await fetch(`/raceResults/name/${swimmerName}`)
      setSwimmerRaceStats(await raceStats.json());
    },[])

  return(
    <Card style={{ maxWidth: '28rem', minHeight: '17rem' }} className="mx-2 mb-2 mt-2" key={swimmer._id}>
    <Card.Body>
      <Card.Title className="display-6">{swimmerName}</Card.Title>
      <Card.Text>Team: {swimmer.team}</Card.Text>
      <Card.Text>Birthday: {formatDate(swimmer.birthday)}</Card.Text>
      <Card.Text>Bio: {swimmer.bio}</Card.Text>
      <Button className="btn-sm btn-success" onClick={() => {
        fetchRaceStats(swimmerName);
        handleShow();
      }} >View Race Stats</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{swimmerName}'s Race Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered className="mb-0" size="sm">
            {swimmerRaceStats?.length > 0? (
              <>
                <thead>
                  <tr>
                    <th>Meet Date:</th>
                    <th>Race Name:</th>
                    <th>Time:</th>
                    <th>DQ?</th>
                  </tr>
                </thead>
                <tbody>
                {swimmerRaceStats?.map((stat) => (
                  <tr key={stat._id}>
                    <td>{formatDate(stat.eventId.meetId.meetDate)}</td>
                    <td>{stat.eventId.raceId.gender} {stat.eventId.raceId.ageGroup} {stat.eventId.raceId.name}</td>
                    <td>{stat.time}</td>
                    <td>{stat.disqualified ? "Yes" : "No"}</td>
                  </tr>
                ))}
                </tbody>
              </>
            ) : (
              <tbody>
                <tr key="noRaceInfo">
                  <td>
                    <>No race information found for {swimmerName}.</>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary btn-sm" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card.Body>
  </Card>
  )
}
