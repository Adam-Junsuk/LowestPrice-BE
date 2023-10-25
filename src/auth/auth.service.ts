import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { KakaoUserAfterAuth } from './util/decorator/user.decorator';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

  //* jwt 로그인 확인
  async findUser(id: number) {
    return this.findUser(id);
  }

  //* 카카오 로그인
  async kakaoLogin(kakaoUser: KakaoUserAfterAuth) {
    // 1. DB에 해당 사용자 존재 여부 확인
    let isExistKaKaoUser = await this.authRepository.findKakaoUser(
      kakaoUser.snsId
    );

    // 2. 사용자 하지 않을 경우 DB에 계정 생성
    if (!isExistKaKaoUser) {
      isExistKaKaoUser = await this.authRepository.createKakaoUser(kakaoUser);
    }

    // 3. jwt 발급
    const jwtPayload = {
      userId: isExistKaKaoUser.userId,
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      expiresIn: '5h',
      secret: process.env.JWT_SECRET,
    });

    console.log(`jwt-accessToken: ${accessToken}`);

    //*! 기존의 쿠키 방식
    //res.setHeader('Authorization', `Bearer ${accessToken}`);
    //res.cookie('Authorization', `Bearer ${accessToken}`, {
    //  httpOnly: false, // JavaScript에서 쿠키에 접근할 수 없도록 설정
    //  sameSite: 'none',
    //  secure: true,
    //  maxAge: 36000000, // 쿠키 만료 시간 설정 (예: 1시간)
    //});
    return accessToken;
  }

  //* 회원 탈퇴
  async kakaoDeactivate(userId: number) {
    await this.authRepository.kakaoDeactivate(userId);
    return {
      success: 'success',
      status: 200,
      message: '회원 탈퇴에 성공했습니다.',
    };
  }
}
