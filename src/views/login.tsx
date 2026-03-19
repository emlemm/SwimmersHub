import * as React from "react";
import { Alert } from "react-bootstrap";

export function LoginPage() {
  const [error, setError ] = React.useState<string>("");

  const form = React.useRef<HTMLFormElement>(null);
  const submitLogin = React.useCallback(async ()=> {
    if(!form.current?.checkValidity()) {
      form.current?.reportValidity()
      return
    }
    const payload = Object.fromEntries(new FormData(form.current ?? undefined).entries()) as any;
    const resp = await fetch("/user/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });

    if (resp.ok) {
      window.location.hash = "#myAccount"
    } else {
      setError((await resp.json()).message)
    }
    }, [])

  return(
    <section id="login" >
      <div className="container-lg">
        <div className="text-center pt-5">
          <p className="lead">Don't yet have an account? <a href="#createAccount" className="btn btn-outline-dkBlue text-decoration-underline">Sign up here</a></p>
        </div>
        {error ?
        <Alert variant="warning">
          {error}
        </Alert> : null}
        <div className="row justify-content-center my-5">

          <div className="col-lg-6">
            <form ref={form}>
              <label className="form-label" htmlFor="email" >Email address:</label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <input type="email" name="email" className="form-control" id="email" required/>
              </div>
              
              <label htmlFor="password" className="form-label" aria-required >Password:</label>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input type="password" className="form-control" name="password" id="password" required />
              </div>

              <div className="mb-4 text-center">
                <a onClick={submitLogin} className="btn btn-dkBlue btn-lg">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};
