import React from "react";
import * as S from './header.styles'
import { HeaderProps, headerText } from "./header.types";

export function Header({ email }: HeaderProps) {
  return (
    <S.Container>
    
      <S.User >
        <S.Title>{headerText.Title}</S.Title>
        <S.Email>{email}</S.Email>
      </S.User>
    </S.Container>
  );
}
