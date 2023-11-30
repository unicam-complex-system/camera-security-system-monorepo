/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */


import { IsString } from 'class-validator';

export default class UserDTO {
  @IsString()
  readonly name: string;
  @IsString()
  readonly password: string;
}