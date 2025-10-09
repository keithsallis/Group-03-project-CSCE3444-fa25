import Header from './Header.jsx';
import TextInput from './TextInput.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import Footer from './Footer.jsx';

function App() {
  return (
    // This container now fills the entire screen with the new background color
    // and arranges its children vertically.
    <div className="bg-indigo-400 min-h-screen flex flex-col">
      
      <Header />
      
      {/* The <main> section is set to grow and fill available space,
          centering the form elements within it. */}
      <main className="flex-grow flex flex-col items-center justify-center gap-8 p-8">
        <TextInput />
        <DropdownMenu />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;