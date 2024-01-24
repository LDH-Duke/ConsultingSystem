import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


//토큰 생성, 검증을 해주는 클래스 생성
export default class Authenticator {

    // 토큰 생성
    async createToken(data, expiresIn) {
        return JWT.sign(data, process.env.SECRET_KEY, { expiresIn })
    }

    // 토큰 검증
    async verifyToken() {

    }
}