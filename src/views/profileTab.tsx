import * as React from "react";

export function ProfileTab() {
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
  <div>
    <h2>Your account information</h2>
    <p>First Name: {accountData?.firstName}</p>
    <p>Last Name: {accountData?.lastName}</p>
    <p>Email: {accountData?.email}</p>
    <p>Is this a coach account: {isCoach}</p>
  </div>);
}