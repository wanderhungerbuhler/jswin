import { describe, expect, it, vi } from 'vitest'
import nock from 'nock'

import Letter from './service.js'

describe('Call a function', () => {

  it('should call a function Letter', () => {
    expect(Letter).toBe()
  })

  it('should handle errors when the API request fails', async () => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/users')
      .replyWithError('error trying get to users')
      .get('/posts')
      .replyWithError('error trying get to posts')
    expect(Letter).toBe()
  })
})
