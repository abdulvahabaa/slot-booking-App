import  { useState } from "react";
import Header from "../components/Header/Header";
import Title from "../ui/Title";
import TabViewer from "../components/TabViewer/TabViewer";
const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="dark:bg-gray-900 ">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <div className="container max-auto p-5 ">
        <div className="mt-16 italic">
          <Title>Welcome to Book My Slot</Title>
        </div>
        <TabViewer />
      </div>
    </div>
  );
};

export default Landing;
