import * as React from "react";

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
  <div className="">
    <h2 className="display-3 my-2 mx-3 mb-3">Account information:</h2>
    <div className="container-md">
      <p>First Name: <span className="lead">{accountData?.firstName}</span></p>
      <p>Last Name: <span className="lead">{accountData?.lastName}</span></p>
      <p>Email: <span className="lead">{accountData?.email}</span></p>
      <p>Is this a coach account: <span className="lead">{isCoach}</span></p>
    </div>
  </div>);
}