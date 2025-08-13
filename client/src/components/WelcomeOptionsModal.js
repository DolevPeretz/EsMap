import React, { useState } from "react";
import "../style/WelcomeOptionsModal.css";
import BusinessOwnerWithMessage from "./BusinessOwnerWithMessage ";

const WelcomeOptionsModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);


  const isCloseModal = () => {
    setIsOpen(false);
  };

  const handleBusinessOwnerClick = () => {
    setIsBusinessOwner(true);
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-container">
          {!isBusinessOwner ? (
            <>
              <h1 className="modal-title">Welcome to Our Platform!</h1>
              <p className="modal-description">
                Discover amazing places, read reviews, and share your experiences. If you're a business owner, you can manage your business profile and events directly through our platform.
              </p>
              <div className="modal-buttons">
                <button
                  className="button business-owner-btn"
                  onClick={handleBusinessOwnerClick}
                >
                  I'm a Business Owner
                </button>
                <button
                  className="button guest-btn"
                  onClick={isCloseModal}
                >
                  Continue as Guest
                </button>
              </div>
            </>
          ) : (
            <BusinessOwnerWithMessage isCloseModal={isCloseModal} />
          )}
        </div>
      </div>)
  );
};

export default WelcomeOptionsModal;
