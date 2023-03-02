import TodoList from "./components/pages/Home/Home";
import store from './redux/store';
import { Provider } from "react-redux";

function App() {
  return (
  <Provider store={store}>
    <TodoList />
  </Provider>
  );
}
export default App;
