'use client'

import Link from 'next/link'
import { GithubUser } from '@lib/github'
import FavoriteButton from './FavoriteButton'
import { useSearchParams } from 'next/navigation'


type Props = {
  user: GithubUser
}

export default function UserCard({ user }: Props) {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const queryString = q ? `?q=${encodeURIComponent(q)}` : ''

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow hover:bg-zinc-700 transition flex items-center justify-between group">
      <Link
        href={`/user/${user.login}${queryString}`}
        className="flex items-center gap-4 flex-grow"
        prefetch
      >
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-14 h-14 rounded-full border border-zinc-700"
        />
        <p className="text-white font-medium group-hover:underline truncate max-w-[12ch]">
          {user.login}
        </p>

      </Link>

      <FavoriteButton username={user.login} />
    </div>
  )
}
