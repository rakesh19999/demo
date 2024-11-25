import React, { useState } from "react";
import SubscribeModal from "./SubscribeModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="subscribe-button" onClick={openModal}>
        Subscribe
      </button>

      {isModalOpen && <SubscribeModal onClose={closeModal} />}
    </div>
  );
}

export default App;
