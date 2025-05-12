import '../css/Home.css'

const Home = () => {
    document.title = 'Home Page';
    return (
        <div className={'home-container'}>
            <img className={'home-image'} src="./src/assets/home.svg" alt=""/>
            <h2>Open something new for you  </h2>
        </div>
    )
}

export default Home