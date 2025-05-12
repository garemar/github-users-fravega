/**
 * @jest-environment jsdom
 */
import {
    getUsers,
    searchUsers,
    fetchUser,
    fetchRepos
} from '../github'

global.fetch = jest.fn()

describe('API GitHub - github.ts', () => {
    let consoleErrorMock: jest.SpyInstance

    beforeAll(() => {
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { })
    })

    afterAll(() => {
        consoleErrorMock.mockRestore()
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('getUsers devuelve usuarios correctamente', async () => {
        const mockUsers = [{ login: 'user1' }, { login: 'user2' }]
            ; (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUsers
            })

        const users = await getUsers()
        expect(users).toEqual(mockUsers)
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/users'), expect.any(Object))
    })

    it('getUsers devuelve [] si res.ok es false', async () => {
        ; (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false
        })

        const users = await getUsers()
        expect(users).toEqual([])
    })

    it('searchUsers devuelve resultados correctos', async () => {
        const mockResults = { items: [{ login: 'octocat' }] }
            ; (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResults
            })

        const results = await searchUsers('octocat')
        expect(results).toEqual(mockResults.items)
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/search/users?q=octocat'), expect.any(Object))
    })

    it('searchUsers devuelve [] si res.ok es false', async () => {
        ; (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false
        })

        const results = await searchUsers('x')
        expect(results).toEqual([])
    })

    it('searchUsers devuelve [] si items no está definido', async () => {
        const mockResults = {} // sin items
            ; (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResults
            })

        const results = await searchUsers('x')
        expect(results).toEqual([])
    })

    it('fetchUser devuelve un usuario válido', async () => {
        const mockUser = { login: 'octocat' }
            ; (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser
            })

        const user = await fetchUser('octocat')
        expect(user).toEqual(mockUser)
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/users/octocat'), expect.any(Object))
    })

    it('fetchUser devuelve null si res.ok es false', async () => {
        ; (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false
        })

        const user = await fetchUser('x')
        expect(user).toBeNull()
    })

    it('fetchRepos devuelve lista de repos', async () => {
        const mockRepos = [{ id: 1, name: 'repo1' }]
            ; (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockRepos
            })

        const repos = await fetchRepos('octocat')
        expect(repos).toEqual(mockRepos)
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/users/octocat/repos'), expect.any(Object))
    })

    it('fetchRepos devuelve [] si res.ok es false', async () => {
        ; (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false
        })

        const repos = await fetchRepos('x')
        expect(repos).toEqual([])
    })

    it('maneja errores cuando la API lanza excepciones', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { })

            ; (fetch as jest.Mock).mockRejectedValueOnce(new Error('Falla'))
        const users = await getUsers()
        expect(users).toEqual([])

            ; (fetch as jest.Mock).mockRejectedValueOnce(new Error('Falla'))
        const search = await searchUsers('x')
        expect(search).toEqual([])

            ; (fetch as jest.Mock).mockRejectedValueOnce(new Error('Falla'))
        const user = await fetchUser('x')
        expect(user).toBeNull()

            ; (fetch as jest.Mock).mockRejectedValueOnce(new Error('Falla'))
        const repos = await fetchRepos('x')
        expect(repos).toEqual([])

        consoleErrorMock.mockRestore()
    })
})
