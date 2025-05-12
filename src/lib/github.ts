export type GithubUser = {
    login: string
    avatar_url: string
    html_url: string
    bio?: string
    name?: string
}

const BASE_URL = process.env.GITHUB_API_URL || 'https://api.github.com'
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN

const isValidToken = TOKEN && !TOKEN.includes('pone_tu_token')
const headers: HeadersInit = isValidToken
    ? {
        Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github+json',
    }
    : {}


export const getUsers = async (): Promise<GithubUser[]> => {
    try {
        const res = await fetch(`${BASE_URL}/users`, { headers })
        if (!res.ok) throw new Error('No se pudieron obtener los usuarios')
        return res.json()
    } catch (error) {
        console.error('Error en getUsers:', error)
        return []
    }
}

export const searchUsers = async (term: string): Promise<GithubUser[]> => {
    try {
        const res = await fetch(`${BASE_URL}/search/users?q=${term}`, { headers })
        const data = await res.json()
        return data.items || []
    } catch (error) {
        console.error('Error en searchUsers:', error)
        return []
    }
}

export const fetchUser = async (username: string): Promise<GithubUser | null> => {
    try {
        const res = await fetch(`${BASE_URL}/users/${username}`, { headers })
        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error('Error en fetchUser:', error)
        return null
    }
}

export const fetchRepos = async (username: string): Promise<any[]> => {
    try {
        const res = await fetch(`${BASE_URL}/users/${username}/repos`, { headers })
        if (!res.ok) return []
        return res.json()
    } catch (error) {
        console.error('Error en fetchRepos:', error)
        return []
    }
}
