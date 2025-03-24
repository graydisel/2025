import Post from './post'
import './assets/scss/style.scss'
import logo from './assets/images/logo.svg'

const post = new Post('Webpack Post Title')

console.log('Post to string:', post.toString())
