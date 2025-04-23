import '../css/Contact.css'

const Contact = () => {
    return (
        <div className={'contact-container'}>
            <div className="information-contact">
                <h2>Hours of working</h2>
                <p>
                    Monday:  10:00am - 8:00pm <br/>Tuesday:  10:00am - 8:00pm <br/>Wednesday: 10:00am - 8:00pm <br/>Thursday:
                    10:00am  - 8:00pm <br/>Friday: 10:00am - 9:00pm <br/>Saturday: 10:00am - 9:00pm <br/>Sunday: 10:00am - 6:00pm
                </p>
                <h2>Address</h2>
                <p>
                    9911 Northeast AvenuePhiladelphia, PA  19115
                </p>
                <h2>Call</h2>
                <p>+1 215-464-2337</p>
            </div>
            <div className={'contact-picture'}>
                <img className={'picture'} src="./src/assets/contacts.jpg" alt=""/>
            </div>
            
        </div>
    )
}

export default Contact