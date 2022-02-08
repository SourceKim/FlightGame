import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GameService } from './game.service';

@Controller('game')
export class GameController {

    constructor(
        @Inject(GameService) private readonly gameService: GameService
    ) {
        
    }

    @Post('mock_start_game')
    @ApiOperation({ summary: "Mock start a game"})
    async mockStartGame(@Body() body) {
        return this.gameService.startGame(body)
    }

}
