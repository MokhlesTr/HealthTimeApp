const MyMedicalReport = () => {
  return (
    <>
      <Table />
    </>
  );
};

export default MyMedicalReport;
function Table() {
  return (
    <>
      <div className="px-10 py-20 min-h-screen border-b border-gray-300">
        {/* <div className="flex justify-end mt-12">
          {addRapp ? (
            <ReactToPrint
              trigger={() => (
                <button className="bg-gray-500 text-white px-4 py-2 flex flex-row gap-3 rounded">
                  Print <MdLocalPrintshop size={24} />
                </button>
              )}
              content={() => componentRef.current}
            />
          ) : null}

          <button
            onClick={() => setAddRapp(!addRapp)}
            className={`px-5 py-2  rounded text-white ml-2 font-semibold shadow-lg transition duration-300  ${
              addRapp
                ? "bg-red-700 hover:bg-red-900"
                : "bg-blue-700 hover:bg-blue-900"
            } `}
          >
            {!addRapp ? "Add" : "Cancel"}
          </button>
        </div>
        <div
          className={`Form add ${
            addRapp
              ? "transition-transform duration-700 ease-out transform translate-x-0 "
              : "transition-transform duration-500 ease-in transform translate-x-full"
          }`}
        >
          {addRapp ? (
            <div
              ref={componentRef}
              className="flex justify-center items-center mx-8"
            >
              <div className="papier w-full h-screen mx-10 mt-4  bg-white border-double rounded-lg border-gray-900 outline-double shadow-xl">
                <h1 className="font-semibold text-center text-3xl py-8 border-b border-gray-300">
                  Medical Report
                </h1>
                <div className="flex items-center px-10 py-8 border-b border-gray-300">
                  <img
                    className="w-32 h-32 rounded-full border mr-16"
                    src="https://www.kucancercenter.org/-/media/Cancer-Center-Website/Small-Hero/NonClinical_Counselor_AS115268865_hero.jpeg?h=350&w=464&la=en&hash=AE79641B732C26517177D9B1B5ADCACE1024592F"
                    alt="Doctor"
                  />
                  <div>
                    <h2 className="font-semibold text-lg mb-2">
                      Personal Information:
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex flex-row border border-gray-200">
                        <span className="font-bold p-2">Last Name:</span>
                        <input type="text" className="flex-1 p-2" />
                      </div>
                      <div className="flex flex-row border border-gray-200">
                        <span className="font-bold p-2">First Name:</span>
                        <input type="text" className="flex-1 p-2" />
                      </div>
                      <div className="flex flex-row border border-gray-200">
                        <span className="font-bold p-2">Phone:</span>
                        <input type="tel" className="flex-1 p-2" />
                      </div>
                      <div className="flex flex-row border border-gray-200">
                        <span className="font-bold p-2">City:</span>
                        <input type="text" className="flex-1 p-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-10 py-8 border-b border-gray-300">
                  <div className="flex items-center">
                    <p className="font-semibold mr-4">Appointment Date:</p>
                    <input type="date" />
                  </div>
                </div>
                <div className="px-10 py-8 border-b border-gray-300">
                  <h2 className="font-semibold mb-4">Description</h2>
                  <div>
                    <textarea
                      rows={4}
                      className="w-full p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Write a comment..."
                      required
                    />
                  </div>
                </div>
                <div className="px-10 pt-8 ">
                  <h2 className="font-semibold mb-4">Prescription</h2>
                  <div className="flex items-center mb-4">
                    <table className="w-full table-auto border border-gray-300 shadow-lg">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-center">Doctor Name</th>
                          <th className="p-2 text-center">Dosage</th>
                          <th className="p-2 text-center">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 text-center">
                            <input
                              className="w-full p-2 border border-gray-600"
                              type="text"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              className="w-full p-2 border border-gray-600"
                              type="text"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              className="w-full p-2 border border-gray-600"
                              type="text"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button className="bg-black text-white text-xl w-8 h-8 rounded-full flex items-center justify-center">
                    <TiPlusOutline size={34} />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div> */}
        <div>
          <h1 className="font-semibold text-center text-3xl py-8 border-b border-black">
            Reports history
          </h1>
          <table className="w-full border border-black shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white font-semibold">
                <th className="p-2 text-center border border-black">Doctor</th>
                <th className="p-2 text-center border border-black">Date</th>
                <th className="p-2 text-center border border-black">Time</th>
                <th className="p-2 text-center border border-black">
                  Description
                </th>
                <th className="p-2 text-center border border-black ">
                  Prescription
                </th>
                <th className="p-2 text-center border border-black ">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="p-2 text-center border border-black">
                  Dr Bacem
                </td>
                <td className="p-2 text-center border border-black">
                  April 3, 2024
                </td>
                <td className="p-2 text-center border border-black">19:00</td>
                <td className="p-2 text-center border border-black">
                  Patient complained of chest pain.
                </td>
                <td className="p-2 text-center border border-black">
                  Aspirin 100mg, Once a day for 7 days
                </td>
                <td className="p-2 text-center border border-black flex justify-evenly">
                  <button className="px-3 py-1 rounded text-white font-semibold shadow-lg transition duration-300 bg-green-500 hover:bg-green-900">
                    Details
                  </button>
                  <button className="px-3 py-1 rounded text-white font-semibold shadow-lg transition duration-300 bg-gray-500 hover:bg-gray-900">
                    Print
                  </button>
                </td>
              </tr>
              <tr className="border">
                <td className="p-2 text-center border border-black">
                  Dr Bacem
                </td>
                <td className="p-2 text-center border border-black">
                  April 3, 2024
                </td>
                <td className="p-2 text-center border border-black">19:00</td>
                <td className="p-2 text-center border border-black">
                  Patient reported dizziness and nausea.
                </td>
                <td className="p-2 text-center border border-black">
                  Metoprolol 25mg, Twice a day
                </td>
                <td className="p-2 text-center border border-black flex justify-evenly">
                  <button className="px-3 py-1 rounded text-white font-semibold shadow-lg transition duration-300 bg-green-500 hover:bg-green-900">
                    Details
                  </button>
                  <button className="px-3 py-1 rounded text-white font-semibold shadow-lg transition duration-300 bg-gray-500 hover:bg-gray-900">
                    Print
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
