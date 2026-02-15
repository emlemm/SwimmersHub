import * as React from "react";

export function CreateAccount() {
  
  const form = React.useRef<HTMLFormElement>(null);
  const submitCreateAccount = React.useCallback(async ()=> {
    if(!form.current?.checkValidity()) {
      form.current?.reportValidity()
      return
    }
    const payload = Object.fromEntries(new FormData(form.current ?? undefined).entries()) as any;
    payload.coachRole = payload.coachRole === "coach";
    const resp = await fetch("/user", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    
    if (resp.ok) {
      const responseBody = resp.json();
      window.location.hash = "#login"
    } else {
      window.location.hash = "#error"
    }
    }, [])

  return(
    <section id="createAccount">
      <div className="container-lg">
        <div className="text-center pt-5">
          <h2 className="display-5">Fill out the form to create your account.</h2>
          <p className="lead">Please enter your own information, not your childs. After creating an account, you can add your swimmer(s) to your account.</p>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <form ref={form}>
              <label htmlFor="firstName" className="form-label" aria-required >First name:</label>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input type="text" name="firstName" className="form-control" id="firstName" required />
              </div>

              <label htmlFor="lastName" className="form-label" aria-required >Last name:</label>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input type="text" name="lastName" className="form-control" id="lastName" required />
              </div>

              <label className="form-label" htmlFor="email" aria-required >Email address:</label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <input type="email" name="email" className="form-control" id="email" required />
              </div>
              
              <label htmlFor="password" className="form-label" aria-required >Password:</label>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input type="password" className="form-control" name="password" id="password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$" />
              </div>

              <div className="form-check mb-4">
                <h4 >Are you a coach?</h4>
                <div className="form-check">
                  <input className="form-check-input" value="coach" type="radio" name="coachRole" id="coachRole1" required />
                  <label className="form-check-label" htmlFor="coachRole1">
                    Yes, I am a coach
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" value="standard" type="radio" name="coachRole" id="coachRole2" required />
                  <label className="form-check-label" htmlFor="coachRole2" >
                    No, I am family or friend of a swimmer
                  </label>
                </div>
              </div>
              
              <div className="mb-4 text-center">
                <a onClick={submitCreateAccount} className="btn btn-dkBlue btn-lg">Click here to Create Account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};
