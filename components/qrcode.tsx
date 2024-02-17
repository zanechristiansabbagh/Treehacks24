export function QRCode() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full min-h-screen bg-black">
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[-1]">
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "20%",
            top: "10%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "70%",
            top: "30%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "40%",
            top: "50%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "90%",
            top: "70%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "50%",
            top: "80%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "80%",
            top: "40%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "30%",
            top: "60%",
          }}
        />
      </div>
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-white">
        Welcome to TAAI
      </h1>
      <h2 className="text-lg text-gray-500">
        Have your students scan your qr code to join your class
      </h2>
      <p className="text-lg text-white mt-4">Professor ID: {tasksId}</p>

      <div className="mt-8">
        <a href={`https://yourwebsite.com/page?tasksId=${tasksId}`}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://10.34.177.176:3000/`}
            alt="QR Code"
          />
        </a>
      </div>
    </div>
  );
}
