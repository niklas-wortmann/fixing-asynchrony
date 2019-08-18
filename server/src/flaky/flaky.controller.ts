import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
var fs = require('fs')

@Controller('flaky')
export class FlakyController {

    @Get()
    async getStaticData(@Res() res: Response) {
        const stream = fs.createReadStream(__dirname + '/flaky.data.json');
        stream.pipe(res);
    }
}
