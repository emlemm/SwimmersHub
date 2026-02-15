
export function Footer() {
  const d = new Date()
  let year = d.getFullYear();

  return(
    <section id="footer">
      <footer>
        <p className="lead ps-2">&copy; {year} - Swimmers Hub</p>
      </footer>
    </section>
  )
};
