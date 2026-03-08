import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ProfileTab } from './profileTab';
import { SwimmersTab } from './swimmersTab';
import { MeetsTab } from './meetsTab';
import * as React from "react";

export function MyAccount() {

  return(
    <section id="myAccount">
      <div className="container my-2">
        <Tabs
          defaultActiveKey="profile"
          id="myAccountTabs"
          className="mb-3" >
          <Tab eventKey="profile" title="Profile">
            <ProfileTab />
          </Tab>
          <Tab eventKey="swimmers" title="Swimmers">
            <SwimmersTab />
          </Tab>
          <Tab eventKey="meets" title="Swim Meets">
            <MeetsTab />
          </Tab>
        </Tabs>

      </div>
    </section>
  
  ) 
};