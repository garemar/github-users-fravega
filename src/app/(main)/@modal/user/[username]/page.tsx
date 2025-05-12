import { notFound } from 'next/navigation'
import { fetchUser, fetchRepos } from '@lib/github'
import FavoriteButton from '@components/FavoriteButton'
import CloseModalButton from '@components/CloseModalButton'

type Props = {
    params: {
        username: string
    }
}

export default async function UserDetailPage({ params }: Props) {
    const { username } = await Promise.resolve(params)

    const user = await fetchUser(username)
    if (!user) return notFound()

    const repos = (await fetchRepos(username)).slice(0, 10)

    return (
        <div className="fixed inset-0 min-h-screen bg-black/60 z-50 flex items-center justify-center overflow-hidden">
            <div className="relative bg-zinc-900 text-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fade-in">
                <CloseModalButton />

                <div className="flex items-center gap-6 mt-4">
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-24 h-24 rounded-full border-4 border-zinc-700 shadow-md"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                        <p className="text-gray-400">@{user.login}</p>
                        {user.bio && (
                            <p className="text-sm text-gray-400 mt-1 leading-snug">{user.bio}</p>
                        )}
                    </div>
                    <FavoriteButton username={user.login} />
                </div>

                <hr className="my-6 border-gray-700" />

                <h3 className="text-lg font-semibold mb-3">Repositorios públicos</h3>

                {repos.length === 0 ? (
                    <p className="text-sm text-gray-400">
                        Este usuario no tiene repositorios públicos.
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {repos.map((repo: any) => (
                            <li key={repo.id}>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-200 hover:text-white transition"
                                >
                                    {repo.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
