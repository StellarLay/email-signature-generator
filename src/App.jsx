import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./App.scss";

import SignatureForm from "./components/SignatureForm/SignatureForm";
import Preview from "./components/Preview/Preview";
import Popup from "./components/Popup/Popup";

function App() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Закрываем msg text через 3 секунды
  useEffect(() => {
    if (copySuccess) {
      const timeoutID = setTimeout(() => {
        setCopySuccess(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [copySuccess, message]);

  return (
    <>
      <motion.div animate={{ opacity: copySuccess ? 1 : 0 }}>
        <Popup message={message} />
      </motion.div>
      <div className="container">
        <SignatureForm setData={setFormData} />
        <Preview
          data={formData}
          setMsg={setMessage}
          setSuccess={setCopySuccess}
        />
      </div>
    </>
  );
}

export default App;
