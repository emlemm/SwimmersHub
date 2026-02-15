
export function HomePage() {
  return(
    <div>
      <section id="intro">
        <div className="container-lg bg-ltBlue2">
          <div className="row justify-content-center align-items-center">
          
            <div className="col-md-6 text-center text-md-start">
              <h2 className="display-2 mg mb-4">Welcome To Swimmers Hub</h2>
              <p className="display-6">Your solution for swim team management</p>
            </div>
            <div className="col-md-5 text-center d-none d-md-block">
              <img src="/assets/pictures/diving-V.jpg" className="img-fluid rounded mt-3" alt="Boy diving into pool"></img>
            </div>
          </div>
          <p className="lead my-4 pb-4">Get ready to dive into the deep end with confidence when you start using Swimmers Hub to manage your swim meets and team info! Swimmers Hub makes planning and executing your meets a breeze - with intuitive tools and easy to use features that do exactly what you need, all from your phone. This is the management tool you've been looking for!</p>
        </div>
      </section>

      <section id="contact">
        <div className="container-lg">
          <div className="text-center pt-5">
            <h2>Get in Touch</h2>
            <p className="lead">Questions to ask? Fill out the form to contact us directly.</p>
          </div>
          <div className="row justify-content-center my-5">

            <div className="col-lg-6">
              <form>
                <label className="form-label" htmlFor="email">Email address:</label>
                <div className="mb-4 input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input type="email" className="form-control" id="email" placeholder="e.g.mario@example.com" />
                </div>
                
                <label htmlFor="name" className="form-label">Name:</label>
                <div className="input-group mb-4">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input type="text" className="form-control" id="name" placeholder="e.g. Michael" />
                </div>
                <div className="form-floating mb-4 mt-4">
                  <textarea id="query" className="form-control" ></textarea>
                  <label htmlFor="query">Your query...</label>
                </div>

                <div className="mb-4 text-center">
                  <button type="submit" className="btn btn-dkBlue btn-lg">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
