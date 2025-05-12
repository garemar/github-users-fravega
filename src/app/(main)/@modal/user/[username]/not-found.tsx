import { FaceFrownIcon } from '@heroicons/react/24/solid'

export default function UserNotFound() {
  return (
    <div className="fixed inset-0 min-h-screen bg-black/60 z-50 flex items-center justify-center overflow-hidden">
      <div className="bg-zinc-900 text-white rounded-lg shadow-lg max-w-md w-full p-6 text-center animate-fade-in">
        <FaceFrownIcon className="h-10 w-10 text-yellow-400 mx-auto" />
        <h2 className="mt-4 text-xl font-semibold">Usuario no encontrado</h2>
        <p className="text-sm text-gray-400 mt-1">
          Verificá que el nombre esté bien escrito.
        </p>
      </div>
    </div>
  )
}
