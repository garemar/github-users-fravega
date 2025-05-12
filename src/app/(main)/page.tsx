'use client'

import { useEffect, useState } from 'react'
import SearchInput from '@components/SearchInput'
import UserCard from '@components/UserCard'
import { getUsers, searchUsers, GithubUser } from '@lib/github'
import Loader from '@components/Loader'

export default function HomePage() {
  const [users, setUsers] = useState<GithubUser[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const results = query ? await searchUsers(query) : await getUsers()
      setUsers(results)
      setLoading(false)
    }
    fetch()
  }, [query])

  return (
    <section>
      <SearchInput onSearch={setQuery} />

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Loader message="Buscando usuarios..." />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">No se encontraron usuarios.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {users.map((user) => (
            <UserCard key={user.login} user={user} />
          ))}
        </div>
      )}
    </section>
  )
}
