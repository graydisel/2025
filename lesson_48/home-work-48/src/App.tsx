import './App.css'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {NewsList} from "./components/NewsList.tsx";

function App() {

  return (
      <Provider store={store}>
          <h1 className={'app-header'}>News Library</h1>
          <NewsList />
      </Provider>
  )
}

export default App
