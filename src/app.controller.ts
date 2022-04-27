import { Controller, Get, Header } from '@nestjs/common'
import { DateTime } from 'luxon'

const HOUR_TO_SECOND_MULTIPLIER = 3600
const MINUTE_TO_SECOND_MULTIPLIER = 60

@Controller()
export class AppController {
  /**
   * Returns the local time (date not included), represented in seconds.
   */
  @Get()
  @Header('Content-Type', 'text/plain')
  getCurrentTimeInSeconds() {
    const { hour, minute, second } = DateTime.now().setZone('Asia/Manila')
    return (
      hour * HOUR_TO_SECOND_MULTIPLIER +
      minute * MINUTE_TO_SECOND_MULTIPLIER +
      second
    )
  }
}
