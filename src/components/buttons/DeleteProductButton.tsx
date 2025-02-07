import React, { useState } from "react";
import { deleteProduct } from "@/utils/products/deleteProduct";

interface DeleteProductProps {
  id: number;
  onDelete: (productId: number) => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ id, onDelete }) => {
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const result = await deleteProduct(id);
      if (result.success) {
        setModalMessage("Product deleted successfully!");
        setIsConfirming(false);
        setTimeout(closeModal, 2000);
        onDelete(id);
      } else {
        throw result.error;
      }
    } catch (error) {
      setModalMessage("Error deleting product. Please try again.");
      setIsConfirming(false);
      console.error("Error deleting product:", error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
    setIsConfirming(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsConfirming(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteProduct();
  };

  return (
    <div>
      <button
        data-cy="delete-my-product-button"
        onClick={openModal}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition duration-300"
      >
        Delete
      </button>

      {modalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          data-cy="delete-product-modal"
        >
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            {isConfirming ? (
              <>
                <p data-cy="delete-confirmation-alert" className="mb-4 text-lg">
                  Are you sure you want to delete this product?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleConfirmDelete}
                    className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={closeModal}
                    className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p data-cy="delete-success-alert" className="mb-4 text-lg">
                  {modalMessage}
                </p>
                <button
                  onClick={closeModal}
                  className="py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
