export class AppError extends Error {
  constructor(public message: string, public fieldErrors?: Record<string, string>, public statusCode: number = 400) {
    super(message)
    this.name = 'AppError'
  }
}
