import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"

export default function Component() {
  return (
    <div
      key="1"
      className="flex flex-col items-center justify-center min-h-screen gap-2 p-4 text-center bg-black text-white"
    >
      <h1 className="text-3xl font-bold mb-4">
        Welcome to
        <br />
        <span className="text-gray-500">Prof. Marx's</span>
        <br />
        classroom
      </h1>
      <div className="mx-auto grid max-w-sm gap-2">
        <Input className="mb-2" placeholder="Enter your name" type="text" />
        <Input className="mb-2" placeholder="Enter your phone number" type="text" />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </div>
    </div>
  )
}

