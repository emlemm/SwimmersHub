
export function Footer() {
  const d = new Date()
  let year = d.getFullYear();

  return(
    <section id="footer" className="bg-dkBlue">
      <footer className="m-1">
        <p className="lead text-light fs-6 ps-1 my-1">&copy; {year} - Swimmers Hub by Emily Lemmon</p>
      </footer>
    </section>
  )
};
