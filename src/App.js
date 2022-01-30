import logo from './logo.svg';
import './App.css';
import CustomChatbot from './components/chatBot'

function App() {
  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to our shop",
      trigger: "Done"
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true
    }
 ];
  return (
    <div className="App">
        <CustomChatbot eventHandler={clickEventHandler} />
    </div>
  );
}

export default App;
