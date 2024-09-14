import { compare, hash } from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10
    const hashedPassword = await hash(password, saltRounds)
    return hashedPassword
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const match = await compare(password, hashedPassword)
    return match
}
