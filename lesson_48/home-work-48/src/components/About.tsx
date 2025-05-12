import "../css/About.css"

const About = () => {
  document.title = 'About';
  return <div className={'about-container'}>
    <img className={'about-image'} src="./src/assets/about.svg" alt="About Us"/>
    <h1>About News Library</h1>
    <p>
      News Library is your trusted source for accurate and up-to-date news. We gather, verify, and deliver important
      stories from around the world to keep you informed. Our mission is to provide readers with balanced, objective
      information in a clear and organized format.

      We cover key topics such as:

      Politics and economy

      Science and technology

      Society and culture

      Global events

      Expert analysis and opinion

      The News Library team is committed to high journalistic standards, with a strong focus on fact-checking, credible sources, and transparency.

      We believe quality journalism is essential for an informed society. Join us and stay connected to the stories that truly matter.
    </p></div>
}

export default About