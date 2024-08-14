import React from 'react';

export type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export function Modal({ isVisible, onClose, title, message }: ModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-md p-6 mx-auto bg-white rounded shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">{title}</h2>
        <p className="mb-6 text-center">{message}</p>
        <button
          onClick={onClose}
          className="block px-4 py-2 mx-auto text-white bg-pink-500 rounded hover:scale-105">
          Close
        </button>
      </div>
    </div>
  );
}
