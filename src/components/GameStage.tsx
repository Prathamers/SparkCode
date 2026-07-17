import React from 'react';
import { Stage, Sprite as PixiSprite, Container, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';

// Using a basic fallback image data URI for the sprite just for preview
const DUMMY_SPRITE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

export interface SpriteData {
  id: string;
  name: string;
  texture?: string;
  xml: string;
  code: string;
  state: {
    x: number;
    y: number;
    rotation: number;
    color: string;
    zIndex?: number;
    size?: number;
    penDown?: boolean;
    penColor?: string;
    penSize?: number;
  };
}

export interface LineData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  size: number;
}

interface GameStageProps {
  sprites: SpriteData[];
  lines?: LineData[];
  backdropTexture?: string;
}

export const GameStage: React.FC<GameStageProps> = ({ sprites, lines = [], backdropTexture }) => {
  const drawLines = React.useCallback((g: PIXI.Graphics) => {
    g.clear();
    lines.forEach(line => {
      // Parse color (hex string or # hex) to number
      const colorNum = typeof line.color === 'string' 
        ? parseInt(line.color.replace('#', ''), 16) 
        : line.color;
        
      g.lineStyle(line.size, colorNum, 1);
      g.moveTo(line.startX, line.startY);
      g.lineTo(line.endX, line.endY);
    });
  }, [lines]);

  return (
    <Stage 
      width={800} 
      height={600} 
      options={{ 
        backgroundColor: 0x000000,
        backgroundAlpha: 0,
        antialias: true 
      }}
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }}
    >
      {backdropTexture && (
        <PixiSprite 
          image={backdropTexture} 
          x={0} 
          y={0} 
          width={800} 
          height={600} 
          anchor={0} 
          zIndex={-10}
        />
      )}
      <Container x={400} y={300} sortableChildren={true}>
        <Graphics draw={drawLines} />
        {sprites.map((sprite) => (
          <PixiSprite 
            key={sprite.id}
            image={sprite.texture || DUMMY_SPRITE} 
            x={sprite.state.x} 
            y={sprite.state.y} 
            rotation={(sprite.state.rotation - 90) * (Math.PI / 180)}
            anchor={0.5} 
            {...(sprite.texture ? {
              scale: { x: (sprite.state.size || 100) / 100, y: (sprite.state.size || 100) / 100 }
            } : {
              width: 50,
              height: 50
            })}
            tint={sprite.state.color}
            zIndex={sprite.state.zIndex || 0}
          />
        ))}
      </Container>
    </Stage>
  );
};
