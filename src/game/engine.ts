export type GameStateType = 'start' | 'playing' | 'paused' | 'lifeLost' | 'gameover'

export interface Entity {
  update(dt: number, canvasW: number, canvasH: number): void
  render(ctx: CanvasRenderingContext2D): void
  alive: boolean
}

export function wrapPosition(x: number, y: number, w: number, h: number, margin = 0): [number, number] {
  let nx = x
  let ny = y
  if (nx < -margin) nx = w + margin
  if (nx > w + margin) nx = -margin
  if (ny < -margin) ny = h + margin
  if (ny > h + margin) ny = -margin
  return [nx, ny]
}

export function pointInCircle(px: number, py: number, cx: number, cy: number, r: number): boolean {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy <= r * r
}

export function circlesCollide(
  x1: number, y1: number, r1: number,
  x2: number, y2: number, r2: number
): boolean {
  const dx = x1 - x2
  const dy = y1 - y2
  const dist = dx * dx + dy * dy
  const radSum = r1 + r2
  return dist <= radSum * radSum
}
