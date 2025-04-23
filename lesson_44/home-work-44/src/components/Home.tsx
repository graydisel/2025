import '../css/Home.css'

const Home = () => {
    document.title = 'Home Page';
    return (
        <div className={'home-container'}>
            <p>Beer</p>
            <p>Snacks</p>
        </div>
    )
}

export default Home