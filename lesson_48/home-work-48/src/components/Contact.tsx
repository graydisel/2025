import "../css/Contact.css"

const Contact = () => {
    document.title = 'Contact';
    return (
    <div className={'contact-container'}>
        <img className={'contact-image'} src="./src/assets/contact.svg" alt="Contact Image"/>
        <h1>Contact Us</h1>
        <div className={'contact-info'}>
            <p>
                Have a question? Call us.
            </p>
            <p>
                +359 888 888 888
            </p>
            <p>
                Or write us an email.
            </p>
            <p>
                newsletter@example.com
            </p>
        </div>
    </div>
    )
}

export default Contact