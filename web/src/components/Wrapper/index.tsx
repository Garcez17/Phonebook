import { ReactNode } from "react"

type WrapperProps = {
  children: ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <main className="flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 min-h-full bg-gray-700">
        {children}
      </main>
    </div>
  )
}