import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export function MyAccount() {
  return(
    <section id="myAccount">
      <div className="container my-2">
        <Tabs
          defaultActiveKey="profile"
          id="myAccountTabs"
          className="mb-3" >
          <Tab eventKey="profile" title="Profile">
            <h2>Profile</h2>
                <p>FirstName</p>
                <p>LastName</p>
                <p>Email</p>
                <button>Edit Profile</button>
          </Tab>
          <Tab eventKey="swimmers" title="Swimmers">
            <h2>Swimmers</h2>
            <button>Add a Swimmer</button>
          </Tab>
          <Tab eventKey="events" title="Events">
            <h2>Events</h2>
            <p>Future events here</p>
          </Tab>
        </Tabs>

      </div>
    </section>
  
  ) 
};