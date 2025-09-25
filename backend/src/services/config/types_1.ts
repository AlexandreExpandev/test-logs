export interface GameConfig {
  minRange: number;
  maxRange: number;
}

export interface UpdateGameConfigPayload extends GameConfig {
  // In a real app, we might have an 'updatedBy' field from a decoded JWT.
  // updatedBy?: string;
}
