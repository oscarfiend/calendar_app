import {Provider} from 'react-redux'
import store from './store/store';
const { default: AppRouter } = require("./routes/AppRouter");

function App() {
  return (
    <div>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
    </div>
  );
}

export default App;
