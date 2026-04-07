import * as React from "react";
import { Card } from "react-bootstrap";

export function MyAccount() {
  const [accountData, setAccountData] = React.useState<any>(null);
  React.useEffect(() => {
    async function fetchAccountData(){
      const userInfo = await fetch("/user");
      setAccountData(await userInfo.json());
    }
    fetchAccountData()
  },[]);
  
  let isCoach;
  if (accountData?.coachRole == true) {
    isCoach = "Yes"
  } else {
    isCoach = "No"
  }

  return (
  <div className="container mx-auto">
    <h2 className="display-3 pt-2 my-2 mx-3 mb-3">Account information:</h2>
    <div className="row my-2 align-items-center justify-content-center p-3">
      <Card style={{ maxWidth: '31rem', minHeight: '12rem' }} className="mx-2 mb-2 p-3" >
        <p>First Name: <span className="lead">{accountData?.firstName}</span></p>
        <p>Last Name: <span className="lead">{accountData?.lastName}</span></p>
        <p>Email: <span className="lead">{accountData?.email}</span></p>
        <p>Is this a coach account: <span className="lead">{isCoach}</span></p>
      </Card>
      
    </div>
  </div>);
}