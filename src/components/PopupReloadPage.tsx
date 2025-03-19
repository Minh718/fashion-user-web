import React from "react";

export default function PopupReloadPage() {
  const reloadPage = () => {
    window.location.reload(); // Reloads the current page
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong!
          </h2>
          <p>Please try reloading the page.</p>
          <button
            onClick={reloadPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
