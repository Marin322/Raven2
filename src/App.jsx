import './App.css'

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      signalRService.startConnection(token);
  
      signalRService.onReceiveMessage((message) => {
        useChatStore.getState().addMessage(message);
      });
    }
  
    return () => signalRService.stopConnection();
  }, []);
  return (
    <div className='text-green-200 bg-main-bg'>fdf</div>
  )
}

export default App
